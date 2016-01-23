"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * This file is part of the JsSerializer package.
 *
 * (c) HAIRCVT <hello@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */

var UnimplementedSerializerMethodError = function (_Error) {
  _inherits(UnimplementedSerializerMethodError, _Error);

  function UnimplementedSerializerMethodError(message) {
    _classCallCheck(this, UnimplementedSerializerMethodError);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnimplementedSerializerMethodError).call(this, message));

    _this.name = _this.constructor.name;
    _this.message = message;
    Error.captureStackTrace(_this, _this.constructor.name);
    return _this;
  }

  return UnimplementedSerializerMethodError;
}(Error);

exports.default = UnimplementedSerializerMethodError;
//# sourceMappingURL=UnimplementedSerializerMethodError.js.map