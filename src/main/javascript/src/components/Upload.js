import React from "react";
import { css } from "glamor";
import { ToastContainer, ToastStore } from 'react-toasts';

const initialState = {
    name: "",
    disableUpload: true,
    files: [],
    excelFileFound: false,
    countOfExcelFiles: 0,
    billsFound: false,
    countOfBills: 0
};


export class Upload extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            disableUpload: true,
            files: [],
            excelFileFound: false,
            countOfExcelFiles: 0,
            billsFound: false,
            countOfBills: 0
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleUploadFilesChange = this.handleUploadFilesChange.bind(this);
        this.validateNameAndAmount = this.validateNameAndAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.isExcel = this.isExcel.bind(this);
        this.browseButtonClicked = this.browseButtonClicked.bind(this);
        this.isNotExecutableFile = this.isNotExecutableFile.bind(this);
        this.addRemoveButtonEvents = this.addRemoveButtonEvents.bind(this);
        this.removeExcelFilesAndSaveBills = this.removeExcelFilesAndSaveBills.bind(this);
        this.saveExcelFileAndRequestForBills = this.saveExcelFileAndRequestForBills.bind(this);
        this.saveAllBillsAndRequestForExcelFile = this.saveAllBillsAndRequestForExcelFile.bind(this);
    }
    handleNameChange(event) {
        if (event.target.value != "") {
            this.setState({ name: event.target.value, disableUpload: false });
        }
        else {
            this.setState({ disableUpload: true });
        }
    }

    handleAmountChange(event) {
        if (event.target.value != "") {
            this.setState({ amount: event.target.value });
        }
    }

    browseButtonClicked(event) {
        document.getElementById('hiddenFileControl').click();
    }
    handleUploadFilesChange(event) {
        var uploadedFilesList = event.target.files;
        for (var i = 0; i < uploadedFilesList.length; i++) {
            //not executable and size<2MB
            if (this.isNotExecutableFile(uploadedFilesList[i]) && this.validateSize(uploadedFilesList[i])) {
                this.state.files.push(uploadedFilesList[i]);
            }
        }
        this.updateTableHTML(this.state.files);
    }
    isNotExecutableFile(file) {
        if (file.type != "application/x-msdownload") {
            return true;
        } else {
            alert("Executable files are not allowed");
            return false;
        }
    }

    validateSize(file) {
        var fileSize = file.size / 1024 / 1024;
        if (fileSize < 2) {
            return true;
        } else {
            alert(file.name + " exceeds 2 MB size, please upload a file that is less than 2 MB");
            return false;
        }
    }
    updateTableHTML(updatedFiles) {
        var table = document.getElementById("uploadTable");
        table.innerHTML = "";
        for (var i = 0; i < updatedFiles.length; ++i) {
            var currentFile = updatedFiles[i];

            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            var buttonHTML = document.createElement("BUTTON");
            var button_ID = currentFile.name + "_" + i;;
            buttonHTML.setAttribute("id", button_ID);
            buttonHTML.setAttribute("class", "btn btn-link");
            buttonHTML.setAttribute("type", "button");
            buttonHTML.appendChild(document.createTextNode("remove"));
            cell1.innerText = currentFile.name
            cell2.appendChild(buttonHTML)
        }
        this.addRemoveButtonEvents(this.state.files);
    }
    addRemoveButtonEvents(updatedFiles) {
        var that = this;
        for (var id = 0; id < updatedFiles.length; id++) {
            var button_ID = updatedFiles[id].name + "_" + id;
            var button = document.getElementById(button_ID);
            button.addEventListener("click", function (event) {
                var button_ID = event.currentTarget.id;
                var n = button_ID.lastIndexOf("_");
                var index = button_ID.substring(n + 1);

                that.state.files.splice(index, 1);
                that.updateTableHTML(that.state.files);
            });
        }
    }
    isExcel(file) {
        if (file.type == "application/vnd.ms-excel" ||
            file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            return true;
        }
        else {
            return false;
        }
    }

    validateNameAndAmount(name, amount) {
        if (name != undefined && amount != undefined) {
            return true;
        }
        else {
            alert("Complete all fields in the form");
        }
    }

    handleSubmit(event) {
        if (this.validateNameAndAmount(this.state.name, this.state.amount)) {
            var files = this.state.files;
            for (var i = 0; i < files.length; i++) {
                if (this.isExcel(files[i])) {
                    this.state.countOfExcelFiles++;
                    this.state.excelFileFound = true;
                }
                else if (!(this.isExcel(files[i]))) {
                    this.state.countOfBills++;
                    this.state.billsFound = true;
                }
            }
            if (this.state.countOfExcelFiles != 1) {
                if (this.state.countOfExcelFiles < 1) {
                    //save the bills in the state, request for expense sheet
                    var confirmMessage = confirm("Please upload an Expense sheet in .xls or .xlsx or .csv format.");
                    if (confirmMessage) {
                        this.saveAllBillsAndRequestForExcelFile(confirmMessage);
                    } else {
                        this.saveAllBillsAndRequestForExcelFile(confirmMessage);
                    }
                }
                // If multiple excel files are found, remove excel files and save bills in the state.
                else if (this.state.countOfExcelFiles > 1) {
                    var confirmMessage = confirm("Please upload only one Expense sheet in .xls or .xlsx format.");
                    if (confirmMessage) {
                        this.removeExcelFilesAndSaveBills(confirmMessage);
                    } else {
                        this.removeExcelFilesAndSaveBills(confirmMessage);
                    }
                }
            }

            // This will execute only one expense sheet is uploaded
            else if (this.state.countOfExcelFiles == 1 && this.state.countOfBills < 1) {
                // save the excel sheet in the state, request for bills
                var confirmMessage = confirm("Please upload all appropriate bills.");
                if (confirmMessage) {
                    this.saveExcelFileAndRequestForBills(confirmMessage);
                } else {
                    this.saveExcelFileAndRequestForBills(confirmMessage);
                }
            }
            else if (this.state.countOfExcelFiles == 1 && this.state.countOfBills >= 1) {


                var formData = new FormData();
                formData.append("username", props.userName);
                formData.append("creationDate", new Date());
                formData.append("expenseName", this.state.name);
                formData.append("amount", this.state.amount);
                formData.append("status", "Submitted");

                for (var i = 0; i < files.length; i++) {
                    formData.append("bills", files[i]);
                }
                var that = this;
                debugger;
                $.ajax({
                    url: "/expenses",
                    type: "POST",
                    encType: "multipart/form-data",
                    contentType: false,
                    processData: false,
                    data: formData,
                    success: this.handleSubmitSuccess(that),
                    error: this.handleSubmitFailure

                });
            }
        }

    }

    saveAllBillsAndRequestForExcelFile(confirmMessage) {
        var tempExpenseName = this.state.name;
        var tempArray = this.state.files;
        this.setState(initialState);
        this.setState({
            name: tempExpenseName,
            disableUpload: false,
            files: tempArray
        });
    }
    removeExcelFilesAndSaveBills(confirmMessage) {
        var tempExpenseName = this.state.name;
        this.setState(initialState);
        this.setState({
            name: tempExpenseName,
            disableUpload: false
        });
        //Remove all excel files and save bills temporarily.
        var tempArray = this.state.files;
        var that = this;
        var excelFoundInTheArray = true;

        while (excelFoundInTheArray) {
            var currentIndex = 0;
            excelFoundInTheArray = tempArray.some(function (item, index, object) {
                currentIndex = index;
                return that.isExcel(item);
            });
            if (excelFoundInTheArray) {
                tempArray.splice(currentIndex, 1);
            } else {
                break;
            }
        }
        this.updateTableHTML(tempArray);
        this.setState({ files: tempArray });
    }
    saveExcelFileAndRequestForBills(confirmMessage) {
        var tempExpenseName = this.state.name;
        var tempArray = this.state.files;
        this.setState(initialState);
        this.setState({
            name: tempExpenseName,
            disableUpload: false,
            files: tempArray
        });
    }

    handleCancel(event) {
        this.setState(initialState);
        while (this.state.files.length > 0) {
            this.state.files.pop();
        }
        document.getElementById("myForm").reset();
        document.getElementById("uploadTable").innerHTML = "";
    }

    handleSubmitSuccess(that) {
        debugger;
        ToastStore.success("Your expense is succesfully uploaded", 5000);
        that.handleCancel();
    }

    handleSubmitFailure(error) {
        ToastStore.success("There is an error in form submission", 5000);
    }

    render() {

        const hiddenFileControlStyle = css({
            visible: "none"
        });
        const divStyle = css({
            marginLeft: '20%',
            marginRight: '5%',
            textAlign: 'justify'
        });
        const instructionStyle = css({
            padding: '2%',
        });
        return (
            <div {...divStyle}>
                <div {...instructionStyle}>
                    <h4>Please download the sample Expense sheet, fill it and upload it with an expense name. </h4>
                    <a href="https://www.yash.com/onboard/Expense sheet template.xlsx">Click here to download Sample Expense Sheet</a>
                </div>

                <ToastContainer store={ToastStore} position={ToastContainer.POSITION.TOP_CENTER} />
                <form id="myForm">
                    <div className="form-group col-lg-6">
                        <label>Enter the name for your expense</label>
                        <input id="NameControl"
                            className="form-control"
                            type="text"
                            maxLength="20"
                            onChange={this.handleNameChange}
                            required />
                    </div>
                    <div className="form-group col-lg-6">
                        <label>Total amount spent</label>
                        <input id="AmountControl"
                            className="form-control"
                            type="number"
                            onChange={this.handleAmountChange}
                            required />
                    </div>

                    <div className="form-row">
                        <div className="form-group col-lg-8">
                            <label>Upload the Expense sheet along with the bills</label>
                            <input type="file"
                                {...hiddenFileControlStyle}
                                className="invisible"
                                id="hiddenFileControl"
                                disabled={this.state.disableUpload}
                                onChange={this.handleUploadFilesChange}
                                multiple
                                required />

                            <input id="FileControl"
                                className="form-control-file"
                                type="button"
                                value="Browse files"
                                disabled={this.state.disableUpload}
                                onClick={this.browseButtonClicked}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-lg-8">

                            <div>
                                <table id="uploadTable" border='0' style={{ width: '60%' }}>

                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-lg-8">
                            <button className="btn btn-primary" type="button" onClick={this.handleSubmit}>Submit my Expense report</button>
                            <button className="btn btn-link" type="reset" onClick={this.handleCancel}> Cancel </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}