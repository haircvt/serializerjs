'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SerializerAware2 = require('./SerializerAware');

var _SerializerAware3 = _interopRequireDefault(_SerializerAware2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This file is part of the JsSerializer package.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (c) HAIRCVT <hello@haircvt.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * file that was distributed with this source code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Base class that can be used for writing a custom serializer. It is especially convenient if your serializer do only
 * serialization or only deserialization. If not, it you are better off implementing SerializerAwareInterface or
 * SerializerInterface.
 *
 * @abstract
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */

var AbstractSerializer = function (_SerializerAware) {
  _inherits(AbstractSerializer, _SerializerAware);

  function AbstractSerializer() {
    _classCallCheck(this, AbstractSerializer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AbstractSerializer).apply(this, arguments));
  }

  _createClass(AbstractSerializer, [{
    key: 'serialize',

    /**
     * @inheritDoc
     */
    value: function serialize(data, format, context) {
      return data;
    }

    /**
     * @inheritDoc
     */

  }, {
    key: 'supportsSerialize',
    value: function supportsSerialize(data) {
      var format = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      return false;
    }

    /**
     * @inheritDoc
     */

  }, {
    key: 'deserialize',
    value: function deserialize(data, className) {
      var format = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var context = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

      return data;
    }

    /**
     * @inheritDoc
     */

  }, {
    key: 'supportsDeserialize',
    value: function supportsDeserialize(data, className) {
      var format = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      return false;
    }
  }]);

  return AbstractSerializer;
}(_SerializerAware3.default);

exports.default = AbstractSerializer;
//# sourceMappingURL=AbstractSerializer.js.map