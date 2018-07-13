import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Router, Route, browserHistory, IndexRoute } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";



import { Home } from "./components/Home";
import { Upload } from "./components/Upload";
import { Check_status } from "./components/Check_status";
import { Approve_Expenses } from "./components/Approve_Expenses";
import { Greeting } from "./components/Greeting";


class ExpenseSheet extends React.Component {
    constructor(props) {
        super(props);
        console.log(window)
        props = window.props;
    }
    render() {
        var history = createBrowserHistory();

        return (
            <Router history={history}>
                <div>
                    {/* <Route path={"/"} component={Home} >
                        <IndexRoute component={Home} />
                        <Route path={"upload"} component={Upload} />
                        <Route path={"status"} component={Check_status} />
                    </Route> */}
                    <Route path={"/"} component={Home} />
                    <Route path={"/home"} component={Greeting} />
                    <Route path={"/upload"} component={Upload} />
                    <Route path={"/status"} component={Check_status} />
                    <Route path={"/approve"} component={Approve_Expenses} />

                </div>
            </Router>
        )
    }
}

ReactDOM.render(<ExpenseSheet />, window.document.getElementById('container'));