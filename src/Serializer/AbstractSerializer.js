/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import SerializerAware from './SerializerAware';

/**
 * Base class that can be used for writing a custom serializer. It is especially convenient if your serializer do only
 * serialization or only deserialization. If not, it you are better off implementing SerializerAwareInterface or
 * SerializerInterface.
 *
 * @abstract
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */
export default class AbstractSerializer extends SerializerAware {
    /**
     * @inheritDoc
     */
    serialize(data, format, context) {
        return data;
    }

    /**
     * @inheritDoc
     */
    supportsSerialize(data, format = null) {
        return false;
    }

    /**
     * @inheritDoc
     */
    deserialize(data, className, format = null, context = null) {
        return data;
    }

    /**
     * @inheritDoc
     */
    supportsDeserialize(data, className, format = null) {
        return false;
    }
}
