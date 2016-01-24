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

import SerializerInterface from './../../src/Serializer/SerializerInterface';
import UnimplementedMethodError from './../../src/Error/UnimplementedMethodError';

/** @test {SerializerInterface} */
describe('SerializerInterface', () => {
    /**
     * @test {SerializerInterface#deserialize}
     * @test {SerializerInterface#serialize}
     * @test {SerializerInterface#supportsDeserialize}
     * @test {SerializerInterface#supportsSerialize}
     */
    it('As an interface, it should not implement anything', () => {
        const serializer = new SerializerInterface();

        // Potential refactor
        // @see https://github.com/chaijs/chai/issues/596
        assert.throw(serializer.deserialize, Error);
        assert.throw(serializer.serialize, Error);
        assert.throw(serializer.supportsDeserialize, Error);
        assert.throw(serializer.supportsSerialize, Error);

        try {
            serializer.deserialize();
        } catch (error) {
            assert.strictEqual(error.name, 'UnimplementedMethodError');
        }
        try {
            serializer.serialize();
        } catch (error) {
            assert.strictEqual(error.name, 'UnimplementedMethodError');
        }
        try {
            serializer.supportsDeserialize();
        } catch (error) {
            assert.strictEqual(error.name, 'UnimplementedMethodError');
        }
        try {
            serializer.supportsSerialize();
        } catch (error) {
            assert.strictEqual(error.name, 'UnimplementedMethodError');
        }
    });
});
