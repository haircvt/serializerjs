/*
 * This file is part of the JsSerializer package.
 *
 * (c) HAIRCVT <hello@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/* eslint-env mocha */

import { assert } from 'chai';

import AbstractSerializer from './../../src/Serializer/AbstractSerializer';
import SerializerInterface from './../../src/Serializer/SerializerInterface';

/** @test {AbstractSerializer} */
describe('AbstractSerializer', () => {
    /**
     * @test {AbstractSerializer#supportsDeserialize}
     * @test {AbstractSerializer#supportsSerialize}
     */
    it('It should not supports any (de)-serialization', () => {
        const abstractSerializer = new AbstractSerializer();

        assert.isFalse(abstractSerializer.supportsDeserialize());
        assert.isFalse(abstractSerializer.supportsSerialize());
    });

    /**
     * @test {AbstractSerializer#deserialize}
     * @test {AbstractSerializer#serialize}
     */
    it('It should return the object unchanged if (de)-serialization is called', () => {
        const abstractSerializer = new AbstractSerializer();
        const data = {};

        assert.strictEqual(abstractSerializer.deserialize(data), data);
        assert.strictEqual(abstractSerializer.serialize(data), data);
    });

    /**
     * @test {AbstractSerializer#constructor}
     */
    it('Is a serializer', () => {
        const abstractSerializer = new AbstractSerializer();

        assert.instanceOf(abstractSerializer, SerializerInterface);
    });
});
