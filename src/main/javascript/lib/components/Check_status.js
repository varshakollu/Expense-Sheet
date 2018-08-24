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
    // this.handlePagination = this.handlePagination.bind(this);
    _this.state = {
      statuses: [],
      searchValue: '',
      sortValue: null,
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
    key: 'searchInputChange',
    value: function searchInputChange(event) {
      var child = document.getElementById("myPager");

      // $("#myPager").empty();
      this.searchValue = event.target.value.toLowerCase();
      this.setState({ searchValue: this.searchValue });

      // this.handlePagination();
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
      var _this4 = this;

      // $("#myPager").empty();
      if (from == undefined) {
        from = new Date("05/20/2018");
      }

      if (to == undefined) {
        to = new Date();
      }

      var currentLoggedinUsername = props.userName;
      var query = "username=" + currentLoggedinUsername + "&startDate=" + from + "&endDate=" + to;
      var url = "expenses?" + query;

      fetch(url).then(function (res) {
        return res.json();
      }).then(function (res) {
        _this4.setState({
          statuses: res
        });
      });
      // this.handlePagination();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.filterDateRange(undefined, undefined);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {}
    // this.handlePagination();


    // handlePagination() {
    //   var that = this;
    //   $.fn.pageMe = function (opts) {
    //     var $this = this,
    //       defaults = {
    //         perPage: 5,
    //         showPrevNext: false,
    //         hidePageNumbers: false
    //       },
    //       settings = $.extend(defaults, opts);

    //     var listElement = $this;
    //     var perPage = settings.perPage;
    //     var children = listElement.children();
    //     var pager = $('.pager');
    //     var currentChild = document.getElementById("myPager");


    //     if (typeof settings.childSelector != "undefined") {
    //       children = listElement.find(settings.childSelector);
    //     }

    //     if (typeof settings.pagerSelector != "undefined") {
    //       pager = $(settings.pagerSelector);
    //     }

    //     var numItems = that.state.statuses.length;
    //     var numPages = Math.ceil(numItems / perPage);

    //     pager.data("curr", 0);

    //     if (settings.showPrevNext) {
    //       $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
    //     }

    //     var curr = 0;
    //     while (numPages > curr && (settings.hidePageNumbers == false)) {
    //       $('<li><a href="#" class="page_link">' + (curr + 1) + '</a></li>').appendTo(pager);
    //       curr++;
    //     }

    //     if (settings.showPrevNext) {
    //       $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
    //     }

    //     pager.find('.page_link:first').addClass('active');
    //     pager.find('.prev_link').hide();
    //     if (numPages <= 1) {
    //       pager.find('.next_link').hide();
    //     }
    //     pager.children().eq(1).addClass("active");

    //     children.hide();
    //     children.slice(0, perPage).show();

    //     pager.find('li .page_link').click(function () {
    //       var clickedPage = $(this).html().valueOf() - 1;
    //       goTo(clickedPage, perPage);
    //       return false;
    //     });
    //     pager.find('li .prev_link').click(function () {
    //       previous();
    //       return false;
    //     });
    //     pager.find('li .next_link').click(function () {
    //       next();
    //       return false;
    //     });

    //     function previous() {
    //       var goToPage = parseInt(pager.data("curr")) - 1;
    //       goTo(goToPage);
    //     }

    //     function next() {
    //       goToPage = parseInt(pager.data("curr")) + 1;
    //       goTo(goToPage);
    //     }

    //     function goTo(page) {
    //       var startAt = page * perPage,
    //         endOn = startAt + perPage;

    //       children.css('display', 'none').slice(startAt, endOn).show();

    //       if (page >= 1) {
    //         pager.find('.prev_link').show();
    //       }
    //       else {
    //         pager.find('.prev_link').hide();
    //       }

    //       if (page < (numPages - 1)) {
    //         pager.find('.next_link').show();
    //       }
    //       else {
    //         pager.find('.next_link').hide();
    //       }

    //       pager.data("curr", page);
    //       pager.children().removeClass("active");
    //       pager.children().eq(page + 1).addClass("active");

    //     }
    //   };

    //   $(document).ready(function () {
    //     $('#checkStatusTableBody').pageMe({ pagerSelector: '#myPager', showPrevNext: true, hidePageNumbers: false, perPage: 4 });
    //   });
    // }

  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var currentLoggedinUsername = props.userName;
      var _state2 = this.state,
          from = _state2.from,
          to = _state2.to;

      var modifiers = { start: from, end: to };
      var sortedExpensesBySearch = this.state.statuses.filter(function (p) {
        if (_this5.state.searchValue) {
          return p.expenseName.toLowerCase().indexOf(_this5.state.searchValue) !== -1 || p.status.toLowerCase().indexOf(_this5.state.searchValue) !== -1;
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

      var tableData;

      if (sortedExpensesBySearch.length == 0) {
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
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'table',
              { id: 'table-to-xls', style: { border: '1.5px solid black', width: '95%' }, className: 'table table-bordered' },
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
                { id: 'checkStatusTableBody' },
                sortedExpensesBySearch.map(function (p) {
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
            )
          ),
          _react2.default.createElement(
            'div',
            { 'class': 'col-md-12 text-center' },
            _react2.default.createElement('ul', { 'class': 'pagination pagination-lg pager', id: 'myPager' })
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
                return _this5.to.getInput().focus();
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
                return _this5.to = el;
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
          _react2.default.createElement('input', { id: 'searchField', style: { width: '25%', display: 'inline-block' }, className: 'form-control', type: 'text', placeholder: 'Search Reason/Status', onChange: this.searchInputChange, 'aria-label': 'Search' }),
          _react2.default.createElement(
            'button',
            { type: 'submit', style: { marginLeft: '1%' }, className: 'btn btn-primary btn-sm', onClick: function onClick() {
                return _this5.clearFilters();
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
              style: true })
          )
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