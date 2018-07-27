"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Home = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Header = require("./Header");

var _SideBarNavigation_admin = require("./SideBarNavigation_admin");

var _SideBarNavigation_employee = require("./SideBarNavigation_employee");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = exports.Home = function (_React$Component) {
    _inherits(Home, _React$Component);

    function Home(props) {
        _classCallCheck(this, Home);

        var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

        props = window.props;
        return _this;
    }

    _createClass(Home, [{
        key: "render",
        value: function render() {
            var currentLoggedinUserRoles = props.userRoles;

            if (currentLoggedinUserRoles == "ROLE_admin") {
                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(_Header.Header, null),
                    _react2.default.createElement(_SideBarNavigation_admin.SideBarNavigation_admin, null)
                );
            } else if (currentLoggedinUserRoles == "ROLE_employee") {
                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(_Header.Header, null),
                    _react2.default.createElement(_SideBarNavigation_employee.SideBarNavigation_employee, null)
                );
            }
        }
    }]);

    return Home;
}(_react2.default.Component);