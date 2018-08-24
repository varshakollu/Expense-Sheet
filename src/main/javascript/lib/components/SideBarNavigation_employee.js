"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SideBarNavigation_employee = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _glamor = require("glamor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideBarNavigation_employee = exports.SideBarNavigation_employee = function (_React$Component) {
    _inherits(SideBarNavigation_employee, _React$Component);

    function SideBarNavigation_employee(props) {
        _classCallCheck(this, SideBarNavigation_employee);

        var _this = _possibleConstructorReturn(this, (SideBarNavigation_employee.__proto__ || Object.getPrototypeOf(SideBarNavigation_employee)).call(this, props));

        props = window.props;
        return _this;
    }

    _createClass(SideBarNavigation_employee, [{
        key: "render",
        value: function render() {
            var navLinkStyle = (0, _glamor.css)({
                color: 'white',
                fontFamily: 'source_sans_proregular',
                fontStyle: 'normal',
                fontSize: '125%',
                padding: "20px"
            });

            var onMouseOverNavLinkStyle = (0, _glamor.hover)({
                color: 'red'
            });

            var iconStyles = (0, _glamor.css)({
                marginRight: "5%"
            });

            return _react2.default.createElement(
                "div",
                { style: {
                        float: "left",
                        width: "15%",
                        height: "100%",
                        backgroundColor: '#01498B'
                    } },
                _react2.default.createElement(
                    "ul",
                    { className: "nav flex-column" },
                    _react2.default.createElement(
                        "li",
                        { className: "nav-item" },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            _extends({}, navLinkStyle, onMouseOverNavLinkStyle, { to: "/" }),
                            _react2.default.createElement("span", _extends({ className: "glyphicon glyphicon-home" }, iconStyles)),
                            _react2.default.createElement(
                                "span",
                                null,
                                "Home"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        { className: "nav-item" },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            _extends({ className: "nav-link active" }, navLinkStyle, onMouseOverNavLinkStyle, { to: "/upload" }),
                            _react2.default.createElement("span", _extends({ className: "glyphicon glyphicon-upload" }, iconStyles)),
                            _react2.default.createElement(
                                "span",
                                null,
                                "Upload Bills"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        { className: "nav-item" },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            _extends({ className: "nav-link active" }, navLinkStyle, onMouseOverNavLinkStyle, { to: "/status" }),
                            _react2.default.createElement("span", _extends({ className: "glyphicon glyphicon-list-alt" }, iconStyles)),
                            _react2.default.createElement(
                                "span",
                                null,
                                "Check status"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        { className: "nav-item" },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            _extends({ className: "nav-link active" }, navLinkStyle, onMouseOverNavLinkStyle, { to: "/help" }),
                            _react2.default.createElement("span", _extends({ className: "glyphicon glyphicon-question-sign" }, iconStyles)),
                            _react2.default.createElement(
                                "span",
                                null,
                                "Help"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SideBarNavigation_employee;
}(_react2.default.Component);