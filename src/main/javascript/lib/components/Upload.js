"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Upload = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _glamor = require("glamor");

var _reactToasts = require("react-toasts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initialState = {
    name: "",
    disableUpload: true,
    files: [],
    excelFileFound: false,
    countOfExcelFiles: 0,
    billsFound: false,
    countOfBills: 0
};

var Upload = exports.Upload = function (_React$Component) {
    _inherits(Upload, _React$Component);

    function Upload() {
        _classCallCheck(this, Upload);

        var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this));

        _this.state = {
            name: "",
            disableUpload: true,
            files: [],
            excelFileFound: false,
            countOfExcelFiles: 0,
            billsFound: false,
            countOfBills: 0
        };

        _this.handleNameChange = _this.handleNameChange.bind(_this);
        _this.handleAmountChange = _this.handleAmountChange.bind(_this);
        _this.handleUploadFilesChange = _this.handleUploadFilesChange.bind(_this);
        _this.validateNameAndAmount = _this.validateNameAndAmount.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleCancel = _this.handleCancel.bind(_this);
        _this.isExcel = _this.isExcel.bind(_this);
        _this.browseButtonClicked = _this.browseButtonClicked.bind(_this);
        _this.isNotExecutableFile = _this.isNotExecutableFile.bind(_this);
        _this.addRemoveButtonEvents = _this.addRemoveButtonEvents.bind(_this);
        _this.removeExcelFilesAndSaveBills = _this.removeExcelFilesAndSaveBills.bind(_this);
        _this.saveExcelFileAndRequestForBills = _this.saveExcelFileAndRequestForBills.bind(_this);
        _this.saveAllBillsAndRequestForExcelFile = _this.saveAllBillsAndRequestForExcelFile.bind(_this);
        return _this;
    }

    _createClass(Upload, [{
        key: "handleNameChange",
        value: function handleNameChange(event) {
            if (event.target.value != "") {
                this.setState({ name: event.target.value, disableUpload: false });
            } else {
                this.setState({ disableUpload: true });
            }
        }
    }, {
        key: "handleAmountChange",
        value: function handleAmountChange(event) {
            if (event.target.value != "") {
                this.setState({ amount: event.target.value });
            }
        }
    }, {
        key: "browseButtonClicked",
        value: function browseButtonClicked(event) {
            document.getElementById('hiddenFileControl').click();
        }
    }, {
        key: "handleUploadFilesChange",
        value: function handleUploadFilesChange(event) {
            var uploadedFilesList = event.target.files;
            for (var i = 0; i < uploadedFilesList.length; i++) {
                //not executable and size<2MB
                if (this.isNotExecutableFile(uploadedFilesList[i]) && this.validateSize(uploadedFilesList[i])) {
                    this.state.files.push(uploadedFilesList[i]);
                }
            }
            this.updateTableHTML(this.state.files);
        }
    }, {
        key: "isNotExecutableFile",
        value: function isNotExecutableFile(file) {
            if (file.type != "application/x-msdownload") {
                return true;
            } else {
                alert("Executable files are not allowed");
                return false;
            }
        }
    }, {
        key: "validateSize",
        value: function validateSize(file) {
            var fileSize = file.size / 1024 / 1024;
            if (fileSize < 2) {
                return true;
            } else {
                alert(file.name + " exceeds 2 MB size, please upload a file that is less than 2 MB");
                return false;
            }
        }
    }, {
        key: "updateTableHTML",
        value: function updateTableHTML(updatedFiles) {
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
                cell1.innerText = currentFile.name;
                cell2.appendChild(buttonHTML);
            }
            this.addRemoveButtonEvents(this.state.files);
        }
    }, {
        key: "addRemoveButtonEvents",
        value: function addRemoveButtonEvents(updatedFiles) {
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
    }, {
        key: "isExcel",
        value: function isExcel(file) {
            if (file.type == "application/vnd.ms-excel" || file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "validateNameAndAmount",
        value: function validateNameAndAmount(name, amount) {
            if (name != undefined && amount != undefined) {
                return true;
            } else {
                alert("Complete all fields in the form");
            }
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            if (this.validateNameAndAmount(this.state.name, this.state.amount)) {
                var files = this.state.files;
                for (var i = 0; i < files.length; i++) {
                    if (this.isExcel(files[i])) {
                        this.state.countOfExcelFiles++;
                        this.state.excelFileFound = true;
                    } else if (!this.isExcel(files[i])) {
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
                            var _confirmMessage = confirm("Please upload only one Expense sheet in .xls or .xlsx format.");
                            if (_confirmMessage) {
                                this.removeExcelFilesAndSaveBills(_confirmMessage);
                            } else {
                                this.removeExcelFilesAndSaveBills(_confirmMessage);
                            }
                        }
                }

                // This will execute only one expense sheet is uploaded
                else if (this.state.countOfExcelFiles == 1 && this.state.countOfBills < 1) {
                        // save the excel sheet in the state, request for bills
                        var _confirmMessage2 = confirm("Please upload all appropriate bills.");
                        if (_confirmMessage2) {
                            this.saveExcelFileAndRequestForBills(_confirmMessage2);
                        } else {
                            this.saveExcelFileAndRequestForBills(_confirmMessage2);
                        }
                    } else if (this.state.countOfExcelFiles == 1 && this.state.countOfBills >= 1) {

                        var formData = new FormData();
                        formData.append("username", props.userName);
                        formData.append("creationDate", new Date());
                        formData.append("expenseName", this.state.name);
                        formData.append("amount", this.state.amount);
                        formData.append("status", "Submitted");

                        for (var _i = 0; _i < files.length; _i++) {
                            formData.append("bills", files[_i]);
                        }
                        var that = this;

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
    }, {
        key: "saveAllBillsAndRequestForExcelFile",
        value: function saveAllBillsAndRequestForExcelFile(confirmMessage) {
            var tempExpenseName = this.state.name;
            var tempArray = this.state.files;
            this.setState(initialState);
            this.setState({
                name: tempExpenseName,
                disableUpload: false,
                files: tempArray
            });
        }
    }, {
        key: "removeExcelFilesAndSaveBills",
        value: function removeExcelFilesAndSaveBills(confirmMessage) {
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
    }, {
        key: "saveExcelFileAndRequestForBills",
        value: function saveExcelFileAndRequestForBills(confirmMessage) {
            var tempExpenseName = this.state.name;
            var tempArray = this.state.files;
            this.setState(initialState);
            this.setState({
                name: tempExpenseName,
                disableUpload: false,
                files: tempArray
            });
        }
    }, {
        key: "handleCancel",
        value: function handleCancel(event) {
            this.setState(initialState);
            while (this.state.files.length > 0) {
                this.state.files.pop();
            }
            document.getElementById("myForm").reset();
            document.getElementById("uploadTable").innerHTML = "";
        }
    }, {
        key: "handleSubmitSuccess",
        value: function handleSubmitSuccess(that) {
            _reactToasts.ToastStore.success("Your expense is succesfully uploaded", 5000);
            that.handleCancel();
        }
    }, {
        key: "handleSubmitFailure",
        value: function handleSubmitFailure(error) {
            _reactToasts.ToastStore.success("There is an error in form submission", 5000);
        }
    }, {
        key: "render",
        value: function render() {

            var hiddenFileControlStyle = (0, _glamor.css)({
                visible: "none"
            });
            var divStyle = (0, _glamor.css)({
                marginLeft: '20%',
                marginRight: '5%',
                textAlign: 'justify'
            });
            var instructionStyle = (0, _glamor.css)({
                padding: '2%'
            });
            return _react2.default.createElement(
                "div",
                divStyle,
                _react2.default.createElement(
                    "div",
                    instructionStyle,
                    _react2.default.createElement(
                        "h4",
                        null,
                        "Please download the sample Expense sheet, fill it and upload it with an expense name. "
                    ),
                    _react2.default.createElement(
                        "a",
                        { href: "https://www.yash.com/onboard/Expense sheet template.xlsx" },
                        "Click here to download Sample Expense Sheet"
                    )
                ),
                _react2.default.createElement(_reactToasts.ToastContainer, { store: _reactToasts.ToastStore, position: _reactToasts.ToastContainer.POSITION.TOP_CENTER }),
                _react2.default.createElement(
                    "form",
                    { id: "myForm" },
                    _react2.default.createElement(
                        "div",
                        { className: "form-group col-lg-6" },
                        _react2.default.createElement(
                            "label",
                            null,
                            "Enter the name for your expense"
                        ),
                        _react2.default.createElement("input", { id: "NameControl",
                            className: "form-control",
                            type: "text",
                            maxLength: "20",
                            onChange: this.handleNameChange,
                            required: true })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "form-group col-lg-6" },
                        _react2.default.createElement(
                            "label",
                            null,
                            "Total amount spent"
                        ),
                        _react2.default.createElement("input", { id: "AmountControl",
                            className: "form-control",
                            type: "number",
                            onChange: this.handleAmountChange,
                            required: true })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "form-row" },
                        _react2.default.createElement(
                            "div",
                            { className: "form-group col-lg-8" },
                            _react2.default.createElement(
                                "label",
                                null,
                                "Upload the Expense sheet along with the bills"
                            ),
                            _react2.default.createElement("input", _extends({ type: "file"
                            }, hiddenFileControlStyle, {
                                className: "invisible",
                                id: "hiddenFileControl",
                                disabled: this.state.disableUpload,
                                onChange: this.handleUploadFilesChange,
                                multiple: true,
                                required: true })),
                            _react2.default.createElement("input", { id: "FileControl",
                                className: "form-control-file",
                                type: "button",
                                value: "Browse files",
                                disabled: this.state.disableUpload,
                                onClick: this.browseButtonClicked
                            })
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "form-row" },
                        _react2.default.createElement(
                            "div",
                            { className: "form-group col-lg-8" },
                            _react2.default.createElement(
                                "div",
                                null,
                                _react2.default.createElement("table", { id: "uploadTable", border: "0", style: { width: '60%' } })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "form-row" },
                        _react2.default.createElement(
                            "div",
                            { className: "form-group col-lg-8" },
                            _react2.default.createElement(
                                "button",
                                { className: "btn btn-primary", type: "button", onClick: this.handleSubmit },
                                "Submit my Expense report"
                            ),
                            _react2.default.createElement(
                                "button",
                                { className: "btn btn-link", type: "reset", onClick: this.handleCancel },
                                " Cancel "
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Upload;
}(_react2.default.Component);