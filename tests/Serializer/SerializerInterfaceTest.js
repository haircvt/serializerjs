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
import UnimplementedSerializerMethodError from './../../src/Error/UnimplementedSerializerMethodError';

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

        assert.throw(serializer.deserialize, Error);
        assert.throw(serializer.serialize, Error);
        assert.throw(serializer.supportsDeserialize, Error);
        assert.throw(serializer.supportsSerialize, Error);
    });
});
