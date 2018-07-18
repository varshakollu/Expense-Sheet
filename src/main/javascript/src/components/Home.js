import React from "react";
import { Header } from "./Header";
import { SideBarNavigation_admin } from "./SideBarNavigation_admin";
import { SideBarNavigation_employee } from "./SideBarNavigation_employee";

export class Home extends React.Component {
    constructor(props) {
        super(props);
        props = window.props;
    }

    render() {
        const currentLoggedinUsername = props.userName;
        const currentLoggedinUserRoles = props.userRoles;
        
        if (currentLoggedinUserRoles == "ROLE_admin") {
            return (
                <div style={{ flex: 1, padding: "10px" }}>
                    <Header />
                    <SideBarNavigation_admin />
                </div>);
        } else if(currentLoggedinUserRoles == "ROLE_employee"){
            return (
                <div style={{ flex: 1, padding: "10px" }}>
                    <Header />
                    <SideBarNavigation_employee />
                </div>);
        }
        
        // if (currentLoggedinUsername == "raghava") {
        //     return (
        //         <div style={{ flex: 1, padding: "10px" }}>
        //             <Header />
        //             <SideBarNavigation_admin />
        //         </div>);
        // } else if(currentLoggedinUsername == "usertest"){
        //     return (
        //         <div style={{ flex: 1, padding: "10px" }}>
        //             <Header />
        //             <SideBarNavigation_employee />
        //         </div>);
        // }
    }
}