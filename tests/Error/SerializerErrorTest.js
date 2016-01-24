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

import SerializerError from './../../src/Error/SerializerError';

/** @test {SerializationError} */
describe('SerializationError', () => {
    it('It is an Error', () => {
        const error = new SerializerError();
        assert.isTrue(error instanceof Error);
    });

    it('It captures the error message', () => {
        const message = 'My message';
        const error = new SerializerError(message);

        assert.strictEqual(error.message, message);
    });

    it('An error without any message has an empty message', () => {
        const error = new SerializerError();

        assert.strictEqual(error.message, '');
    });

    it('It captures the error name', () => {
        const error = new SerializerError();

        assert.strictEqual(error.name, 'SerializerError');
    });

    it('It captures the error stack', () => {
        const error = new SerializerError();

        assert.isString(error.stack);
        assert.isTrue(50 < error.stack.length);
    });
});
