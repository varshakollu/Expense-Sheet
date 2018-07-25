import React from "react";
import { css } from 'glamor';

export class Help extends React.Component {
    render() {

        const divStyle = css({
            marginLeft: '20%',
            marginRight: '5%',
            textAlign: 'justify'
        });

        const impHelpStyle = css({
            color: 'red'
        });

        return (
            <div {...divStyle}>
                <h3>GUIDELINES FOR APPROVED EXPENSES</h3>
                <ol>
                    <li><p>Travel expense deductions are limited to those incurred which, considering all circumstances, are not lavish or extravagant.</p></li>
                    <li><p>A daily record of all expenditures must be kept while traveling.</p></li>
                    <li><p>A record must be kept of any expenditures incurred for business meals.  A business meal takes place when food and/or beverages are provided to persons having a business relationship to the company at a place conducive to a business discussion, such as a luncheon club or quiet restaurant.  It is not necessary that a business discussion actually take place.  In such cases you should record the expenditure in the business meal section of the expense report.</p></li>
                </ol>

                <h3>INSTRUCTIONS FOR PREPARING EXPENSE REPORT</h3>
                <ol>
                    <li><p {...impHelpStyle}>Receipts for hotel and transportation expenses, regardless of amount, must be attached to the report.  All other expenditures, of $10 or more, must also be attached.</p></li>
                    <li><p>The "Trans. Paid by Self" column should be used for items such as airline tickets, so long as they are purchased by the employee.</p></li>
                    <li><p>The meal column should include only expenditures for meals consumed by you.  Expenses for meals consumed by others should be recorded either in the miscellaneous or business meal section of the expense report, as the situation warrants.</p></li>
                    <li><p>Incidental expenses should include an itemized listing of items such as tips (other than meal tips), laundry, telephone and/or telegraph charges, postage, and other proper, business-related expenditures.</p></li>
                    <li><p>Each column should be totaled and carried over to the "EXPENSE SUMMARY" section.</p></li>
                </ol>
            </div>
        );
    }
}