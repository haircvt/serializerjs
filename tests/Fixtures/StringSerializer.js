/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/* eslint no-unused-vars: 0 */

import AbstractSerializer from './../../src/Serializer/AbstractSerializer';

export default class StringSerializer extends AbstractSerializer {
    /**
     * @inheritDoc
     */
    supportsDeserialize(data, className, format = null) {
        return 'string' === className && ('string' === typeof data || null === data);
    }
}
