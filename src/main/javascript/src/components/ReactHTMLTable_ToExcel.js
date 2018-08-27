import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  table: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  sheet: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  img : PropTypes.string.isRequired,
  dates: PropTypes.string.isRequired,
};

const defaultProps = {
  id: 'button-download-as-xls',
  className: 'button-download',
  buttonText: 'Download',
};

class ReactHTMLTable_ToExcel extends Component {
  constructor(props) {
    super(props);
    this.handleDownload = this.handleDownload.bind(this);
  }

  static base64(s) {
    return window.btoa(unescape(encodeURIComponent(s)));
  }

  static format(s, c) {
    return s.replace(/{(\w+)}/g, (m, p) => c[p]);
  }

  handleDownload() {
    if (!document) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to access document object');
      }

      return null;
    }

    if (document.getElementById(this.props.table).nodeType !== 1 || document.getElementById(this.props.table).nodeName !== 'TABLE') {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Provided table property is not html table element');
      }

      return null;
    }

    const table = document.getElementById(this.props.table).outerHTML;
    const sheet = String(this.props.sheet);
    const filename = `${String(this.props.filename)}.xls`;
    const img = document.getElementById(this.props.img).outerHTML;
    const dates = String(this.props.dates);
    const uri = 'data:application/vnd.ms-excel;base64,';
    debugger;
    const template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' +
      'rosoft-com:office:excel" xmlns="https://www.w3.org/TR/html401"><head><meta cha' +
      'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' +
      'lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
      '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' +
      'xml><![endif]--></head><body><div>{img}<br><b>{dates}</b></div><div>{table}</div></body></html>';

    const context = {
      worksheet: sheet || 'Worksheet',
      img,
      dates,
      table,
    };

    // If IE11
    if (window.navigator.msSaveOrOpenBlob) {
      const fileData = [
        `${'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' + 'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' + 'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' + 'lWorksheet><x:Name>'}${sheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' + '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' + 'xml><![endif]--></head><body>'}<div>${img}<br><b>${dates}</b></div><div>${table}</div></body></html>`,
      ];
      const blobObject = new Blob(fileData);
      window.navigator.msSaveOrOpenBlob(blobObject, filename);
      return true;
    }

    const element = window.document.createElement('a');
    element.href =
      uri +
      ReactHTMLTable_ToExcel.base64(
        ReactHTMLTable_ToExcel.format(template, context),
      );
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    return true;
  }

  render() {
    const buttonStyle = {
      color: '#fff',
      backgroundColor: '#337ab7',
      borderColor: '#2e6da4',
      display: 'inline-block',
      padding: '6px 12px',
      fontSize: '13px',
      fontWeight: '400',
      lineHeight: '1.42857143',
      border: '1px solid transparent',
      borderRadius: '4px',
      marginBottom: '10px',
    }
    return (
      <button style={buttonStyle}
        id={this.props.id}
        className={this.props.className}
        type="button"
        onClick={this.handleDownload}
      >
        {this.props.buttonText}
      </button>
    );
  }
}

ReactHTMLTable_ToExcel.propTypes = propTypes;
ReactHTMLTable_ToExcel.defaultProps = defaultProps;

export default ReactHTMLTable_ToExcel;