import ReactDOM from "react-dom";
import React, { Component } from "react";
import image from "./images/expense-report.jpg";

export class Header extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <img src={image} alt="Yash Technologies" />
                    </div>
                    <ul className="nav navbar-nav">
                        <li><h5>Expense Reimbursement system </h5></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#"><span className="glyphicon glyphicon-log-out"></span>Logout</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
