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

import SerializationError from './../../src/Error/SerializationError';
import SerializerError from './../../src/Error/SerializerError';

/** @test {SerializationError} */
describe('SerializationError', () => {
    it('It is a SerializerError', () => {
        assert.isTrue(SerializationError.prototype instanceof SerializerError);
    });

    it('Its name is an SerializationError error', () => {
        const error = new SerializationError();
        assert.strictEqual(error.name, 'SerializationError');
    });
});
