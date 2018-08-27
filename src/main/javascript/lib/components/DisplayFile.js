'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DisplayFile = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFileViewer = require('react-file-viewer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisplayFile = exports.DisplayFile = function (_Component) {
    _inherits(DisplayFile, _Component);

    function DisplayFile(props) {
        _classCallCheck(this, DisplayFile);

        var _this = _possibleConstructorReturn(this, (DisplayFile.__proto__ || Object.getPrototypeOf(DisplayFile)).call(this, props));

        debugger;
        _this.state = {
            expenseID: props.location.state.expenseID,
            fileID: props.location.state.fileID,
            filePath: "",
            fileType: ""
        };
        return _this;
    }

    _createClass(DisplayFile, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            debugger;
            var that = this;
            fetch("/approvals/" + this.state.expenseID + "/file/" + this.state.fileID).then(function (response) {
                return response.blob();
            }).then(function (data) {
                console.log(data);
                debugger;
                $("#pdfviewer").attr("src", URL.createObjectURL(new Blob([data], {
                    type: "application/pdf"
                })));

                // document.getElementById('myfile').filePath = objectURL;
                // document.getElementById('myfile').fileType = type;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'test'
                ),
                _react2.default.createElement('iframe', { id: 'pdfviewer' })
            );
        }
    }]);

    return DisplayFile;
}(_react.Component);