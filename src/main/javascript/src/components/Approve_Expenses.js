import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import Helmet from 'react-helmet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from "react-day-picker/moment";
import 'whatwg-fetch';
import ReactHTMLTable_ToExcel from "./ReactHTMLTable_ToExcel";
import ReactModal from 'react-modal';

export class Approve_Expenses extends React.Component {

  constructor(props) {
    super(props);
    props = window.props;
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.filterDateRange = this.filterDateRange.bind(this);
    this.searchInputChange = this.searchInputChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state = {
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
    this.searchValue = event.target.value.toLowerCase();
    this.setState({ searchValue: this.searchValue });
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
    if (from == undefined) {
      from = new Date("05/20/2018");
    }

    if (to == undefined) {
      to = new Date();
    }

    const currentLoggedinUsername = props.userName;
    let query = "managername=" + currentLoggedinUsername + "&startDate=" + from + "&endDate=" + to;
    let url = "approvals?" + query

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          statuses: res
        });
      });
  }

  componentWillMount() {
    this.filterDateRange(undefined, undefined);
  }

  handleOpenModal(currentExpenseID, currentExpenseFirstName, currentExpenseLastName, currentExpenseCreationDate, currentExpenseName, currentExpenseAmount) {
    this.setState({
      currentExpenseID: currentExpenseID,
      currentExpenseFirstName: currentExpenseFirstName,
      currentExpenseLastName: currentExpenseLastName,
      currentExpenseCreationDate: currentExpenseCreationDate,
      currentExpenseName: currentExpenseName,
      currentExpenseAmount: currentExpenseAmount
    });

    debugger;
    fetch("/approvals/" + currentExpenseID)
      .then(res => res.json())
      .then(res => {
        this.setState({
          files: res
        });
      });
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleFileDisplay(fileID, fileType) {

    fetch("/approvals/" + this.state.currentExpenseID + "/file/" + fileID)
      .then(function (response) {
        return response.blob();
      })
      .then(function (data) {
        debugger;
        var url = URL.createObjectURL(new Blob([data], {
          // type: "application/pdf"
          type: fileType
        }));
        window.open(url, "_blank");
      });
  }


  render() {
    const currentLoggedinUsername = props.userName;
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const dateFormat = require('dateformat');
    let sortedExpensesBySearch = this.state.statuses.filter(
      (p) => {
        if (this.state.searchValue) {
          return p.firstName.toLowerCase().indexOf(this.state.searchValue) !== -1 || p.lastName.toLowerCase().indexOf(this.state.searchValue) !== -1 || p.expenseName.toLowerCase().indexOf(this.state.searchValue) !== -1 || p.status.toLowerCase().indexOf(this.state.searchValue) !== -1;
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

    let fromValue;
    if (this.state.from == undefined) {
      fromValue = new Date("05/20/2018");
    } else {
      fromValue = this.state.from;
    }

    let toValue;
    if (this.state.to == undefined) {
      toValue = new Date();
    } else {
      toValue = this.state.to;
    }

    var tableData;

    if (sortedExpensesBySearch.length == 0) {
      tableData = <div><h3> No Records Found </h3></div>
    }
    else {
      tableData = <div>
        <img src="http://egov.eletsonline.com/wp-content/uploads/2017/10/yash-technologies-pvt-ltd-m-g-road-indore-2de3l.jpg" alt="Yash Technologies" width="150" height="100" id="image-xls" style={{ display: 'none' }} />
        <table id="table-to-xls-approval" style={{ border: '1.5px solid black', width: '95%' }} className="table table-bordered">
          <thead style={tableHeaderStyle}>
            <tr>
              <th style={tableBorderStyle} scope="col" >Expense ID</th>
              <th style={tableBorderStyle} scope="col" >First Name</th>
              <th style={tableBorderStyle} scope="col" >Last Name</th>
              <th style={tableBorderStyle} scope="col" >Submission Date</th>
              <th style={tableBorderStyle} scope="col">Expense Name</th>
              <th style={tableBorderStyle} scope="col" >Total Amount</th>
              <th style={tableBorderStyle} scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpensesBySearch.map((p) => (
              <tr scope="row">
                <td style={tableBorderStyle}>
                  <button
                    className="btn btn-link"
                    onClick={() => { this.handleOpenModal(p.expenseID, p.firstName, p.lastName, p.creationDate, p.expenseName, p.amount) }}>
                    <strong>{p.expenseID}</strong></button>
                </td>
                <td style={tableBorderStyle}>{p.firstName}</td>
                <td style={tableBorderStyle}>{p.lastName}</td>
                <td style={tableBorderStyle}>{p.creationDate}</td>
                <td style={tableBorderStyle}>{p.expenseName}</td>
                <td style={tableBorderStyle}>${p.amount}</td>
                <td style={tableBorderStyle}>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    }

    return (
      <div style={{ marginLeft: '17%' }}>
        <h3 style={{ marginBottom: '2%' }} >Approval Status</h3>
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
          <input id="searchField" style={{ width: '27%', display: 'inline-block' }} className="form-control" type="text" placeholder="Search First/Last/Expense Name, Status" onChange={this.searchInputChange} aria-label="Search" />
          <button type="submit" style={{ marginLeft: '1%' }} className="btn btn-primary btn-sm" onClick={() => this.clearFilters()}>
            Clear Filters
            </button>
          <div style={{ float: 'right', marginRight: '5%' }}>
            <ReactHTMLTable_ToExcel
              className="download-table-xls-button"
              table="table-to-xls-approval"
              filename={"Expense Approvals - " + currentLoggedinUsername}
              sheet="Expense Approval Sheet"
              buttonText="Download"
              img="image-xls"
              dates={"Expense Report (" + dateFormat(fromValue, "mmm d, yyyy") + "-" + dateFormat(toValue, "mmm d, yyyy") + ")"} />
          </div>
        </div>
        <div>
          <ReactModal
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
          >
            <div>
              <h4><strong>Expense information for ID : </strong>{this.state.currentExpenseID}</h4>
              <br />
              <p><strong>First name : </strong> {this.state.currentExpenseFirstName}</p>
              <br />
              <p><strong>Last name : </strong>{this.state.currentExpenseLastName}</p>
              <br />
              <p><strong>Submission date : </strong>{this.state.currentExpenseCreationDate}</p>
              <br />
              <p><strong>Expense name: </strong>{this.state.currentExpenseName}</p>
              <br />
              <p><strong>Amount : </strong>{this.state.currentExpenseAmount}</p>
              <br />
              <p><strong>Attachments : </strong></p>
              <form>
                {this.state.files.map((p) =>
                  <ul className="form-group col-lg-8">
                    <li>
                      <button className="btn btn-link" type="button"
                        onClick={() => { this.handleFileDisplay(p.fileID, p.fileType) }}>
                        {p.fileName}
                      </button>
                    </li>
                  </ul>
                )}
                <br />
                <div className="form-group col-lg-8">
                  <label>Comment:</label>
                  <textarea className="form-control" rows="5" id="comment"></textarea>
                  <br />
                  <div class="alert alert-info" role="alert">
                    <strong>Heads up!</strong> Review all the expense information and attachments before approving this expense.
                    You cannot revert once it is approved.
                  </div>
                  <br />
                  <button className="btn btn-primary" type="button" onClick={this.handleCloseModal}>Approve</button>
                  <button className="btn btn-link" type="button" onClick={this.handleCloseModal}>Close</button>

                </div>
              </form>
            </div>
          </ReactModal>
        </div>

        <div>
          {tableData}
        </div>
      </div >
    );
  }
}