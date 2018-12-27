import React from "react";
import AddFile from "../../presentational/AddFile/AddFile";
import FileData from "../../presentational/AddFile/FileData";
import XLSX from "xlsx";

class AddFileContainer extends React.Component {
  state = {
    className: "",
    rawFileArray: [],
    formattedFileData: []
  };

  _onDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Drag Enter");
    this.setState({
      className: "drop_enter"
    });
  };
  _onDragLeave = () => {
    console.log("Drag Leave");
    this.setState({
      className: ""
    });
  };
  _onDragOver = e => {
    e.preventDefault();
    console.log("Drag Over");
  };
  _onDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files.length > 0) {
      const reader = new FileReader();
      //file droppeed into container
      const file = e.dataTransfer.files[0];
      this.setState(prevState => {
        return {
          ...prevState,
          className: "dropped"
        };
      });
      reader.onload = event => {
        //console.log("e.evententTarget.result", event.target.result);
        /* Parse data */
        const buffer = event.target.result;
        const workbook = XLSX.read(buffer, { type: "array" });
        /* Get first worksheet */
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];
        /* Convert array of arrays  to JSON*/
        const data = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          //raw: false keeps dates and phone numbers as strings
          raw: false
        });

        /* remove empty rows of data */
        const filteredData = data.filter(item => {
          return item.length > 0;
        });
        //format data
        const formattedFileData = filteredData.reduce(
          (formattedData, item, i) => {
            const business = {
              category: item[0],
              businessName: item[1],
              locationNew: `${item[2]} ${item[6]}`,
              locationOld: `${item[3]} ${item[7]}`,
              tel: item[4],
              opening: item[5],
              type: item[8]
            };
            console.log("formattedData", formattedData);
            console.log("business", business);
            return [...formattedData, business];
          },
          []
        );
        this.setState(prevState => {
          return {
            className: "drop_processed",
            rawFileArray: filteredData,
            formattedFileData
          };
        });
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.log("Must drop in a file");
    }
  };

  uploadData = e => {
    e.preventDefault();
  };
  render() {
    console.log("State", this.state);
    return (
      <React.Fragment>
        <AddFile
          id="dragbox"
          onDragOver={this._onDragOver}
          onDrop={this._onDrop}
          onDragEnter={this._onDragEnter}
          onDragLeave={this._onDragLeave}
          className={this.state.className}
        />
        {this.state.rawFileArray.length > 0 && (
          <button onClick={this.uploadData}>Upload New Businesses</button>
        )}
        <FileData data={this.state.formattedFileData} />
      </React.Fragment>
    );
  }
}
export default AddFileContainer;