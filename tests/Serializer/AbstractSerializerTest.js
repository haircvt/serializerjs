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

import AbstractSerializer from './../../src/Serializer/AbstractSerializer';
import SerializerInterface from './../../src/Serializer/SerializerInterface';

/** @test {AbstractSerializer} */
describe('AbstractSerializer', () => {
    /**
     * @test {AbstractSerializer#constructor}
     */
    it('It implements the SerializerInterface interface', () => {
        const abstractSerializer = new AbstractSerializer();

        assert.isTrue(abstractSerializer instanceof SerializerInterface);
    });

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
    it('It should return the object unchanged if (de)-serialization is called [warning: bad practice]', () => {
        const abstractSerializer = new AbstractSerializer();
        const data = {};

        assert.strictEqual(abstractSerializer.deserialize(data), data);
        assert.strictEqual(abstractSerializer.serialize(data), data);
    });
});
