import React from "react";
import { SideBarNavigation_admin } from "./SideBarNavigation_admin";
import { SideBarNavigation_employee } from "./SideBarNavigation_employee";
import { SideBarNavigation_accountant } from "./SideBarNavigation_accountant";


export class Home extends React.Component {
    
    constructor(props) {
        super(props);
        props = window.props;
    }

    render() {
        const currentLoggedinUserRoles = props.userRoles;
        if (currentLoggedinUserRoles.toUpperCase() == ("ROLE_admin").toUpperCase()) {
            return (
                <div>
                    <SideBarNavigation_admin />
                </div>);
        } else if (currentLoggedinUserRoles.toUpperCase() == ("ROLE_user").toUpperCase()) {
            return (
                <div>
                    <SideBarNavigation_employee />
                </div>);
        }else if (currentLoggedinUserRoles.toUpperCase() == ("ROLE_ACCOUNTANT").toUpperCase()) {
            return (
                <div>
                    <SideBarNavigation_accountant />
                </div>);
        }
    }
}