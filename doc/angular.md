# Angular integration

The integration of the serializer in Angular is very straightforward. Indeed, you just have to register `serializer` as
a regular [Angular service](https://docs.angularjs.org/guide/services):

```js
import { Serializer } from 'js-serializer';

import BooleanSerializer from './Serializer/BooleanSerializer';
import StringSerializer from './Serializer/StringSerializer';
import TypeSerializer from './Serializer/TypeSerializer';
import UserSerializer from './Serializer/UserSerializer';

const hserializerModule = angular
    .module('haircvt.serializerModule', [])
    .factory('serializer', () => {
        const booleanSerializer = new BooleanSerializer();
        const stringSerializer = new StringSerializer();
        const typeSerializer = new TypeSerializer();
        const userSerializer = new UserSerializer();

        return new Serializer(new Map([
            ['BooleanSerializer', booleanSerializer],
            ['StringSerializer', stringSerializer],
            ['TypeSerializer', typeSerializer],
            ['UserSerializer', userSerializer],
        ]));
    })
;

export default hserializerModule;
``
