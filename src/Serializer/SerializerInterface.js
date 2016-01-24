/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import SerializationError from './../Error/SerializationError';
import UnimplementedMethodError from './../Error/UnimplementedMethodError';

/**
 * A serializer is responsible for transforming a data in a specific format into a data in another format.
 *
 * For example, the serializer can be used to map client-side models and back-end side objects by checking all the
 * properties of a model to generate an object for which the values are understandable for the back-end service.
 *
 * +--------+ ----- serialize -----> +----------+
 * | Client |                        | Back-End |
 * +--------+ <---- deserialize ---- +----------+
 *
 * Note that JavaScript does not support interfaces per se. By "Interface" is meant that this class should not implement
 * any method but provide the skeleton for child classes instead.
 *
 * @interface
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */
export default class SerializerInterface {
    /**
     * Serializes any data object into and object usable for the backend service.
     *
     * @param {*}      data    Any data
     * @param {string} format  Format the normalization result will be encoded as
     * @param {*}      context Options serializers have access to
     *
     * @return {*}
     * @throw SerializationError
     */
    serialize(data, format, context) {
        throw new UnimplementedMethodError('Unimplemented "serialize()" method');
    }

    /**
     * Checks whether the given class is supported for serialization by this serializer.
     *
     * @param {*}      data          Any data
     * @param {string} [format=null] Format the normalization result will be encoded as
     *
     * @return {boolean}
     */
    supportsSerialize(data, format = null) {
        throw new UnimplementedMethodError('Unimplemented "supportsSerialize()" method');
    }

    /**
     * Deserializes data back into an object of the given class.
     *
     * @param {*}       data             Data to restore
     * @param {string}  className        The expected class to instantiate
     * @param {?string} [format=null]    Format the given data was extracted from
     * @param {*}       [context=null]   Options available to the deserializer
     *
     * @return {*}
     * @throw SerializationError
     */
    deserialize(data, className, format = null, context = null) {
        throw new UnimplementedMethodError('Unimplemented "deserialize()" method');
    }

    /**
     * Checks whether the given class is supported for deserialization by this serializer.
     *
     * @param {*}       data          Data to restore
     * @param {string}  className     The expected class to instantiate
     * @param {?string} [format=null] Format the given data was extracted from
     *
     * @return {boolean}
     */
    supportsDeserialize(data, className, format = null) {
        throw new UnimplementedMethodError('Unimplemented "supportsDeserialize()" method');
    }
}
