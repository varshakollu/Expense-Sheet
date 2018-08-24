"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Review = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("whatwg-fetch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Review = exports.Review = function (_React$Component) {
    _inherits(Review, _React$Component);

    function Review(props) {
        _classCallCheck(this, Review);

        var _this = _possibleConstructorReturn(this, (Review.__proto__ || Object.getPrototypeOf(Review)).call(this, props));

        debugger;
        if (props.location.state == undefined) {
            history.go(-1);
        } else {
            _this.state = {
                statuses: [],
                expenseID: props.location.state.expenseID
            };
        }

        _this.handleFileDisplay = _this.handleFileDisplay.bind(_this);
        return _this;
    }

    _createClass(Review, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            debugger;
            fetch("/approvals/" + this.state.expenseID).then(function (res) {
                return res.json();
            }).then(function (res) {
                _this2.setState({
                    statuses: res
                });
            });
        }
    }, {
        key: "handleFileDisplay",
        value: function handleFileDisplay(fileID, fileType) {

            fetch("/approvals/" + this.state.expenseID + "/file/" + fileID).then(function (response) {
                return response.blob();
            }).then(function (data) {
                debugger;
                var url = URL.createObjectURL(new Blob([data], {
                    // type: "application/pdf"
                    type: fileType
                }));
                window.open(url, "_blank");
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "h3",
                        null,
                        "Expense info"
                    ),
                    _react2.default.createElement(
                        "form",
                        { id: "myForm" },
                        this.state.statuses.map(function (p) {
                            return _react2.default.createElement(
                                "div",
                                { className: "form-group col-lg-6" },
                                _react2.default.createElement("br", null),
                                _react2.default.createElement(
                                    "button",
                                    { className: "btn btn-link", type: "button",
                                        onClick: function onClick(fileID) {
                                            _this3.handleFileDisplay(p.fileID, p.fileType);
                                        } },
                                    p.fileName
                                ),
                                _react2.default.createElement("br", null)
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "Comment:"
                    ),
                    _react2.default.createElement("textarea", { className: "form-control", rows: "5", id: "comment" })
                )
            );
        }
    }]);

    return Review;
}(_react2.default.Component);