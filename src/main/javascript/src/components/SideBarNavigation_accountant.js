import React from "react";
import { Link } from "react-router-dom";
import { css, hover } from 'glamor';

export class SideBarNavigation_accountant extends React.Component {

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

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link {...navLinkStyle} {...onMouseOverNavLinkStyle} to={"/"}>
                            <span className="glyphicon glyphicon-home" {...iconStyles}></span>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" {...navLinkStyle} {...onMouseOverNavLinkStyle} to={"/accountantApprovals"}>
                            <span className="glyphicon glyphicon-check" {...iconStyles}></span>
                            <span>Approvals</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}
