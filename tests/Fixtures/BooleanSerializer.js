/*
 * This file is part of the JsSerializer package.
 *
 * (c) HAIRCVT <hello@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import SerializerAware from './../../src/Serializer/SerializerAware';

export default class BooleanSerializer extends SerializerAware {
    /**
     * @inheritDoc
     *
     * @param {?boolean} booleanValue
     * @param {string|*} context
     *
     * @return {boolean|number|null}
     */
    serialize(booleanValue, format, context) {
        if ('oldApi' === context) {
            return Number(booleanValue);
        }

        return booleanValue;
    }

    /**
     * @inheritDoc
     */
    supportsSerialize(data, format = null) {
        return 'boolean' === typeof data || null === data;
    }

    /**
     * @inheritDoc
     *
     * @param {number|boolean|null} data
     *
     * @return {boolean}
     */
    deserialize(data, className, format = null, context = null) {
        if ('boolean' === typeof data || null === data) {
            return data;
        }

        return Boolean(data);
    }

    /**
     * @inheritDoc
     */
    supportsDeserialize(data, className, format = null) {
        if ('boolean' !== className) {
            return false;
        }

        if ('boolean' === typeof data || null === data) {
            return true;
        }

        if (0 === data || 1 === data) {
            return true;
        }

        return false;
    }
}
