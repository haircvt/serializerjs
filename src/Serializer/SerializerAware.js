/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import SerializerInterface from './SerializerInterface';

/**
 * Any serializer implementing this interface will access to a serializer at runtime.
 *
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */
export default class SerializerAware extends SerializerInterface {
    constructor() {
        super();

        /**
         * @type {SerializerInterface}
         * @protected
         */
        this._serializer = undefined;
    }
    /**
     * @param {SerializerInterface} serializer
     */
    setSerializer(serializer) {
        this._serializer = serializer;
    }
}
