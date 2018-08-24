import React from "react";
import moment from 'moment';
import Helmet from 'react-helmet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from "react-day-picker/moment";
import 'whatwg-fetch';
import ReactHTMLTable_ToExcel from "./ReactHTMLTable_ToExcel";

export class Check_status extends React.Component {

  constructor(props) {
    super(props);
    props = window.props;
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.filterDateRange = this.filterDateRange.bind(this);
    this.searchInputChange = this.searchInputChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    // this.handlePagination = this.handlePagination.bind(this);
    this.state = {
      statuses: [],
      searchValue: '',
      sortValue: null,
      from: undefined,
      to: undefined,
    };
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  searchInputChange(event) {
    var child = document.getElementById("myPager");

    // $("#myPager").empty();
    this.searchValue = event.target.value.toLowerCase();
    this.setState({ searchValue: this.searchValue });

    // this.handlePagination();
  }

  clearFilters() {
    document.getElementById("searchField").value = "";
    this.state.searchValue = '';
    var from = this.state.from = undefined;
    var to = this.state.to = undefined;
    this.filterDateRange(from, to);
  }

  focusTo() {
    this.timeout = setTimeout(() => this.to.getInput().focus(), 0);
  }

  handleFromChange(from) {
    this.setState({ from }, () => {
      if (!this.state.to) {
        this.focusTo();
      }
    });
    var to = this.state.to;
    this.filterDateRange(from, to);
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    var from = this.state.from;
    this.filterDateRange(from, to);
  }

  filterDateRange(from, to) {
    // $("#myPager").empty();
    if (from == undefined) {
      from = new Date("05/20/2018");
    }

    if (to == undefined) {
      to = new Date();
    }

    const currentLoggedinUsername = props.userName;
    let query = "username=" + currentLoggedinUsername + "&startDate=" + from + "&endDate=" + to;
    let url = "expenses?" + query

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          statuses: res
        });
      });
    // this.handlePagination();

  }

  componentWillMount() {
    this.filterDateRange(undefined, undefined);
  }
  componentDidUpdate() {
    // this.handlePagination();
  }

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
  render() {
    const currentLoggedinUsername = props.userName;
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    let sortedExpensesBySearch = this.state.statuses.filter(
      (p) => {
        if (this.state.searchValue) {
          return p.expenseName.toLowerCase().indexOf(this.state.searchValue) !== -1 || p.status.toLowerCase().indexOf(this.state.searchValue) !== -1;
        }
        else {
          return p;
        }
      }
    );

    var tableBorderStyle = {
      border: '1.5px solid black'
    };

    var tableHeaderStyle = {
      backgroundColor: 'lightblue'
    };

    var tableData;

    if (sortedExpensesBySearch.length == 0) {
      tableData = <div><h3> No Records Found </h3></div>
    }
    else {
      tableData = <div>
        <div>
          <table id="table-to-xls" style={{ border: '1.5px solid black', width: '95%' }} className="table table-bordered">
            <thead style={tableHeaderStyle}>
              <tr>
                <th style={tableBorderStyle} scope="col" >Expense ID</th>
                <th style={tableBorderStyle} scope="col" >Submission Date</th>
                <th style={tableBorderStyle} scope="col" >Total Amount</th>
                <th style={tableBorderStyle} scope="col">Expense Name</th>
                <th style={tableBorderStyle} scope="col">Status</th>
              </tr>
            </thead>
            <tbody id="checkStatusTableBody">
              {sortedExpensesBySearch.map((p) => (
                <tr scope="row">
                  <td style={tableBorderStyle}>{p.expenseID}</td>
                  <td style={tableBorderStyle}>{p.creationDate}</td>
                  <td style={tableBorderStyle}>${p.amount}</td>
                  <td style={tableBorderStyle}>{p.expenseName}</td>
                  <td style={tableBorderStyle}>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="col-md-12 text-center">
          <ul class="pagination pagination-lg pager" id="myPager"></ul>
        </div>
      </div>
    }

    return (
      <div style={{ marginLeft: '17%' }}>
        <h3 style={{ marginBottom: '2%' }} >Expense Status</h3>
        <div className="InputFromTo" style={{ marginBottom: '2%' }}>
          <DayPickerInput
            value={from}
            placeholder=" From"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: {
                after: new Date(),
                before: new Date("05/20/2018")
              },
              fromMonth: from,
              toMonth: to,
              modifiers,
              numberOfMonths: 2,
              onDayClick: () => this.to.getInput().focus(),
            }}
            onDayChange={this.handleFromChange}
          />{' '}
          —{' '}
          <span className="InputFromTo-to">
            <DayPickerInput
              ref={el => (this.to = el)}
              value={to}
              placeholder=" To"
              format="LL"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: {
                  after: new Date(),
                  before: new Date("05/20/2018")
                },
                modifiers,
                month: from,
                fromMonth: from,
                numberOfMonths: 2,
              }}
              onDayChange={this.handleToChange}
            />
          </span>
          <Helmet>
            <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style>
          </Helmet>
        </div>
        <div style={{ float: 'none', marginBottom: '2%' }}>
          <input id="searchField" style={{ width: '25%', display: 'inline-block' }} className="form-control" type="text" placeholder="Search Reason/Status" onChange={this.searchInputChange} aria-label="Search" />
          <button type="submit" style={{ marginLeft: '1%' }} className="btn btn-primary btn-sm" onClick={() => this.clearFilters()}>
            Clear Filters
            </button>
          <div style={{ float: 'right', marginRight: '5%' }}>
            <ReactHTMLTable_ToExcel
              className="download-table-xls-button"
              table="table-to-xls"
              filename={"Expense Sheet - " + currentLoggedinUsername}
              sheet="Expense Sheet"
              buttonText="Download"
              style />
          </div>
        </div>
        <div>
          {tableData}
        </div>
      </div>
    );
  }
}