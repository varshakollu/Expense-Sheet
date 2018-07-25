import React from "react";
import { css } from 'glamor';

export class Header extends React.Component {

    render() {

        const myImage = "./yash-logo.png";

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

        const iconStyles = css({
            color: 'white',
            marginRight: '5px'
        });

        const dropDownMenuStyle = css({
            fontSize: 'large',
            textAlign: 'center'
        });


        return (
            <nav className="navbar navbar-light">
                <div {...headerStyle} className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li><img {...imageStyle} src={myImage} alt="Yash Technologies" /></li>
                        <li><p {...titleStyle}>Expense Reimbursement System </p></li>
                    </ul>
                    <div class="btn-group nav navbar-nav navbar-right">
                        <button type="button" class="btn btn-danger btn-secondary btn-md dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="glyphicon glyphicon-user" {...iconStyles}></span>
                            {props.userName}
                        </button>
                        <div class="dropdown-menu" {...dropDownMenuStyle}>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#"> <span className="glyphicon glyphicon-log-out"></span> Sign out</a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}