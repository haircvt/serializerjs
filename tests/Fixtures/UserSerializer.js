/*
 * This file is part of the JsSerializer package.
 *
 * (c) HAIRCVT <hello@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import SerializerAwareInterface from './../../src/Serializer/SerializerAware';
import User from './User';

export default class UserSerializer extends SerializerAwareInterface {
    /**
     * @inheritDoc
     *
     * @param {User} user
     *
     * @return {!object}
     */
    serialize(user, format, context) {
        const type = this._serializer.serialize(user._type, format, context);
        const gender = this._serializer.serialize(user._gender, format, context);

        return {
            firstname: user.firstname,
            lastname: user.lastname,
            type: type,
            gender: gender,
        };
    }

    /**
     * @inheritDoc
     */
    supportsSerialize(data, format = null) {
        return 'object' === typeof data && null !== data && data instanceof User;
    }

    /**
     * @inheritDoc
     *
     * @param {!object} data
     *
     * @return {User}
     */
    deserialize(data, className, ...args) {
        const firstname = this._serializer.deserialize(data.firstname, 'string', ...args);
        const lastname = this._serializer.deserialize(data.lastname, 'string', ...args);
        const type = this._serializer.deserialize(data.type, 'UserType', ...args);
        const gender = this._serializer.deserialize(data.gender, 'boolean', ...args);

        return new User(firstname, lastname, type, gender);
    }

    /**
     * @inheritDoc
     */
    supportsDeserialize(data, className, format = null) {
        return 'User' === className && 'object' === typeof data && null !== data;
    }
}
