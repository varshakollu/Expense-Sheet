'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Check_status = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');

var _reactBootstrapTable = require('react-bootstrap-table');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _DayPickerInput = require('react-day-picker/DayPickerInput');

var _DayPickerInput2 = _interopRequireDefault(_DayPickerInput);

require('react-day-picker/lib/style.css');

var _moment3 = require('react-day-picker/moment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Check_status = exports.Check_status = function (_React$Component) {
    _inherits(Check_status, _React$Component);

    function Check_status(props) {
        _classCallCheck(this, Check_status);

        var _this = _possibleConstructorReturn(this, (Check_status.__proto__ || Object.getPrototypeOf(Check_status)).call(this, props));

        props = window.props;
        _this.handleFromChange = _this.handleFromChange.bind(_this);
        _this.handleToChange = _this.handleToChange.bind(_this);
        _this.state = {
            statuses: [],
            from: undefined,
            to: undefined
        };
        return _this;
    }

    _createClass(Check_status, [{
        key: 'showFromMonth',
        value: function showFromMonth() {
            var _state = this.state,
                from = _state.from,
                to = _state.to;

            if (!from) {
                return;
            }
            if ((0, _moment2.default)(to).diff((0, _moment2.default)(from), 'months') < 2) {
                this.to.getDayPicker().showMonth(from);
            }
        }
    }, {
        key: 'handleFromChange',
        value: function handleFromChange(from) {
            this.setState({ from: from });
        }
    }, {
        key: 'handleToChange',
        value: function handleToChange(to) {
            this.setState({ to: to }, this.showFromMonth);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var currentLoggedinUsername = props.userName;
            fetch("/checkstatus/" + currentLoggedinUsername, {
                credentials: "same-origin"
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                _this2.setState({
                    statuses: res
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state2 = this.state,
                from = _state2.from,
                to = _state2.to;

            var modifiers = { start: from, end: to };
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h3',
                    null,
                    'Check status of previously uploaded bills'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'InputFromTo' },
                    _react2.default.createElement(_DayPickerInput2.default, {
                        value: from,
                        placeholder: 'From',
                        format: 'LL',
                        formatDate: _moment3.formatDate,
                        parseDate: _moment3.parseDate,
                        dayPickerProps: {
                            selectedDays: [from, { from: from, to: to }],
                            disabledDays: { after: to },
                            toMonth: to,
                            modifiers: modifiers,
                            numberOfMonths: 2,
                            onDayClick: function onDayClick() {
                                return _this3.to.getInput().focus();
                            }
                        },
                        onDayChange: this.handleFromChange
                    }),
                    ' ',
                    '\u2014',
                    ' ',
                    _react2.default.createElement(
                        'span',
                        { className: 'InputFromTo-to' },
                        _react2.default.createElement(_DayPickerInput2.default, {
                            ref: function ref(el) {
                                return _this3.to = el;
                            },
                            value: to,
                            placeholder: 'To',
                            format: 'LL',
                            formatDate: _moment3.formatDate,
                            parseDate: _moment3.parseDate,
                            dayPickerProps: {
                                selectedDays: [from, { from: from, to: to }],
                                disabledDays: { before: from },
                                modifiers: modifiers,
                                month: from,
                                fromMonth: from,
                                numberOfMonths: 2
                            },
                            onDayChange: this.handleToChange
                        })
                    ),
                    _react2.default.createElement(
                        _reactHelmet2.default,
                        null,
                        _react2.default.createElement(
                            'style',
                            null,
                            '\n  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {\n    background-color: #f0f8ff !important;\n    color: #4a90e2;\n  }\n  .InputFromTo .DayPicker-Day {\n    border-radius: 0 !important;\n  }\n  .InputFromTo .DayPicker-Day--start {\n    border-top-left-radius: 50% !important;\n    border-bottom-left-radius: 50% !important;\n  }\n  .InputFromTo .DayPicker-Day--end {\n    border-top-right-radius: 50% !important;\n    border-bottom-right-radius: 50% !important;\n  }\n  .InputFromTo .DayPickerInput-Overlay {\n    width: 550px;\n  }\n  .InputFromTo-to .DayPickerInput-Overlay {\n    margin-left: -198px;\n  }\n'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _reactBootstrapTable.BootstrapTable,
                        { ref: 'table', data: this.state.statuses,
                            tableStyle: { paddingLeft: '20%' }, condensed: true },
                        _react2.default.createElement(
                            _reactBootstrapTable.TableHeaderColumn,
                            { dataField: 'submittedDate', dataAlign: 'center',
                                filter: { type: 'DateFilter' }, isKey: true },
                            'Creation Date'
                        ),
                        _react2.default.createElement(
                            _reactBootstrapTable.TableHeaderColumn,
                            { dataField: 'amount', dataAlign: 'center',
                                filter: { type: 'NumberFilter' } },
                            'Total Amount'
                        ),
                        _react2.default.createElement(
                            _reactBootstrapTable.TableHeaderColumn,
                            { dataField: 'reason', dataAlign: 'center',
                                filter: { type: 'TextFilter' } },
                            'Reason for Expense'
                        ),
                        _react2.default.createElement(
                            _reactBootstrapTable.TableHeaderColumn,
                            { dataField: 'approvalStatus', dataAlign: 'center',
                                filter: { type: 'TextFilter' } },
                            'Status'
                        )
                    )
                )
            );
        }
    }]);

    return Check_status;
}(_react2.default.Component);