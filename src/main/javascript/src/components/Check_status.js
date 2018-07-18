import React from "react";
import { css } from 'glamor';

export class Check_status extends React.Component {

    constructor(props){
        super(props);
        props = window.props;
        this.state = {
            statuses : [],
        };
    }

    componentWillMount(){
        const currentLoggedinUsername = props.userName;
        fetch("/checkstatus/"+currentLoggedinUsername,{
            credentials: "same-origin"
          })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    statuses : res
                });
            });
    }

    render() {

        const tableStyle = css({
            width: '50%',
            marginLeft: '25%'
        });

        if (this.state.statuses.length !== 0) {
        return (
            <div>
                <table {...tableStyle} className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Expense ID</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Reason for Expense</th>
                            <th scope="col">Status</th>
                        </tr>    
                    </thead>
                    <tbody>
                    {this.state.statuses.map((p) =>
                       <tr scope="row">
                            <td>{p.expenseID}</td>
                            <td>{p.amount}</td>
                            <td>{p.reason}</td>
                            <td>{p.approvalStatus}</td>
                       </tr>
                    )}      
                    </tbody>        
                </table>
            </div>);
        } else if(this.state.statuses.length == 0){
            return (
                <h3> Sorry, you have never uploaded bills using this system </h3>
        );
        }
    }
}