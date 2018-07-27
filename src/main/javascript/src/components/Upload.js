import React from "react";
import { css } from 'glamor';

export class Upload extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            disableUpload: true,
        };
    }
    handleNameChange(event) {
        debugger;
        if (event.target.value != "") {
            this.setState({ name: event.target.value, disableUpload: false });
        }
    }
    render() {
        debugger;
        const divStyle = css({
            marginLeft: '20%',
            marginRight: '5%',
            textAlign: 'justify'
        });
        const instructionStyle = css({
            padding: '5%',
        });
        return (
            <div {...divStyle}>
                <div {...instructionStyle}>
                    <h4>Please download the sample Expense sheet, fill it and upload it with an expense name. </h4>
                    <a href="https://www.yash.com/onboard/Expense sheet template.xlsx">Click here to download Sample Expense Sheet</a>
                </div>
                <form>

                    <div class="form-group col-lg-6">
                        <label>Enter the name for your expense</label>
                        <input id="NameControl" className="form-control"
                            type="text"
                            onChange={this.handleNameChange.bind(this)}
                            required />
                    </div>

                    <div className="form-row">
                        <div class="form-group col-lg-8">
                            <label>Upload the Expense sheet</label>
                            <input type="file" className="form-control-file"
                                id="FileControl"
                                disabled={this.state.disableUpload}
                                multiple
                                required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div class="form-group col-lg-8">
                            <button className="btn btn-primary" type="submit">Submit my Expense report</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}