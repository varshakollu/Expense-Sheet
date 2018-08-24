"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Approve_Expenses = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactHelmet = require("react-helmet");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _DayPickerInput = require("react-day-picker/DayPickerInput");

var _DayPickerInput2 = _interopRequireDefault(_DayPickerInput);

require("react-day-picker/lib/style.css");

var _moment3 = require("react-day-picker/moment");

require("whatwg-fetch");

var _ReactHTMLTable_ToExcel = require("./ReactHTMLTable_ToExcel");

var _ReactHTMLTable_ToExcel2 = _interopRequireDefault(_ReactHTMLTable_ToExcel);

var _reactModal = require("react-modal");

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Approve_Expenses = exports.Approve_Expenses = function (_React$Component) {
  _inherits(Approve_Expenses, _React$Component);

  function Approve_Expenses(props) {
    _classCallCheck(this, Approve_Expenses);

    var _this = _possibleConstructorReturn(this, (Approve_Expenses.__proto__ || Object.getPrototypeOf(Approve_Expenses)).call(this, props));

    props = window.props;
    _this.handleFromChange = _this.handleFromChange.bind(_this);
    _this.handleToChange = _this.handleToChange.bind(_this);
    _this.filterDateRange = _this.filterDateRange.bind(_this);
    _this.searchInputChange = _this.searchInputChange.bind(_this);
    _this.clearFilters = _this.clearFilters.bind(_this);
    _this.handleOpenModal = _this.handleOpenModal.bind(_this);
    _this.handleCloseModal = _this.handleCloseModal.bind(_this);
    _this.state = {
      statuses: [],
      files: [],
      searchValue: '',
      sortValue: null,
      from: undefined,
      to: undefined,
      showModal: false,
      currentExpenseID: 0,
      currentExpenseFirstName: '',
      currentExpenseLastName: '',
      currentExpenseCreationDate: 0,
      currentExpenseName: '',
      currentExpenseAmount: 0

    };
    return _this;
  }

  _createClass(Approve_Expenses, [{
    key: "showFromMonth",
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
    key: "searchInputChange",
    value: function searchInputChange(event) {
      this.searchValue = event.target.value.toLowerCase();
      this.setState({ searchValue: this.searchValue });
    }
  }, {
    key: "clearFilters",
    value: function clearFilters() {
      document.getElementById("searchField").value = "";
      this.state.searchValue = '';
      var from = this.state.from = undefined;
      var to = this.state.to = undefined;
      this.filterDateRange(from, to);
    }
  }, {
    key: "focusTo",
    value: function focusTo() {
      var _this2 = this;

      this.timeout = setTimeout(function () {
        return _this2.to.getInput().focus();
      }, 0);
    }
  }, {
    key: "handleFromChange",
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
    key: "handleToChange",
    value: function handleToChange(to) {
      this.setState({ to: to }, this.showFromMonth);
      var from = this.state.from;
      this.filterDateRange(from, to);
    }
  }, {
    key: "filterDateRange",
    value: function filterDateRange(from, to) {
      var _this4 = this;

      if (from == undefined) {
        from = new Date("05/20/2018");
      }

      if (to == undefined) {
        to = new Date();
      }

      var currentLoggedinUsername = props.userName;
      var query = "managername=" + currentLoggedinUsername + "&startDate=" + from + "&endDate=" + to;
      var url = "approvals?" + query;

      fetch(url).then(function (res) {
        return res.json();
      }).then(function (res) {
        _this4.setState({
          statuses: res
        });
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.filterDateRange(undefined, undefined);
    }
  }, {
    key: "handleOpenModal",
    value: function handleOpenModal(currentExpenseID, currentExpenseFirstName, currentExpenseLastName, currentExpenseCreationDate, currentExpenseName, currentExpenseAmount) {
      var _this5 = this;

      this.setState({
        currentExpenseID: currentExpenseID,
        currentExpenseFirstName: currentExpenseFirstName,
        currentExpenseLastName: currentExpenseLastName,
        currentExpenseCreationDate: currentExpenseCreationDate,
        currentExpenseName: currentExpenseName,
        currentExpenseAmount: currentExpenseAmount
      });

      debugger;
      fetch("/approvals/" + currentExpenseID).then(function (res) {
        return res.json();
      }).then(function (res) {
        _this5.setState({
          files: res
        });
      });
      this.setState({ showModal: true });
    }
  }, {
    key: "handleCloseModal",
    value: function handleCloseModal() {
      this.setState({ showModal: false });
    }
  }, {
    key: "handleFileDisplay",
    value: function handleFileDisplay(fileID, fileType) {

      fetch("/approvals/" + this.state.currentExpenseID + "/file/" + fileID).then(function (response) {
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
      var _this6 = this;

      var currentLoggedinUsername = props.userName;
      var _state2 = this.state,
          from = _state2.from,
          to = _state2.to;

      var modifiers = { start: from, end: to };
      var dateFormat = require('dateformat');
      var sortedExpensesBySearch = this.state.statuses.filter(function (p) {
        if (_this6.state.searchValue) {
          return p.firstName.toLowerCase().indexOf(_this6.state.searchValue) !== -1 || p.lastName.toLowerCase().indexOf(_this6.state.searchValue) !== -1 || p.expenseName.toLowerCase().indexOf(_this6.state.searchValue) !== -1 || p.status.toLowerCase().indexOf(_this6.state.searchValue) !== -1;
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

      var tableData;

      if (sortedExpensesBySearch.length == 0) {
        tableData = _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "h3",
            null,
            " No Records Found "
          )
        );
      } else {
        tableData = _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("img", { src: "http://egov.eletsonline.com/wp-content/uploads/2017/10/yash-technologies-pvt-ltd-m-g-road-indore-2de3l.jpg", alt: "Yash Technologies", width: "150", height: "100", id: "image-xls", style: { display: 'none' } }),
          _react2.default.createElement(
            "table",
            { id: "table-to-xls-approval", style: { border: '1.5px solid black', width: '95%' }, className: "table table-bordered" },
            _react2.default.createElement(
              "thead",
              { style: tableHeaderStyle },
              _react2.default.createElement(
                "tr",
                null,
                _react2.default.createElement(
                  "th",
                  { style: tableBorderStyle, scope: "col" },
                  "Expense ID"
                ),
                _react2.default.createElement(
                  "th",
                  { style: tableBorderStyle, scope: "col" },
                  "First Name"
                ),
                _react2.default.createElement(
                  "th",
                  { style: tableBorderStyle, scope: "col" },
                  "Last Name"
                ),
                _react2.default.createElement(
                  "th",
                  { style: tableBorderStyle, scope: "col" },
                  "Submission Date"
                ),
                _react2.default.createElement(
                  "th",
                  { style: tableBorderStyle, scope: "col" },
                  "Expense Name"
                ),
                _react2.default.createElement(
                  "th",
                  { style: tableBorderStyle, scope: "col" },
                  "Total Amount"
                ),
                _react2.default.createElement(
                  "th",
                  { style: tableBorderStyle, scope: "col" },
                  "Status"
                )
              )
            ),
            _react2.default.createElement(
              "tbody",
              null,
              sortedExpensesBySearch.map(function (p) {
                return _react2.default.createElement(
                  "tr",
                  { scope: "row" },
                  _react2.default.createElement(
                    "td",
                    { style: tableBorderStyle },
                    _react2.default.createElement(
                      "button",
                      {
                        className: "btn btn-link",
                        onClick: function onClick() {
                          _this6.handleOpenModal(p.expenseID, p.firstName, p.lastName, p.creationDate, p.expenseName, p.amount);
                        } },
                      _react2.default.createElement(
                        "strong",
                        null,
                        p.expenseID
                      )
                    )
                  ),
                  _react2.default.createElement(
                    "td",
                    { style: tableBorderStyle },
                    p.firstName
                  ),
                  _react2.default.createElement(
                    "td",
                    { style: tableBorderStyle },
                    p.lastName
                  ),
                  _react2.default.createElement(
                    "td",
                    { style: tableBorderStyle },
                    p.creationDate
                  ),
                  _react2.default.createElement(
                    "td",
                    { style: tableBorderStyle },
                    p.expenseName
                  ),
                  _react2.default.createElement(
                    "td",
                    { style: tableBorderStyle },
                    "$",
                    p.amount
                  ),
                  _react2.default.createElement(
                    "td",
                    { style: tableBorderStyle },
                    p.status
                  )
                );
              })
            )
          )
        );
      }

      return _react2.default.createElement(
        "div",
        { style: { marginLeft: '17%' } },
        _react2.default.createElement(
          "h3",
          { style: { marginBottom: '2%' } },
          "Approval Status"
        ),
        _react2.default.createElement(
          "div",
          { className: "InputFromTo", style: { marginBottom: '2%' } },
          _react2.default.createElement(_DayPickerInput2.default, {
            value: from,
            placeholder: " From",
            format: "LL",
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
                return _this6.to.getInput().focus();
              }
            },
            onDayChange: this.handleFromChange
          }),
          ' ',
          "\u2014",
          ' ',
          _react2.default.createElement(
            "span",
            { className: "InputFromTo-to" },
            _react2.default.createElement(_DayPickerInput2.default, {
              ref: function ref(el) {
                return _this6.to = el;
              },
              value: to,
              placeholder: " To",
              format: "LL",
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
              "style",
              null,
              "\n  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {\n    background-color: #f0f8ff !important;\n    color: #4a90e2;\n  }\n  .InputFromTo .DayPicker-Day {\n    border-radius: 0 !important;\n  }\n  .InputFromTo .DayPicker-Day--start {\n    border-top-left-radius: 50% !important;\n    border-bottom-left-radius: 50% !important;\n  }\n  .InputFromTo .DayPicker-Day--end {\n    border-top-right-radius: 50% !important;\n    border-bottom-right-radius: 50% !important;\n  }\n  .InputFromTo .DayPickerInput-Overlay {\n    width: 550px;\n  }\n  .InputFromTo-to .DayPickerInput-Overlay {\n    margin-left: -198px;\n  }\n"
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { style: { float: 'none', marginBottom: '2%' } },
          _react2.default.createElement("input", { id: "searchField", style: { width: '27%', display: 'inline-block' }, className: "form-control", type: "text", placeholder: "Search First/Last/Expense Name, Status", onChange: this.searchInputChange, "aria-label": "Search" }),
          _react2.default.createElement(
            "button",
            { type: "submit", style: { marginLeft: '1%' }, className: "btn btn-primary btn-sm", onClick: function onClick() {
                return _this6.clearFilters();
              } },
            "Clear Filters"
          ),
          _react2.default.createElement(
            "div",
            { style: { float: 'right', marginRight: '5%' } },
            _react2.default.createElement(_ReactHTMLTable_ToExcel2.default, {
              className: "download-table-xls-button",
              table: "table-to-xls-approval",
              filename: "Expense Approvals - " + currentLoggedinUsername,
              sheet: "Expense Approval Sheet",
              buttonText: "Download",
              img: "image-xls",
              dates: "Expense Report (" + dateFormat(fromValue, "mmm d, yyyy") + "-" + dateFormat(toValue, "mmm d, yyyy") + ")" })
          )
        ),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            _reactModal2.default,
            {
              isOpen: this.state.showModal,
              onRequestClose: this.handleCloseModal
            },
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                "h4",
                null,
                _react2.default.createElement(
                  "strong",
                  null,
                  "Expense information for ID : "
                ),
                this.state.currentExpenseID
              ),
              _react2.default.createElement("br", null),
              _react2.default.createElement(
                "p",
                null,
                _react2.default.createElement(
                  "strong",
                  null,
                  "First name : "
                ),
                " ",
                this.state.currentExpenseFirstName
              ),
              _react2.default.createElement("br", null),
              _react2.default.createElement(
                "p",
                null,
                _react2.default.createElement(
                  "strong",
                  null,
                  "Last name : "
                ),
                this.state.currentExpenseLastName
              ),
              _react2.default.createElement("br", null),
              _react2.default.createElement(
                "p",
                null,
                _react2.default.createElement(
                  "strong",
                  null,
                  "Submission date : "
                ),
                this.state.currentExpenseCreationDate
              ),
              _react2.default.createElement("br", null),
              _react2.default.createElement(
                "p",
                null,
                _react2.default.createElement(
                  "strong",
                  null,
                  "Expense name: "
                ),
                this.state.currentExpenseName
              ),
              _react2.default.createElement("br", null),
              _react2.default.createElement(
                "p",
                null,
                _react2.default.createElement(
                  "strong",
                  null,
                  "Amount : "
                ),
                this.state.currentExpenseAmount
              ),
              _react2.default.createElement("br", null),
              _react2.default.createElement(
                "p",
                null,
                _react2.default.createElement(
                  "strong",
                  null,
                  "Attachments : "
                )
              ),
              _react2.default.createElement(
                "form",
                null,
                this.state.files.map(function (p) {
                  return _react2.default.createElement(
                    "ul",
                    { className: "form-group col-lg-8" },
                    _react2.default.createElement(
                      "li",
                      null,
                      _react2.default.createElement(
                        "button",
                        { className: "btn btn-link", type: "button",
                          onClick: function onClick() {
                            _this6.handleFileDisplay(p.fileID, p.fileType);
                          } },
                        p.fileName
                      )
                    )
                  );
                }),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "div",
                  { className: "form-group col-lg-8" },
                  _react2.default.createElement(
                    "label",
                    null,
                    "Comment:"
                  ),
                  _react2.default.createElement("textarea", { className: "form-control", rows: "5", id: "comment" }),
                  _react2.default.createElement("br", null),
                  _react2.default.createElement(
                    "div",
                    { "class": "alert alert-info", role: "alert" },
                    _react2.default.createElement(
                      "strong",
                      null,
                      "Heads up!"
                    ),
                    " Review all the expense information and attachments before approving this expense. You cannot revert once it is approved."
                  ),
                  _react2.default.createElement("br", null),
                  _react2.default.createElement(
                    "button",
                    { className: "btn btn-primary", type: "button", onClick: this.handleCloseModal },
                    "Approve"
                  ),
                  _react2.default.createElement(
                    "button",
                    { className: "btn btn-link", type: "button", onClick: this.handleCloseModal },
                    "Close"
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          null,
          tableData
        )
      );
    }
  }]);

  return Approve_Expenses;
}(_react2.default.Component);