import ReactDOM from "react-dom";
import React, { Component } from "react";
import image from "./images/expense-report.jpg";

export class Test extends React.Component {


    constructor(props) {
        super(props);
        console.log(window)
        props = window.props;
    }
    render() {

        return (
            <p>Testing new page</p>
        );
    }
}
