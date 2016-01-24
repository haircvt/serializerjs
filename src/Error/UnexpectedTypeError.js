/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */
export default class UnexpectedTypeError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name;
        this.message = message;
        Error.captureStackTrace(this, this.constructor.name);
    }
}
