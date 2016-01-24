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

import SerializerAware from './../../src/Serializer/SerializerAware';
import SerializerInterface from './../../src/Serializer/SerializerInterface';
import UnimplementedSerializerMethodError from './../../src/Error/UnimplementedSerializerMethodError';

/** @test {SerializerAware} */
describe('SerializerAware', () => {
    /** @test {SerializerAware#constructor} */
    it('It implements the SerializerInterface interface', () => {
        const serializerAware = new SerializerAware();

        assert.isTrue(serializerAware instanceof SerializerInterface);
    });

    /** @test {SerializerAware#setSerializer} */
    it('It should contain a reference to the serializer', () => {
        const serializer = new SerializerInterface();
        const serializerAware = new SerializerAware();
        serializerAware.setSerializer(serializer);

        assert.strictEqual(serializerAware._serializer, serializer);
    });
});
