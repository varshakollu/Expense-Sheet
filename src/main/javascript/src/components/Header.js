import ReactDOM from "react-dom";
import React, { Component } from "react";
  
export class Header extends React.Component {

    render() {
        const myImage = "./yash-logo.jpg";
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <img src={myImage} alt="Yash Technologies" />
                    </div>
                    <ul className="nav navbar-nav">
                        <li><p className="titleStyle">Expense Reimbursement System </p></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#"><span className="glyphicon glyphicon-log-out"></span>Logout</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}