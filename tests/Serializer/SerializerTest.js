/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/* eslint-env mocha */

import { assert } from 'chai';
import { ADMIN_TYPE, ANONYMOUS_TYPE, CUSTOMER_TYPE } from './../Fixtures/UserType';

import BooleanSerializer from './../Fixtures/BooleanSerializer';
import Serializer from './../../src/Serializer/Serializer';
import SerializerInterface from './../../src/Serializer/SerializerInterface';
import StringSerializer from './../Fixtures/StringSerializer';
import UserTypeSerializer from './../Fixtures/UserTypeSerializer';
import User from './../Fixtures/User';
import UserSerializer from './../Fixtures/UserSerializer';

import serializer from './../Fixtures/app';

/** @test {Serializer} */
describe('Serializer', () => {
    /** @test {Serializer#constructor} */
    it('It implements the SerializerInterface interface', () => {
        assert.instanceOf(serializer, SerializerInterface);
    });

    it('It should have a reference of all the registered serializers', () => {
        assert.isTrue(serializer._serializers.get('StringSerializer') instanceof StringSerializer);
        assert.isTrue(serializer._serializers.get('BooleanSerializer') instanceof BooleanSerializer);
        assert.isTrue(serializer._serializers.get('UserTypeSerializer') instanceof UserTypeSerializer);
        assert.isTrue(serializer._serializers.get('UserSerializer') instanceof UserSerializer);

        assert.strictEqual(serializer._serializers.size, 4);
    });


    describe('It can use the StringSerializer', () => {
        it('It should be able to deserialize a string', () => {
            const str = 'Hello World!';

            assert.isTrue(serializer.supportsDeserialize(str, 'string'));
            assert.strictEqual(serializer.deserialize(str, 'string'), str);
        });

        it('It should be able to deserialize an empty string', () => {
            const str = '';

            assert.isTrue(serializer.supportsDeserialize(str, 'string'));
            assert.strictEqual(serializer.deserialize(str, 'string'), str);
        });

        it('It should be able to deserialize a null value', () => {
            assert.isTrue(serializer.supportsDeserialize(null, 'string'));
            assert.isNull(serializer.deserialize(null, 'string'));
        });

        it('It should be able to deserialize something else than a string or a null value', () => {
            assert.isFalse(serializer.supportsDeserialize({}, 'string'));
            assert.isFalse(serializer.supportsDeserialize(() => {}, 'string'));
            assert.isFalse(serializer.supportsDeserialize(true, 'string'));
            assert.isFalse(serializer.supportsDeserialize(undefined, 'string'));
            assert.isFalse(serializer.supportsDeserialize(23, 'string'));
            assert.isFalse(serializer.supportsDeserialize(23.5, 'string'));
        });

        it('It should not be able to serialize a string', () => {
            assert.isFalse(serializer.supportsSerialize('Hello World'));
            assert.isFalse(serializer.supportsSerialize(''));
        });
    });

    describe('It can use the BooleanSerializer', () => {
        it('It should be able to deserialize a boolean value', () => {
            assert.isTrue(serializer.supportsDeserialize(true, 'boolean'));
            assert.strictEqual(serializer.deserialize(true, 'boolean'), true);

            assert.isTrue(serializer.supportsDeserialize(false, 'boolean'));
            assert.strictEqual(serializer.deserialize(false, 'boolean'), false);
        });

        it('It should be able to deserialize a integer boolean value', () => {
            assert.isTrue(serializer.supportsDeserialize(1, 'boolean'));
            assert.strictEqual(serializer.deserialize(1, 'boolean'), true);

            assert.isTrue(serializer.supportsDeserialize(0, 'boolean'));
            assert.strictEqual(serializer.deserialize(0, 'boolean'), false);
        });

        it('It should be able to deserialize a null value', () => {
            assert.isTrue(serializer.supportsDeserialize(null, 'boolean'));
            assert.isNull(serializer.deserialize(null, 'boolean'));
        });

        it('It should be able to serialize a boolean value', () => {
            assert.isTrue(serializer.supportsSerialize(true));
            assert.strictEqual(serializer.serialize(true), true);
            assert.isTrue(serializer.supportsSerialize(true));
            assert.strictEqual(serializer.serialize(true, null, 'oldApi'), 1);

            assert.isTrue(serializer.supportsSerialize(false));
            assert.strictEqual(serializer.serialize(false), false);
            assert.strictEqual(serializer.serialize(false, null, 'oldApi'), 0);
        });
    });

    describe('It can use the UserTypeSerializer', () => {
        it('It should be able to deserialize a UserType value', () => {
            assert.isTrue(serializer.supportsDeserialize(0, 'UserType'));
            assert.strictEqual(serializer.deserialize(0, 'UserType'), ADMIN_TYPE);

            assert.isTrue(serializer.supportsDeserialize(1, 'UserType'));
            assert.strictEqual(serializer.deserialize(1, 'UserType'), ANONYMOUS_TYPE);

            assert.isTrue(serializer.supportsDeserialize(2, 'UserType'));
            assert.strictEqual(serializer.deserialize(2, 'UserType'), CUSTOMER_TYPE);
        });

        it('It should be able to serialize a UserType value', () => {
            assert.isTrue(serializer.supportsSerialize(ADMIN_TYPE));
            assert.strictEqual(serializer.serialize(ADMIN_TYPE), 0);

            assert.isTrue(serializer.supportsSerialize(ANONYMOUS_TYPE));
            assert.strictEqual(serializer.serialize(ANONYMOUS_TYPE), 1);

            assert.isTrue(serializer.supportsSerialize(CUSTOMER_TYPE));
            assert.strictEqual(serializer.serialize(CUSTOMER_TYPE), 2);
        });
    });

    describe('It can use the UserSerializer', () => {
        const rawUser = {
            firstname: 'John',
            lastname: 'Doe',
            gender: true,
            type: 0,
        };
        const rawUserOldApi = {
            firstname: 'John',
            lastname: 'Doe',
            gender: 1,
            type: 0,
        };
        const user = new User('John', 'Doe', ADMIN_TYPE, true);

        it('It should be able to deserialize a user object', () => {
            assert.isTrue(serializer.supportsDeserialize(rawUser, 'User'));
            assert.deepEqual(serializer.deserialize(rawUser, 'User'), user);

            assert.isTrue(serializer.supportsDeserialize(rawUserOldApi, 'User'));
            assert.deepEqual(serializer.deserialize(rawUserOldApi, 'User'), user);
        });

        it('It should not be able to deserialize a user object with another serializer', () => {
            assert.isFalse(serializer.supportsDeserialize('Something', rawUser));
            assert.isFalse(serializer.supportsDeserialize('Something', rawUserOldApi));
        });

        it('It should be able to serialize a User object', () => {
            assert.isTrue(serializer.supportsSerialize(user));
            assert.deepEqual(serializer.serialize(user), rawUser);

            assert.isTrue(serializer.supportsSerialize(user));
            assert.deepEqual(serializer.serialize(user, null, 'oldApi'), rawUserOldApi);
        });
    });
});
