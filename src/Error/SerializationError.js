/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import SerializerError from './SerializerError';

/**
 * Error thrown upon (de-)serialization process.
 *
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */
export default class SerializationError extends SerializerError {
    /**
     * @param {string} [message='']
     */
    constructor(message = '') {
        super(message);

        this.name = 'SerializationError';
    }
}
