import ReactDOM from "react-dom";
import React from "react";
import { Route, HashRouter, Redirect } from "react-router-dom";
import { Home } from "./components/Home";
import { Upload } from "./components/Upload";
import { Check_status } from "./components/Check_status";
import { Approve_Expenses } from "./components/Approve_Expenses";
import { Unauthorized_page } from "./components/Unauthorized_page";
import { Help } from "./components/Help";
import { Accountant_Approvals } from "./components/Accountant_Approvals";

class ExpenseSheet extends React.Component {
    constructor(props) {
        super(props);
        props = window.props;
    }

    render() {
        const isAdmin = (props.userRoles.toUpperCase() == ("ROLE_admin").toUpperCase());
        const isAccountant = (props.userRoles.toUpperCase() == ("ROLE_ACCOUNTANT").toUpperCase());
        return (
            <HashRouter>
                <div>
                    <Route path={"/"} component={Home} />
                    <Route path={"/upload"} component={Upload} />
                    <Route path={"/status"} component={Check_status} />
                    <Route path={"/approve"} render={() => (
                        isAdmin ? (
                            <Approve_Expenses />
                        ) : (
                                <Redirect to="/unauthorized" />
                            )
                    )} />
                    <Route path={"/accountantApprovals"} render={() => (
                        isAccountant ? (
                            <Accountant_Approvals />
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