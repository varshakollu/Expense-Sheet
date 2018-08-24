'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Help = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Help = exports.Help = function (_React$Component) {
    _inherits(Help, _React$Component);

    function Help() {
        _classCallCheck(this, Help);

        return _possibleConstructorReturn(this, (Help.__proto__ || Object.getPrototypeOf(Help)).apply(this, arguments));
    }

    _createClass(Help, [{
        key: 'render',
        value: function render() {

            var divStyle = (0, _glamor.css)({
                marginLeft: '20%',
                marginRight: '5%',
                textAlign: 'justify'
            });

            var impHelpStyle = (0, _glamor.css)({
                color: 'red'
            });

            return _react2.default.createElement(
                'div',
                divStyle,
                _react2.default.createElement(
                    'h3',
                    null,
                    'GUIDELINES FOR APPROVED EXPENSES'
                ),
                _react2.default.createElement(
                    'ol',
                    null,
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'p',
                            null,
                            'Travel expense deductions are limited to those incurred which, considering all circumstances, are not lavish or extravagant.'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'p',
                            null,
                            'A daily record of all expenditures must be kept while traveling.'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'p',
                            null,
                            'A record must be kept of any expenditures incurred for business meals.  A business meal takes place when food and/or beverages are provided to persons having a business relationship to the company at a place conducive to a business discussion, such as a luncheon club or quiet restaurant.  It is not necessary that a business discussion actually take place.  In such cases you should record the expenditure in the business meal section of the expense report.'
                        )
                    )
                ),
                _react2.default.createElement(
                    'h3',
                    null,
                    'INSTRUCTIONS FOR PREPARING EXPENSE REPORT'
                ),
                _react2.default.createElement(
                    'ol',
                    null,
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'p',
                            impHelpStyle,
                            'Receipts for hotel and transportation expenses, regardless of amount, must be attached to the report.  All other expenditures, of $10 or more, must also be attached.'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'p',
                            null,
                            'The "Trans. Paid by Self" column should be used for items such as airline tickets, so long as they are purchased by the employee.'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'p',
                            null,
                            'The meal column should include only expenditures for meals consumed by you.  Expenses for meals consumed by others should be recorded either in the miscellaneous or business meal section of the expense report, as the situation warrants.'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'p',
                            null,
                            'Incidental expenses should include an itemized listing of items such as tips (other than meal tips), laundry, telephone and/or telegraph charges, postage, and other proper, business-related expenditures.'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'p',
                            null,
                            'Each column should be totaled and carried over to the "EXPENSE SUMMARY" section.'
                        )
                    )
                )
            );
        }
    }]);

    return Help;
}(_react2.default.Component);