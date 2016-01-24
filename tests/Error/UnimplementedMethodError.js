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
import UnimplementedMethodError from './../../src/Error/UnimplementedMethodError';

/** @test {SerializationError} */
describe('SerializationError', () => {
    it('It is a SerializerError', () => {
        assert.isTrue(UnimplementedMethodError.prototype instanceof SerializerError);
    });

    it('Its name is an UnimplementedMethodError error', () => {
        const error = new UnimplementedMethodError();
        assert.strictEqual(error.name, 'UnimplementedMethodError');
    });
});
