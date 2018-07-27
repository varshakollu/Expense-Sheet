"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Upload = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _glamor = require("glamor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Upload = exports.Upload = function (_React$Component) {
    _inherits(Upload, _React$Component);

    function Upload() {
        _classCallCheck(this, Upload);

        var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this));

        _this.state = {
            name: "",
            disableUpload: true
        };
        return _this;
    }

    _createClass(Upload, [{
        key: "handleNameChange",
        value: function handleNameChange(event) {
            debugger;
            if (event.target.value != "") {
                this.setState({ name: event.target.value, disableUpload: false });
            }
        }
    }, {
        key: "render",
        value: function render() {
            debugger;
            var divStyle = (0, _glamor.css)({
                marginLeft: '20%',
                marginRight: '5%',
                textAlign: 'justify'
            });
            var instructionStyle = (0, _glamor.css)({
                padding: '5%'
            });
            return _react2.default.createElement(
                "div",
                divStyle,
                _react2.default.createElement(
                    "div",
                    instructionStyle,
                    _react2.default.createElement(
                        "h4",
                        null,
                        "Please download the sample Expense sheet, fill it and upload it with an expense name. "
                    ),
                    _react2.default.createElement(
                        "a",
                        { href: "https://www.yash.com/onboard/Expense sheet template.xlsx" },
                        "Click here to download Sample Expense Sheet"
                    )
                ),
                _react2.default.createElement(
                    "form",
                    null,
                    _react2.default.createElement(
                        "div",
                        { "class": "form-group col-lg-6" },
                        _react2.default.createElement(
                            "label",
                            null,
                            "Enter the name for your expense"
                        ),
                        _react2.default.createElement("input", { id: "NameControl", className: "form-control",
                            type: "text",
                            onChange: this.handleNameChange.bind(this),
                            required: true })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "form-row" },
                        _react2.default.createElement(
                            "div",
                            { "class": "form-group col-lg-8" },
                            _react2.default.createElement(
                                "label",
                                null,
                                "Upload the Expense sheet"
                            ),
                            _react2.default.createElement("input", { type: "file", className: "form-control-file",
                                id: "FileControl",
                                disabled: this.state.disableUpload,
                                multiple: true,
                                required: true })
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "form-row" },
                        _react2.default.createElement(
                            "div",
                            { "class": "form-group col-lg-8" },
                            _react2.default.createElement(
                                "button",
                                { className: "btn btn-primary", type: "submit" },
                                "Submit my Expense report"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Upload;
}(_react2.default.Component);