/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Root error for the serializer.
 *
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */
export default class SerializerError extends Error {
    /**
     * @param {string} [message='']
     */
    constructor(message = '') {
        super(message);

        this.name = 'SerializerError';
        this.message = message;

        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
