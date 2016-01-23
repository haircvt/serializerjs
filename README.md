# JsSerializer

[![bitHound Overall Score](https://www.bithound.io/projects/badges/085b9910-bfd8-11e5-9c42-f5b4d2648507/score.svg)](https://www.bithound.io/github/theofidry/JsSerializer)
[![Code Climate](https://codeclimate.com/repos/56a029183218343a200018e1/badges/ce409e29c6a00fe3ad7a/gpa.svg)](https://codeclimate.com/repos/56a029183218343a200018e1/feed)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/d41db8e6138542d19fee0c29e0fc1550)](https://www.codacy.com)
[![Dependency Status](https://gemnasium.com/56902399aa1706b7f1c2655ec29d37fd.svg)](https://gemnasium.com/theofidry/JsSerializer)
[![License](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)

Deadly simple JavaScript serializer.

A serializer is a simple object providing you a way to parse/transform data from a format/schema to another.

### Install

//TODO

### Usage



Write your serializers:

```js
class BooleanSerializer extends SerializerAware {
    /**
     * @inheritDoc
     *
     * @param {?boolean} booleanValue
     * @param {string|*} context
     *
     * @return {boolean|number|null}
     */
    serialize(booleanValue, format, context) {
        if ('oldApi' === context) {
            return Number(booleanValue);
        }

        return booleanValue;
    }

    /**
     * @inheritDoc
     */
    supportsSerialize(data, format = null) {
        return 'boolean' === typeof data || null === data;
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

Then create the `serializer` service with all the serializers you which to register:

```js
const serializer = new Serializer(new Map([
    ['BooleanSerializer', booleanSerializer],
]));
```

Then use it:

```js
serializer.supportsDeserialize(1, 'boolean')); // => true
serializer.deserialize(1, 'boolean'); // => true

serializer.supportsSerialize(true); // => true
serializer.serialize(true); // => true
serializer.serialize(true, null, 'oldApi'); // => 1
```

### How does it works?


