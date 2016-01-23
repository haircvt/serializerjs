'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SerializerAware = require('./SerializerAware');

var _SerializerAware2 = _interopRequireDefault(_SerializerAware);

var _SerializerInterface2 = require('./SerializerInterface');

var _SerializerInterface3 = _interopRequireDefault(_SerializerInterface2);

var _SerializationError = require('./../Error/SerializationError');

var _SerializationError2 = _interopRequireDefault(_SerializationError);

var _UnexpectedTypeError = require('./../Error/UnexpectedTypeError');

var _UnexpectedTypeError2 = _interopRequireDefault(_UnexpectedTypeError);

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
 * Default serializer.
 *
 * Meant to aggregate all the application serializers and be used as the main serializer in the application. This means
 * that for serializing a new object, a custom serializer for this one should be done and registered to this serializer.
 *
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */

var Serializer = function (_SerializerInterface) {
    _inherits(Serializer, _SerializerInterface);

    /**
     * @param {Map.<string,SerializerInterface>} serializers
     */

    function Serializer(serializers) {
        _classCallCheck(this, Serializer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Serializer).call(this, serializers));

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {

            for (var _iterator = serializers.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var serializer = _step.value;

                if (false === serializer instanceof _SerializerInterface3.default) {
                    throw new _UnexpectedTypeError2.default('Expected serializer to implement SerializerInterface. Got ' + serializer.constructor + ' instead');
                }

                if (serializer instanceof _SerializerAware2.default) {
                    serializer.setSerializer(_this);
                }
            }

            /**
             * @type {Map.<string, SerializerInterface>}
             * @private
             */
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        _this._serializers = serializers;
        return _this;
    }

    /**
     * @inheritDoc
     */

    _createClass(Serializer, [{
        key: 'serialize',
        value: function serialize(data, format, context) {
            var serializer = this._getSerializerForSerialization(data, format, context);
            if (null !== serializer) {
                return serializer.serialize(data, format, context);
            }

            throw new _SerializationError2.default('An unexpected value could not be serialized: "' + data + '"');
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'supportsSerialize',
        value: function supportsSerialize(data) {
            var format = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            return null !== this._getSerializerForSerialization(data, format);
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'deserialize',
        value: function deserialize(data, className) {
            var format = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
            var context = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

            var serializer = this._getSerializerForDeserialization(data, className, format);
            if (null !== serializer) {
                return serializer.deserialize(data, className, format, context);
            }

            throw new _SerializationError2.default('An unexpected value could not be deserialized: "' + data + '"');
        }

        /**
         * @inheritDocz
         */

    }, {
        key: 'supportsDeserialize',
        value: function supportsDeserialize(data, className) {
            var format = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            return null !== this._getSerializerForDeserialization(data, className, format);
        }

        /**
         * @param {*}      data          Any data
         * @param {string} [format=null] Format the normalization result will be encoded as
         *
         * @return {?SerializerInterface}
         * @private
         */

    }, {
        key: '_getSerializerForSerialization',
        value: function _getSerializerForSerialization(data) {
            var format = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._serializers.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var serializer = _step2.value;

                    if (true === serializer.supportsSerialize(data, format)) {
                        return serializer;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return null;
        }

        /**
         * @param {*}       data      Data to restore
         * @param {string}  className The expected class to instantiate
         * @param {?string} format    Format the given data was extracted from
         *
         * @return {?SerializerInterface}
         * @private
         */

    }, {
        key: '_getSerializerForDeserialization',
        value: function _getSerializerForDeserialization(data, className, format) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._serializers.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var serializer = _step3.value;

                    if (true === serializer.supportsDeserialize(data, className, format)) {
                        return serializer;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return null;
        }
    }]);

    return Serializer;
}(_SerializerInterface3.default);

exports.default = Serializer;
//# sourceMappingURL=Serializer.js.map