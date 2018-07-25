import ReactDOM from "react-dom";
import React from "react";
import { Route, HashRouter, Redirect } from "react-router-dom";

import { Home } from "./components/Home";
import { Upload } from "./components/Upload";
import { Check_status } from "./components/Check_status";
import { Approve_Expenses } from "./components/Approve_Expenses";
import { Unauthorized_page } from "./components/Unauthorized_page";
import { Help } from "./components/Help";

class ExpenseSheet extends React.Component {
    constructor(props) {
        super(props);
        console.log(window)
        props = window.props;
    }

    render() {
        const isAdmin = (props.userRoles == "ROLE_admin");

        return (
            <HashRouter>
                <div>
                    <Route path={"/"} component={Home} />
                    <Route path={"/home"} component={Home} />
                    <Route path={"/upload"} component={Upload} />
                    <Route path={"/status"} component={Check_status} />
                    <Route path={"/approve"} render={() => (
                        isAdmin ? (
                            <Approve_Expenses />
                        ) : (
                                <Redirect to="/unauthorized" />
                            )
                    )} />
                    <Route path={"/unauthorized"} component={Unauthorized_page} />
                    <Route path={"/help"} component={Help} />
                </div>
            </HashRouter>
        )
    }
}

ReactDOM.render(<ExpenseSheet />, window.document.getElementById('container'));