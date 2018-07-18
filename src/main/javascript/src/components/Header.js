import ReactDOM from "react-dom";
import React, { Component } from "react";
import { css } from 'glamor';

export class Header extends React.Component {

    render() {

        const myImage = "./yash-logo.jpg";

        const userInfoStyle = css({
            color: 'white',
            fontFamily: 'source_sans_proregular',
            fontStyle: 'normal',
            fontSize: '125%',
            marginTop: '15%',
        });

        const headerStyle = css({
            backgroundColor: '#01498B',
            marginBottom: '0',
            border: 'none',
            minHeight: '65px',
            borderRadius: '0',
            borderBottom: '6px solid #48BED7'
        });

        const titleStyle = css({
            fontFamily: 'source_sans_proregular',
            fontStyle: 'normal',
            fontSize: '25px',
            fontWeight: '300',
            marginTop: '10px',
            marginLeft: '50px',
            color: 'white'
        });

        const imageStyle = css({
            marginTop: '10px'
        });

        return (
            <nav className="navbar navbar-default">
                <div {...headerStyle} className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li><img {...imageStyle} src={myImage} alt="Yash Technologies" /></li>
                        <li><p {...titleStyle}>Expense Reimbursement System </p></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><p {...userInfoStyle}>Hello {props.userName} </p></li>
                        <li><a href="/logout" ><span className="glyphicon glyphicon-log-out"></span>Logout</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}