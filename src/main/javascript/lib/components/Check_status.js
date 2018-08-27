'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Check_status = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _DayPickerInput = require('react-day-picker/DayPickerInput');

var _DayPickerInput2 = _interopRequireDefault(_DayPickerInput);

require('react-day-picker/lib/style.css');

var _moment3 = require('react-day-picker/moment');

require('whatwg-fetch');

var _ReactHTMLTable_ToExcel = require('./ReactHTMLTable_ToExcel');

var _ReactHTMLTable_ToExcel2 = _interopRequireDefault(_ReactHTMLTable_ToExcel);

var _reactJsPagination = require('react-js-pagination');

var _reactJsPagination2 = _interopRequireDefault(_reactJsPagination);

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
    _this.filterDateRange = _this.filterDateRange.bind(_this);
    _this.searchInputChange = _this.searchInputChange.bind(_this);
    _this.clearFilters = _this.clearFilters.bind(_this);
    _this.handlePageChange = _this.handlePageChange.bind(_this);
    _this.handleSubmitSuccess = _this.handleSubmitSuccess.bind(_this);
    _this.handleSubmitFailure = _this.handleSubmitFailure.bind(_this);
    _this.onToggleDropDown = _this.onToggleDropDown.bind(_this);
    _this.state = {
      statuses: [],
      renderedUsers: [],
      renderedUsers1: [],
      searchValue: '',
      sortValue: null,
      from: undefined,
      to: undefined,
      activePage: 1,
      itemsCountPerPage: 5
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
    key: 'searchInputChange',
    value: function searchInputChange(event) {
      this.searchValue = event.target.value.toLowerCase();
      this.setState({ searchValue: this.searchValue });
      this.handlePageChange(1);
    }
  }, {
    key: 'clearFilters',
    value: function clearFilters() {
      document.getElementById("searchField").value = "";
      this.state.searchValue = '';
      var from = this.state.from = undefined;
      var to = this.state.to = undefined;
      this.filterDateRange(from, to);
    }
  }, {
    key: 'focusTo',
    value: function focusTo() {
      var _this2 = this;

      this.timeout = setTimeout(function () {
        return _this2.to.getInput().focus();
      }, 0);
    }
  }, {
    key: 'handleFromChange',
    value: function handleFromChange(from) {
      var _this3 = this;

      this.setState({ from: from }, function () {
        if (!_this3.state.to) {
          _this3.focusTo();
        }
      });
      var to = this.state.to;
      this.filterDateRange(from, to);
    }
  }, {
    key: 'handleToChange',
    value: function handleToChange(to) {
      this.setState({ to: to }, this.showFromMonth);
      var from = this.state.from;
      this.filterDateRange(from, to);
    }
  }, {
    key: 'filterDateRange',
    value: function filterDateRange(from, to) {
      if (from == undefined) {
        from = new Date("05/20/2018");
      }
      if (to == undefined) {
        to = new Date();
      }

      var currentLoggedinUsername = props.userName;
      var postData = {
        "username": currentLoggedinUsername,
        "startDate": from,
        "endDate": to
      };

      $.ajax({
        contentType: "application/json",
        type: "GET",
        url: "/expenses",
        data: postData,
        success: this.handleSubmitSuccess,
        error: this.handleSubmitFailure
      });
    }
  }, {
    key: 'handleSubmitSuccess',
    value: function handleSubmitSuccess(data) {
      this.setState({
        statuses: data
      });
      this.handlePageChange(1);
    }
  }, {
    key: 'handleSubmitFailure',
    value: function handleSubmitFailure(error) {
      console.log(error);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.filterDateRange(undefined, undefined);
    }
  }, {
    key: 'handlePageChange',
    value: function handlePageChange(pageNumber) {
      var numberOfRecords = void 0;
      if (document.getElementById("select") == null) {
        numberOfRecords = 5;
      } else {
        numberOfRecords = Number(document.getElementById("select").value);
      }
      var renderedUsers1 = this.state.renderedUsers.slice((pageNumber - 1) * numberOfRecords, (pageNumber - 1) * numberOfRecords + numberOfRecords);
      this.setState({ activePage: pageNumber, itemsCountPerPage: numberOfRecords, renderedUsers1: renderedUsers1 });
    }
  }, {
    key: 'onToggleDropDown',
    value: function onToggleDropDown() {
      this.handlePageChange(1);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var currentLoggedinUsername = props.userName;
      var _state2 = this.state,
          from = _state2.from,
          to = _state2.to;
      var renderedUsers1 = this.state.renderedUsers1;

      var modifiers = { start: from, end: to };
      var dateFormat = require('dateformat');

      this.state.renderedUsers = this.state.statuses.filter(function (p) {
        if (_this4.state.searchValue) {
          return p.expenseName.toLowerCase().indexOf(_this4.state.searchValue) !== -1 || p.status.toLowerCase().indexOf(_this4.state.searchValue) !== -1;
        } else {
          return p;
        }
      });
      var tableBorderStyle = {
        border: '1.5px solid black'
      };

      var tableHeaderStyle = {
        backgroundColor: 'lightblue'
      };

      var fromValue = void 0;
      if (this.state.from == undefined) {
        fromValue = new Date("05/20/2018");
      } else {
        fromValue = this.state.from;
      }

      var toValue = void 0;
      if (this.state.to == undefined) {
        toValue = new Date();
      } else {
        toValue = this.state.to;
      }

      var tableData = void 0;

      if (this.state.renderedUsers.length == 0) {
        tableData = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h3',
            null,
            ' No Records Found '
          )
        );
      } else {
        tableData = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('img', { src: 'http://egov.eletsonline.com/wp-content/uploads/2017/10/yash-technologies-pvt-ltd-m-g-road-indore-2de3l.jpg', alt: 'Yash Technologies', width: '150', height: '100', id: 'image-xls', style: { display: 'none' } }),
          _react2.default.createElement(
            'table',
            { id: 'table-to-xls', style: { border: '1.5px solid black', width: '95%', display: 'none' }, className: 'table table-bordered' },
            _react2.default.createElement(
              'thead',
              { style: tableHeaderStyle },
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'th',
                  { style: tableBorderStyle, scope: 'col' },
                  'Expense ID'
                ),
                _react2.default.createElement(
                  'th',
                  { style: tableBorderStyle, scope: 'col' },
                  'Submission Date'
                ),
                _react2.default.createElement(
                  'th',
                  { style: tableBorderStyle, scope: 'col' },
                  'Total Amount'
                ),
                _react2.default.createElement(
                  'th',
                  { style: tableBorderStyle, scope: 'col' },
                  'Expense Name'
                ),
                _react2.default.createElement(
                  'th',
                  { style: tableBorderStyle, scope: 'col' },
                  'Status'
                )
              )
            ),
            _react2.default.createElement(
              'tbody',
              null,
              this.state.renderedUsers.map(function (p) {
                return _react2.default.createElement(
                  'tr',
                  { scope: 'row' },
                  _react2.default.createElement(
                    'td',
                    { style: tableBorderStyle },
                    p.expenseID
                  ),
                  _react2.default.createElement(
                    'td',
                    { style: tableBorderStyle },
                    p.creationDate
                  ),
                  _react2.default.createElement(
                    'td',
                    { style: tableBorderStyle },
                    '$',
                    p.amount
                  ),
                  _react2.default.createElement(
                    'td',
                    { style: tableBorderStyle },
                    p.expenseName
                  ),
                  _react2.default.createElement(
                    'td',
                    { style: tableBorderStyle },
                    p.status
                  )
                );
              })
            )
          ),
          _react2.default.createElement(
            'table',
            { id: 'table-to-xls-1', style: { border: '1.5px solid black', width: '95%' }, className: 'table table-bordered' },
            _react2.default.createElement(
              'thead',
              { style: tableHeaderStyle },
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'th',
                  { style: tableBorderStyle, scope: 'col' },
                  'Expense ID'
                ),
                _react2.default.createElement(
                  'th',
                  { style: tableBorderStyle, scope: 'col' },
                  'Submission Date'
                ),
                _react2.default.createElement(
                  'th',
                  { style: tableBorderStyle, scope: 'col' },
                  'Total Amount'
                ),
                _react2.default.createElement(
                  'th',
                  { style: tableBorderStyle, scope: 'col' },
                  'Expense Name'
                ),
                _react2.default.createElement(
                  'th',
                  { style: tableBorderStyle, scope: 'col' },
                  'Status'
                )
              )
            ),
            _react2.default.createElement(
              'tbody',
              null,
              renderedUsers1.map(function (p) {
                return _react2.default.createElement(
                  'tr',
                  { scope: 'row' },
                  _react2.default.createElement(
                    'td',
                    { style: tableBorderStyle },
                    p.expenseID
                  ),
                  _react2.default.createElement(
                    'td',
                    { style: tableBorderStyle },
                    p.creationDate
                  ),
                  _react2.default.createElement(
                    'td',
                    { style: tableBorderStyle },
                    '$',
                    p.amount
                  ),
                  _react2.default.createElement(
                    'td',
                    { style: tableBorderStyle },
                    p.expenseName
                  ),
                  _react2.default.createElement(
                    'td',
                    { style: tableBorderStyle },
                    p.status
                  )
                );
              })
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'select',
              { style: { float: 'left', marginLeft: '1%', marginTop: '2%', width: '6%' }, id: 'select', name: 'group', className: 'form-control', size: '1', onChange: this.onToggleDropDown },
              _react2.default.createElement(
                'option',
                { value: '5' },
                '5'
              ),
              _react2.default.createElement(
                'option',
                { value: '10' },
                '10'
              ),
              _react2.default.createElement(
                'option',
                { value: '25' },
                '25'
              )
            ),
            _react2.default.createElement(
              'div',
              { style: { float: 'right', marginRight: '5%', marginBottom: '10%' } },
              _react2.default.createElement(_reactJsPagination2.default, {
                hideDisabled: true,
                prevPageText: 'prev',
                nextPageText: 'next',
                firstPageText: 'first',
                lastPageText: 'last',
                activePage: this.state.activePage,
                itemsCountPerPage: this.state.itemsCountPerPage,
                totalItemsCount: this.state.renderedUsers.length,
                pageRangeDisplayed: 5,
                onChange: this.handlePageChange
              })
            )
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { style: { marginLeft: '17%' } },
        _react2.default.createElement(
          'h3',
          { style: { marginBottom: '2%' } },
          'Expense Status'
        ),
        _react2.default.createElement(
          'div',
          { className: 'InputFromTo', style: { marginBottom: '2%' } },
          _react2.default.createElement(_DayPickerInput2.default, {
            value: from,
            placeholder: ' From',
            format: 'LL',
            formatDate: _moment3.formatDate,
            parseDate: _moment3.parseDate,
            dayPickerProps: {
              selectedDays: [from, { from: from, to: to }],
              disabledDays: {
                after: new Date(),
                before: new Date("05/20/2018")
              },
              fromMonth: from,
              toMonth: to,
              modifiers: modifiers,
              numberOfMonths: 2,
              onDayClick: function onDayClick() {
                return _this4.to.getInput().focus();
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
                return _this4.to = el;
              },
              value: to,
              placeholder: ' To',
              format: 'LL',
              formatDate: _moment3.formatDate,
              parseDate: _moment3.parseDate,
              dayPickerProps: {
                selectedDays: [from, { from: from, to: to }],
                disabledDays: {
                  after: new Date(),
                  before: new Date("05/20/2018")
                },
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
          { style: { float: 'none', marginBottom: '2%' } },
          _react2.default.createElement('input', { id: 'searchField', style: { width: '25%', display: 'inline-block' }, className: 'form-control', type: 'text', placeholder: 'Search Expense Name/Status', onChange: this.searchInputChange, 'aria-label': 'Search' }),
          _react2.default.createElement(
            'button',
            { type: 'submit', style: { marginLeft: '1%' }, className: 'btn btn-primary btn-sm', onClick: function onClick() {
                return _this4.clearFilters();
              } },
            'Clear Filters'
          ),
          _react2.default.createElement(
            'div',
            { style: { float: 'right', marginRight: '5%' } },
            _react2.default.createElement(_ReactHTMLTable_ToExcel2.default, {
              className: 'download-table-xls-button',
              table: 'table-to-xls',
              filename: "Expense Sheet - " + currentLoggedinUsername,
              sheet: 'Expense Sheet',
              buttonText: 'Download',
              img: 'image-xls',
              dates: "Expense Report (" + dateFormat(fromValue, "mmm d, yyyy") + "-" + dateFormat(toValue, "mmm d, yyyy") + ")" })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'alert alert-info', role: 'alert', style: { width: '40%' } },
          _react2.default.createElement(
            'strong',
            null,
            'Note: '
          ),
          'Clear all the filters to download entire history.'
        ),
        _react2.default.createElement(
          'div',
          null,
          tableData
        )
      );
    }
  }]);

  return Check_status;
}(_react2.default.Component);