# Serializer format & context

When checking the [`SerializerInterface`][0] interface, you well notice the `format` and `context` parameters. `format`
is expected to be a string with the format name. For example `json`, `json-ld`, `website`, `legacy-api`, etc. It is should
give you an information of the `data` schema during the deserialization, or the schema in which the data will be serialized
during serialization.

For example with the [`BooleanSerializer`](https://haircvt.github.io/serializerjs/manual/usage.html#basic-usage), we could need to serialize booleans
again (in integer values) before sending the data back to the server. In which case, we could easily do something like
this:

```js
// app/Serializer/BooleanSerializer.js

supportsSerialize(data, format = null) {
-    return false;
+    return null === format || 'legacy-api' === format;
}

+ /**
+  * @inheritDoc
+  *
+  * @param {?boolean} booleanValue
+  * @param {?string}  format Either null or 'legacy-api'
+  *
+  * @return {boolean|number|null}
+  */
+ serialize(booleanValue, format, context) {
+     if ('legacy-api' === format) {
+         return Number(booleanValue);
+     }
+
+     return booleanValue;
+ }
```

Depending of the format, we could need to pass additional parameters for the serialization. That is where comes
`context`. This property can be pretty much everything you want: object, array, scalar value etc.

[0]: https://haircvt.github.io/serializerjs/class/src/Serializer/SerializerInterface.js~SerializerInterface.html
