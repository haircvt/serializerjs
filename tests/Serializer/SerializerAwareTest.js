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

import SerializerAware from './../../src/Serializer/SerializerAware';
import SerializerInterface from './../../src/Serializer/SerializerInterface';
import UnimplementedSerializerMethodError from './../../src/Error/UnimplementedSerializerMethodError';

/** @test {SerializerAware} */
describe('SerializerAware', () => {
    /** @test {SerializerAware#setSerializer} */
    it('It should contain a reference to the serializer', () => {
        const serializer = new SerializerInterface();
        const serializerAware = new SerializerAware();
        serializerAware.setSerializer(serializer);

        assert.strictEqual(serializerAware._serializer, serializer);
    });

    /** @test {SerializerAware#constructor} */
    it('Is a serializer', () => {
        const serializer = new SerializerInterface();
        const serializerAware = new SerializerAware();
        serializerAware.setSerializer(serializer);

        assert.instanceOf(serializerAware, SerializerInterface);
    });
});
