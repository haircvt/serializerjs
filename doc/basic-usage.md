# Basic Usage

The two key classes of this library are [`Serializer`][0] and [`SerializerInterface`][1]. To use it, you just have to
write your own serializers (simple class implementing [`SerializerInterface`][1]). Once done, create a [`Serializer`][0]
instance `serializer` to aggregate all your serializers. You will then be able to use `serializer` to (de-)serialize
any kind of data supported by the registered serializers.

Example: For some reason, we are fetching data where instead of having booleans `true` and `false` in our JSON response,
we have integers `0` or `1`. Let us write a simple `BooleanSerializer` that will be responsible for deserializing them
into proper booleans.

```js
// app/Serializer/BooleanSerializer.js
import SerializerFactory from 'serializerjs';

export default class BooleanSerializer extends SerializerFactory.SerializerInterface {
    /**
     * @inheritDoc
     */
    supportsSerialize(data, format = null) {
        return false;
    }

    /**
     * @inheritDoc
     *
     * @param {number|boolean|null} data
     *
     * @return {boolean}
     */
    deserialize(data, className, format = null, context = null) {
        if ('boolean' === typeof data || null === data) {
            return data;
        }

        return Boolean(data);
    }

    /**
     * @inheritDoc
     */
    supportsDeserialize(data, className, format = null) {
        if ('boolean' !== className) {
            return false;
        }

        if ('boolean' === typeof data || null === data) {
            return true;
        }

        if (0 === data || 1 === data) {
            return true;
        }

        return false;
    }
}
```

Then create the `serializer` service with all the serializers you which to register. In our case we only have
`BooleanSerializer`:

```js
// app/Serializer/Serializer.js
import SerializerFactory from 'serializerjs';
import BooleanSerializer from './BooleanSerializer';

export default SerializerFactory(new Map([
    ['BooleanSerializer', booleanSerializer],
]));
```

You can then use it like so:

```js
// app/index.js
import serializer from './Serializer/Serializer';

serializer.supportsDeserialize(1, 'boolean')); // => true
serializer.deserialize(1, 'boolean'); // => true

serializer.supportsSerialize(true); // => true
serializer.serialize(true); // => true
```

[Back to Overview](http://haircvt.github.io/serializerjs/manual/overview.html)

[Next: Reusable serializers: SerializerAware](http://haircvt.github.io/serializerjs/manual/usage.html#serializeraware)
