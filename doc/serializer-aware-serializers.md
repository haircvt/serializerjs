# Reusable serializers: SerializerAware

Depending of the data (de-)serialized, you may need to use an existing serializer. For example, provided with have the
following user class:

```js
// app/Model/User.js

export default class User {
    /**
     * @param {string}   firstname
     * @param {string}   lastname
     * @param {?boolean} gender    True for female, false for male and null for unknown
     */
    constructor(firstname, lastname, type, gender) {
        this.firstname = firstname;
        this.lastname = lastname;
        this._gender = gender;
    }

    getFullname() {
        return `${this.firstname} ${this.lastname}`;
    }

    isMale() {
        return false === this._gender;
    }

    isFemale() {
        return true === this._gender;
    }

    isGenderKnown() {
        return null === this._gender;
    }
}
```

We can see that `User#gender` is a boolean. We are receiving the following JSON from an API:

```json
{
  "FirstName": "John",
  "LastName": "Doe",
  "gender": 0
}
```

As you can see, the `gender` value is not an boolean like we expected besides having the property names that do not
match with our `User` object. As a result we could do a serializer for `User`: `UserSerializer`:

```js
// app/Serializer/UserSerializer.js

import SerializationError from 'serializerjs'.SerializationError;
import SerializerInterface from 'serializerjs'.SerializerInterface;
import User from './../Model/User';

export default class UserSerializer extends SerializerInterface {
    /**
     * @inheritDoc
     *
     * @param {User} user
     *
     * @return {!object}
     */
    serialize(user, format, context) {
        return user;
    }

    /**
     * @inheritDoc
     */
    supportsSerialize(data, format = null) {
        return 'object' === typeof data && null !== data && data instanceof User;
    }

    /**
     * @inheritDoc
     *
     * @param {!object} userObject
     *
     * @return {User}
     */
    deserialize(userObject, ...args) {
        const firstname = this._deserializeString(userObject, 'firstname');
        const lastname = this._deserializeString(userObject, 'lastname');
        const gender = this._deserializeGender(userObject);

        return new User(firstname, lastname, gender);
    }

    /**
     * @param {!Object} object
     * @param {string}  property
     *
     * @return {string}
     * @throw {SerializationError}
     * @private
     */
    _deserializeString(object, property) {
        if (object.hasOwnProperty(property) && 'string' === typeof object[property]) {
            return object[property];
        }

        throw new SerializationError(`Could not serialize object#${property}`);
    }

    /**
     * @param {!Object} object
     *
     * @return {boolean}
     * @throw {SerializationError}
     */
    _deserializeGender(object) {
        // TODO
    }

    /**
     * @inheritDoc
     */
    supportsDeserialize(data, className, format = null) {
        return 'User' === className && 'object' === typeof data && null !== data;
    }
}
```

Now there is only deserializing the gender left. We could do it easily, but why bother? We already did it in
[`BooleanSerializer`](https://haircvt.github.io/serializerjs/manual/usage.html#basic-usage)!

Instead of re-doing this work, we instead use existing serializers. For that, `UserSerializer` should be made
"serializer aware", i.e. should extend [`SerializerAware`][1] instead of implementing [`SerializerInterface`][0]. By
doing is so, our `UserSerializer` will inherit a [`_serializer`][3] property which will have a reference to your
`Serialzier` at runtime. As a result, we can have the following code:

```js
// app/Serializer/UserSerializer.js

- import SerializerInterface from 'serializerjs'.SerializerInterface;
+ import SerializerAware from 'serializerjs'.SerializerAware;

- export default class UserSerializer extends SerializerInterface {
+ export default class UserSerializer extends SerializerAware {

/**
 * @param {!Object} object
 *
 * @return {boolean}
 * @throw {SerializationError}
 */
_deserializeGender(object) {
-    // TODO
+    if (object.hasOwnProperty('gender') && this._serializer.supportsDeserialize(object.gender, 'boolean')) {
+        return this._serializer.deserialize(object.gender, 'boolean');
+    }
+
+    throw new SerializationError(`Could not serialize object#gender`);
}
```

**In other words, `SerializerAware` allow you to quickly access to other serializer.**

[0]: https://haircvt.github.io/serializerjs/class/src/Serializer/SerializerInterface.js~SerializerInterface.html
[1]: https://haircvt.github.io/serializerjs/class/src/Serializer/SerializerAware.js~SerializerAware.html
[2]: https://haircvt.github.io/serializerjs/class/src/Serializer/SerializerAware.js~SerializerAware.html#instance-member-_serializer
