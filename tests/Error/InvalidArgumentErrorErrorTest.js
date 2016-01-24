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
import InvalidArgumentError from './../../src/Error/InvalidArgumentError';

/** @test {InvalidArgumentError} */
describe('SerializationError', () => {
    it('It is a SerializerError', () => {
        assert.isTrue(InvalidArgumentError.prototype instanceof SerializerError);
    });

    it('Its name is an InvalidArgumentError error', () => {
        const error = new InvalidArgumentError();
        assert.strictEqual(error.name, 'InvalidArgumentError');
    });
});
