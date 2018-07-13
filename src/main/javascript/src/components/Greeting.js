import React from "react";

export class Greeting extends React.Component {
    render() {
        return (
            <div><h5>Hello {props.userName}, Welcome to the Yash Technologies Expense Reimbursement system</h5></div>
        );
    }
}