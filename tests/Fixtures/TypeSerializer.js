/*
 * This file is part of the JsSerializer package.
 *
 * (c) HAIRCVT <hello@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import SerializerAware from './../../src/Serializer/SerializerAware';
import { ADMIN_TYPE, ANONYMOUS_TYPE, CUSTOMER_TYPE } from './UserType';

export default class TypeSerializer extends SerializerAware {
    constructor() {
        super();

        /**
         * @type {Map.<number, Symbol>} Key and value as respectively the raw and deserialized value
         * @private
         */
        this._mapping = new Map([
            [0, ADMIN_TYPE],
            [1, ANONYMOUS_TYPE],
            [2, CUSTOMER_TYPE],
        ]);
    }

    /**
     * @inheritDoc
     *
     * @param {Symbol} userType
     *
     * @return {number}
     */
    serialize(userType, format, context) {
        return this._getKeyOfType(userType);
    }

    /**
     * @inheritDoc
     */
    supportsSerialize(data, format = null) {
        return null !== this._getKeyOfType(data);
    }

    /**
     * @param {*} userType
     *
     * @return {?number}
     * @private
     */
    _getKeyOfType(userType) {
        for (const [key, type] of this._mapping.entries()) {
            if (userType === type) {
                return key;
            }
        }

        return null;
    }

    /**
     * @inheritDoc
     *
     * @param {number} key
     *
     * @return {ADMIN_TYPE|ANONYMOUS_TYPE|CUSTOMER_TYPE}
     */
    deserialize(key, className, format = null, context = null) {
        return this._mapping.get(key);
    }

    /**
     * @inheritDoc
     */
    supportsDeserialize(data, className, format = null) {
        return 'UserType' === className && this._mapping.has(data);
    }
}
