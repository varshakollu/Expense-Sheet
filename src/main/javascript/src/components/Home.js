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

        if (currentLoggedinUsername == "raghava") {
            return (
                <div style={{ flex: 1, padding: "10px" }}>
                    <Header />
                    <SideBarNavigation_admin />
                </div>);
        } else if(currentLoggedinUsername == "usertest"){
            return (
                <div style={{ flex: 1, padding: "10px" }}>
                    <Header />
                    <SideBarNavigation_employee />
                </div>);
        }
    }
}