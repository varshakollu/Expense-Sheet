"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Header = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _glamor = require("glamor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = exports.Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: "render",
        value: function render() {

            var myImage = "./yash-logo.png";

            var headerStyle = (0, _glamor.css)({
                backgroundColor: '#01498B',
                marginBottom: '0',
                border: 'none',
                minHeight: '65px',
                borderRadius: '0',
                borderBottom: '6px solid #48BED7'
            });

            var titleStyle = (0, _glamor.css)({
                fontFamily: 'source_sans_proregular',
                fontStyle: 'normal',
                fontSize: '25px',
                fontWeight: '300',
                marginTop: '10px',
                marginLeft: '50px',
                color: 'white'
            });

            var imageStyle = (0, _glamor.css)({
                marginTop: '10px'
            });

            var iconStyles = (0, _glamor.css)({
                color: 'white',
                marginRight: '5px'
            });

            var dropDownMenuStyle = (0, _glamor.css)({
                fontSize: 'large',
                textAlign: 'center'
            });

            return _react2.default.createElement(
                "nav",
                { className: "navbar navbar-light" },
                _react2.default.createElement(
                    "div",
                    _extends({}, headerStyle, { className: "container-fluid" }),
                    _react2.default.createElement(
                        "ul",
                        { className: "nav navbar-nav" },
                        _react2.default.createElement(
                            "li",
                            null,
                            _react2.default.createElement("img", _extends({}, imageStyle, { src: myImage, alt: "Yash Technologies" }))
                        ),
                        _react2.default.createElement(
                            "li",
                            null,
                            _react2.default.createElement(
                                "p",
                                titleStyle,
                                "Expense Reimbursement System "
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { "class": "btn-group nav navbar-nav navbar-right" },
                        _react2.default.createElement(
                            "button",
                            { type: "button", "class": "btn btn-danger btn-secondary btn-md dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                            _react2.default.createElement("span", _extends({ className: "glyphicon glyphicon-user" }, iconStyles)),
                            props.userName
                        ),
                        _react2.default.createElement(
                            "div",
                            _extends({ "class": "dropdown-menu" }, dropDownMenuStyle),
                            _react2.default.createElement("div", { "class": "dropdown-divider" }),
                            _react2.default.createElement(
                                "a",
                                { "class": "dropdown-item", href: "#" },
                                " ",
                                _react2.default.createElement("span", { className: "glyphicon glyphicon-log-out" }),
                                " Sign out"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Header;
}(_react2.default.Component);