# Serializer.js

[![Build Status](https://travis-ci.org/haircvt/serializerjs.svg?branch=master)](https://travis-ci.org/haircvt/serializerjs?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/haircvt/serializerjs/badges/score.svg)](https://www.bithound.io/github/haircvt/serializerjs)
[![Code Climate](https://codeclimate.com/repos/56a4c8e6d5d7662fef003878/badges/57fa85ee0f756c86aba4/gpa.svg)](https://codeclimate.com/repos/56a4c8e6d5d7662fef003878/feed)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/b6a967074fee4de592727c4069b738f0)](https://www.codacy.com/app/theofidry/serializerjs)
[![License](https://img.shields.io/badge/License-MIT-red.svg)](https://github.com/haircvt/serializerjs/blob/master/LICENSE)

A serializer is responsible for transforming a data in a specific format into a data in another format/schema.

For example, the serializer can be used to map client-side models and back-end side objects by checking all the
properties of a model to generate an object for which the values are understandable for the back-end service.

```
 +--------+ ----- serialize -----> +----------+
 | Client |                        | Back-End |
 +--------+ <---- deserialize ---- +----------+
```

Note that JavaScript does not support interfaces per se. By "Interface" is meant that this class should not
implement any method but provide the skeleton for child classes instead.

### Table of Content

1. [Installation](https://github.com/haircvt/serializerjs/manual/installation.html)
1. [Usage](#usage)
1. Advanced documentation
    1. [Reusable serializers: SerializerAware](https://github.com/haircvt/serializerjs/manual/usage.html#serializeraware)
    1. [Dynamic (de-serialization): formats & contexts](https://github.com/haircvt/serializerjs/manual/usage.html#serializer-contexts)
    1. [Frameworks integration](https://github.com/haircvt/serializerjs/manual/usage.html#frameworks-integration)
1. [Resources](#resources)
1. [Credits](#credits)
1. [License](#license)

### Installation

```
npm install --save serializerjs
```

#### ES6 (ES2015)

```js
import SerializerFactory from 'serializerjs';

// access to the other elements of the package:
import SerializerInterface from 'serializerjs'.SerializerInterface;
// or
const SerializerInterface = SerializerFactory.SerializerInterface;
// or
import SerializerInterface from 'serializerjs/lib/Serializer/SerializerInterface';
```

#### Nodejs/ES5

```js
var SerializerFactory = require('serializerjs');

// access to the other elements of the package:
var SerializerInterface = SerializerFactory.SerializerInterface;
// or
var SerializerInterface = require('serializerjs/lib/Serializer/SerializerInterface');
```

### Usage

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

[Back to the Table of Content](#table-of-content)

## Resources

* [API documentation](http://haircvt.github.io/serializerjs/)
* [Contribution Guide](https://github.com/haircvt/serializerjs/manual/faq.html#contributing)
* [Changelog](https://github.com/haircvt/serializerjs/manual/changelog.html)

## Credits

Project made by [Théo FIDRY](https://github.com/theofidry) and sponsored by [HAIRCVT](https://haircvt.com).

[0]: http://haircvt.github.io/serializerjs/class/src/Serializer/Serializer.js~Serializer.html
[1]: http://haircvt.github.io/serializerjs/class/src/Serializer/SerializerInterface.js~SerializerInterface.html

## License

Copyright © 2015 HAIRCVT Licensed under the [MIT license](https://github.com/haircvt/serializerjs/blob/master/LICENSE).
