"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _Home = require("./components/Home");

var _Upload = require("./components/Upload");

var _Check_status = require("./components/Check_status");

var _Approve_Expenses = require("./components/Approve_Expenses");

var _Unauthorized_page = require("./components/Unauthorized_page");

var _Help = require("./components/Help");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExpenseSheet = function (_React$Component) {
    _inherits(ExpenseSheet, _React$Component);

    function ExpenseSheet(props) {
        _classCallCheck(this, ExpenseSheet);

        var _this = _possibleConstructorReturn(this, (ExpenseSheet.__proto__ || Object.getPrototypeOf(ExpenseSheet)).call(this, props));

        console.log(window);
        props = window.props;
        return _this;
    }

    _createClass(ExpenseSheet, [{
        key: "render",
        value: function render() {
            debugger;
            var isAdmin = props.userRoles.toUpperCase() == "ROLE_admin".toUpperCase();
            return _react2.default.createElement(
                _reactRouterDom.HashRouter,
                null,
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(_reactRouterDom.Route, { path: "/", component: _Home.Home }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: "/upload", component: _Upload.Upload }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: "/status", component: _Check_status.Check_status }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: "/approve", render: function render() {
                            return isAdmin ? _react2.default.createElement(_Approve_Expenses.Approve_Expenses, null) : _react2.default.createElement(_reactRouterDom.Redirect, { to: "/unauthorized" });
                        } }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: "/unauthorized", component: _Unauthorized_page.Unauthorized_page }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: "/help", component: _Help.Help })
                )
            );
        }
    }]);

    return ExpenseSheet;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(ExpenseSheet, null), window.document.getElementById('container'));