import React from "react";
import { css } from "glamor";

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
        this.handleUploadFilesChange = this.handleUploadFilesChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.isExcel = this.isExcel.bind(this);
        this.updateListOfUploadedFiles = this.updateListOfUploadedFiles.bind(this);
        this.browseButtonClicked = this.browseButtonClicked.bind(this);
        this.isNotExecutableFile = this.isNotExecutableFile.bind(this);
    }
    handleNameChange(event) {
        if (event.target.value != "") {
            this.setState({ name: event.target.value, disableUpload: false });
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
        this.isNotExecutableFile(this.state.files);
        this.updateListOfUploadedFiles(this.state.files);
    }
    updateListOfUploadedFiles(updatedFiles) {
        debugger;
        var output = document.getElementById('fileList');

        output.innerHTML = '<ul>';
        for (var i = 0; i < updatedFiles.length; ++i) {
            output.innerHTML += '<li>' + updatedFiles[i].name + '</li>';
        }
        output.innerHTML += '</ul>';
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
    handleSubmit(event) {

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
                    var tempExpenseName = this.state.name;
                    var tempArray = this.state.files;
                    this.setState(initialState);
                    this.setState({
                        name: tempExpenseName,
                        disableUpload: false,
                        files: tempArray
                    });
                } else {
                    var tempExpenseName = this.state.name;
                    var tempArray = this.state.files;
                    this.setState(initialState);
                    this.setState({
                        name: tempExpenseName,
                        disableUpload: false,
                        files: tempArray
                    });
                }
            }
            // If multiple excel files are found, remove excel files and save bills in the state.
            else if (this.state.countOfExcelFiles > 1) {
                var confirmMessage = confirm("Please upload only one Expense sheet in .xls or .xlsx format.");
                if (confirmMessage) {
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
                    this.updateListOfUploadedFiles(tempArray);
                    this.setState({ files: tempArray });
                } else {
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
                    this.updateListOfUploadedFiles(tempArray);
                    this.setState({ files: tempArray });

                }
            }
        }

        // This will execute only one expense sheet is uploaded
        else if (this.state.countOfExcelFiles == 1 && this.state.countOfBills < 1) {
            // save the excel sheet in the state, request for bills
            var confirmMessage = confirm("Please upload all appropriate bills.");
            if (confirmMessage) {
                var tempExpenseName = this.state.name;
                var tempArray = this.state.files;
                this.setState(initialState);
                this.setState({
                    name: tempExpenseName,
                    disableUpload: false,
                    files: tempArray
                });
            } else {
                var tempExpenseName = this.state.name;
                var tempArray = this.state.files;
                this.setState(initialState);
                this.setState({
                    name: tempExpenseName,
                    disableUpload: false,
                    files: tempArray
                });
            }
        }
        else if (this.state.countOfExcelFiles == 1 && this.state.countOfBills >= 1) {
            alert("Success! The entered Data is valid, will be posted to Server later.");
            this.setState(initialState);
            while (this.state.files.length > 0) {
                this.state.files.pop();
            }
            document.getElementById("myForm").reset();
            document.getElementById("fileList").innerHTML = "";
        }
    }

    handleCancel(event) {
        this.setState(initialState);
        while (this.state.files.length > 0) {
            this.state.files.pop();
        }
        document.getElementById("myForm").reset();
        document.getElementById("fileList").innerHTML = "";
    }

    handleSubmitSuccess(data) {
        console.log(data);
    }

    handleSubmitFailure(error) {
        console.log(error);
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
                            <div id="fileList"></div>
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