/*
 * This file is part of the JsSerializer package.
 *
 * (c) HAIRCVT <hello@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import BooleanSerializer from './BooleanSerializer';
import Serializer from './../../src/Serializer/Serializer';
import StringSerializer from './StringSerializer';
import TypeSerializer from './TypeSerializer';
import UserSerializer from './UserSerializer';

const booleanSerializer = new BooleanSerializer();
const stringSerializer = new StringSerializer();
const typeSerializer = new TypeSerializer();
const userSerializer = new UserSerializer();

const serializer = new Serializer(new Map([
    ['BooleanSerializer', booleanSerializer],
    ['StringSerializer', stringSerializer],
    ['TypeSerializer', typeSerializer],
    ['UserSerializer', userSerializer],
]));

export default serializer;
