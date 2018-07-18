import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Router, Route, browserHistory, HashRouter, IndexRoute } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import { Home } from "./components/Home";
import { Upload } from "./components/Upload";
import { Check_status } from "./components/Check_status";
import { Approve_Expenses } from "./components/Approve_Expenses";
import { Help } from "./components/Help";

class ExpenseSheet extends React.Component {
    constructor(props) {
        super(props);
        console.log(window)
        props = window.props;
    }
    render() {
        
        var history = createBrowserHistory();

        return (
            <HashRouter>
                <div>
                    <Route path={"/"} component={Home} />
                    <Route path={"/home"} component={Home} />
                    <Route path={"/upload"} component={Upload} />
                    <Route path={"/status"} component={Check_status} />
                    <Route path={"/approve"} component={Approve_Expenses} />
                    <Route path={"/help"} component={Help} />
                </div>
            </HashRouter>
        )
    }
}

ReactDOM.render(<ExpenseSheet />, window.document.getElementById('container'));