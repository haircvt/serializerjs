'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This file is part of the JsSerializer package.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * (c) HAIRCVT <hello@haircvt.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * file that was distributed with this source code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SerializationError = require('./../Error/SerializationError');

var _SerializationError2 = _interopRequireDefault(_SerializationError);

var _UnimplementedSerializerMethodError = require('./../Error/UnimplementedSerializerMethodError');

var _UnimplementedSerializerMethodError2 = _interopRequireDefault(_UnimplementedSerializerMethodError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A serializer is responsible for transforming a data in a specific format into a data in another format.
 *
 * For example, the serializer can be used to map client-side models and back-end side objects by checking all the
 * properties of a model to generate an object for which the values are understandable for the back-end service.
 *
 * +--------+ ----- serialize -----> +----------+
 * | Client |                        | Back-End |
 * +--------+ <---- deserialize ---- +----------+
 *
 * Note that JavaScript does not support interfaces per se. But "Interface" it is meant that this class should not
 * implement any method but provide the skeleton for child classes instead.
 *
 * @interface
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */

var SerializerInterface = function () {
  function SerializerInterface() {
    _classCallCheck(this, SerializerInterface);
  }

  _createClass(SerializerInterface, [{
    key: 'serialize',

    /**
     * Serializes any data object into and object usable for the backend service.
     *
     * @param {*}      data    Any data
     * @param {string} format  Format the normalization result will be encoded as
     * @param {*}      context Options serializers have access to
     *
     * @return {*}
     * @throw SerializationError
     */
    value: function serialize(data, format, context) {
      throw new _UnimplementedSerializerMethodError2.default('Unimplemented "serialize()" method');
    }

    /**
     * Checks whether the given class is supported for serialization by this serializer.
     *
     * @param {*}      data          Any data
     * @param {string} [format=null] Format the normalization result will be encoded as
     *
     * @return {boolean}
     */

  }, {
    key: 'supportsSerialize',
    value: function supportsSerialize(data) {
      var format = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      throw new _UnimplementedSerializerMethodError2.default('Unimplemented "supportsSerialize()" method');
    }

    /**
     * Deserializes data back into an object of the given class.
     *
     * @param {*}       data             Data to restore
     * @param {string}  className        The expected class to instantiate
     * @param {?string} [format=null]    Format the given data was extracted from
     * @param {*}       [context=null]   Options available to the deserializer
     *
     * @return {*}
     * @throw SerializationError
     */

  }, {
    key: 'deserialize',
    value: function deserialize(data, className) {
      var format = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var context = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

      throw new _UnimplementedSerializerMethodError2.default('Unimplemented "deserialize()" method');
    }

    /**
     * Checks whether the given class is supported for deserialization by this serializer.
     *
     * @param {*}       data          Data to restore
     * @param {string}  className     The expected class to instantiate
     * @param {?string} [format=null] Format the given data was extracted from
     *
     * @return {boolean}
     */

  }, {
    key: 'supportsDeserialize',
    value: function supportsDeserialize(data, className) {
      var format = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      throw new _UnimplementedSerializerMethodError2.default('Unimplemented "supportsDeserialize()" method');
    }
  }]);

  return SerializerInterface;
}();

exports.default = SerializerInterface;
//# sourceMappingURL=SerializerInterface.js.map