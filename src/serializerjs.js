/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import SerializationError from './Error/SerializationError';
import UnexpectedTypeError from './Error/UnexpectedTypeError';
import UnimplementedSerializerMethodError from './Error/UnimplementedSerializerMethodError';

import AbstractSerializer from './Serializer/AbstractSerializer';
import Serializer from './Serializer/Serializer';
import SerializerAware from './Serializer/SerializerAware';
import SerializerInterface from './Serializer/SerializerInterface';

class SerializerFactory {
    /**
     * @param {Map.<string,SerializerInterface>} serializers
     *
     * @returns {Serializer}
     */
    constructor(serializers) {
        return new Serializer(serializers);
    }
}

/** @type {SerializationError} */
SerializerFactory.SerializationError = SerializationError;
/** @type {UnexpectedTypeError} */
SerializerFactory.UnexpectedTypeError = UnexpectedTypeError;
/** @type {UnimplementedSerializerMethodError} */
SerializerFactory.UnimplementedSerializerMethodError = UnimplementedSerializerMethodError;

/** @type {AbstractSerializer} */
SerializerFactory.AbstractSerializer = AbstractSerializer;
/** @type {SerializerAware} */
SerializerFactory.SerializerAware = SerializerAware;
/** @type {SerializerInterface} */
SerializerFactory.SerializerInterface = SerializerInterface;

module.exports = SerializerFactory;
