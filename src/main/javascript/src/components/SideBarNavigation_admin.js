import React from "react";
import { Link } from "react-router-dom";
import { css, hover } from 'glamor';

export class SideBarNavigation_admin extends React.Component {

    constructor(props) {
        super(props);
        props = window.props;
    }

    render() {
        const navLinkStyle = css({
            color: 'white',
            fontFamily: 'source_sans_proregular',
            fontStyle: 'normal',
            fontSize: '125%',
            padding: "20px"
        });

        const onMouseOverNavLinkStyle = hover({
            color: 'red',
        });

        const iconStyles = css({
            marginRight: "5%"
        });

        return (
            <div style={{
                float: "left",
                width: "15%",
                height: "100%",
                backgroundColor: '#01498B'
            }}>

                <ul class="nav flex-column">
                    <li class="nav-item">
                        <Link {...navLinkStyle} {...onMouseOverNavLinkStyle} to={"/"}>
                            <span className="glyphicon glyphicon-home" {...iconStyles}></span>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" {...navLinkStyle} {...onMouseOverNavLinkStyle} to={"/upload"}>
                            <span className="glyphicon glyphicon-upload" {...iconStyles}></span>
                            <span>Upload Bills</span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" {...navLinkStyle} {...onMouseOverNavLinkStyle} to={"/status"}>
                            <span className="glyphicon glyphicon-list-alt" {...iconStyles}></span>
                            <span>Check status</span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" {...navLinkStyle} {...onMouseOverNavLinkStyle} to={"/approve"}>
                            <span className="glyphicon glyphicon-check" {...iconStyles}></span>
                            <span>My Approvals</span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" {...navLinkStyle} {...onMouseOverNavLinkStyle} to={"/help"}>
                            <span className="glyphicon glyphicon-question-sign" {...iconStyles}></span>
                            <span>Help</span>
                        </Link>
                    </li>
                </ul>

            </div>
        );
    }
}
