import React from "react";
import {Link} from "react-router-dom";

export class SideBarNavigation_employee extends React.Component {

    constructor(props) {
        super(props);
        props = window.props;
    }

    render() {
        return (
            <div style={{
                float: "left",
                width: "15%",
                height: "100%",
                background: "#f0f0f0"
            }}>
                <ul style={{ listStyleType: "none", padding: "10px" }}>
                    <li style={{padding: "10px"}}><Link to={"/home"}>Home</Link></li>
                    <li style={{padding: "10px"}}><Link to={"/upload"}>Upload Bills</Link></li>
                    <li style={{padding: "10px"}}><Link to={"/status"}>Check status</Link></li>
                </ul>
            </div>


           
        );
    }
}
