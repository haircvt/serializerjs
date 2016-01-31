/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import SerializerAware from './SerializerAware';
import SerializerInterface from './SerializerInterface';
import SerializationError from './../Error/SerializationError';
import InvalidArgumentError from './../Error/InvalidArgumentError';

/**
 * Default serializer.
 *
 * Meant to aggregate all the application serializers and be used as the main serializer in the application. This means
 * that for serializing a new object, a custom serializer for this one should be done and registered to this serializer.
 *
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */
export default class Serializer extends SerializerInterface {
    /**
     * @param {Map.<string,SerializerInterface>} serializers
     *
     * @throw InvalidArgumentError
     */
    constructor(serializers) {
        super(serializers);

        for (const serializer of serializers.values()) {
            if (false === serializer instanceof SerializerInterface) {
                throw new InvalidArgumentError(
                    `Expected serializer to implement SerializerInterface. Got ${serializer.constructor} instead`
                );
            }

            if (serializer instanceof SerializerAware) {
                serializer.setSerializer(this);
            }
        }

        /**
         * @type {Map.<string, SerializerInterface>}
         * @private
         */
        this._serializers = serializers;
    }

    /**
     * @inheritDoc
     */
    serialize(data, format, context) {
        const serializer = this._getSerializerForSerialization(data, format);
        if (null !== serializer) {
            return serializer.serialize(data, format, context);
        }

        throw new SerializationError(`An unexpected value could not be serialized: "${data}"`);
    }

    /**
     * @inheritDoc
     */
    supportsSerialize(data, format = null) {
        return null !== this._getSerializerForSerialization(data, format);
    }

    /**
     * @inheritDoc
     */
    deserialize(data, className, format = null, context = null) {
        const serializer = this._getSerializerForDeserialization(data, className, format);
        if (null !== serializer) {
            return serializer.deserialize(data, className, format, context);
        }

        throw new SerializationError(`An unexpected value could not be deserialized: "${data}"`);
    }

    /**
     * @inheritDocz
     */
    supportsDeserialize(data, className, format = null) {
        return null !== this._getSerializerForDeserialization(data, className, format);
    }

    /**
     * @param {*}       data          Any data
     * @param {?string} [format=null] Format the normalization result will be encoded as
     *
     * @return {?SerializerInterface}
     * @private
     */
    _getSerializerForSerialization(data, format = null) {
        for (const serializer of this._serializers.values()) {
            if (true === serializer.supportsSerialize(data, format)) {
                return serializer;
            }
        }

        return null;
    }

    /**
     * @param {*}       data          Data to restore
     * @param {string}  className     The expected class to instantiate
     * @param {?string} [format=null] Format the given data was extracted from
     *
     * @return {?SerializerInterface}
     * @private
     */
    _getSerializerForDeserialization(data, className, format = null) {
        for (const serializer of this._serializers.values()) {
            if (true === serializer.supportsDeserialize(data, className, format)) {
                return serializer;
            }
        }

        return null;
    }
}
