# Framework integration

The integration in any framework should be very straightforward. For example, to register it in Angular, you can simply
register a `serializer` service:

```js
// app/HSerializerModule.js

import SerializerFactory from 'serializerjs';

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

        return SerializerFactory(new Map([
            ['BooleanSerializer', booleanSerializer],
            ['StringSerializer', stringSerializer],
            ['TypeSerializer', typeSerializer],
            ['UserSerializer', userSerializer],
        ]));
    })
;

export default hserializerModule;
```

[Back to the Table of Content](https://haircvt.github.io/serializerjs/manual/overview.html#table-of-content)
