import React, { Component } from "react";
import AddCustomer from "./AddCustomer";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { CSVLink } from "react-csv";

export default class CustomerHeader extends Component {
  render() {
    return (
      <div>
        <header className="List-header">
          <h5 className="List-title">Customer</h5>
        </header>
        <div className="row">
          <AddCustomer
            addCustomer={this.props.addCustomer}
            getCustomersData={this.props.getCustomersData}
          />
          <CSVLink data={this.props.data}>
            <CloudUploadIcon />
          </CSVLink>
        </div>
      </div>
    );
  }
}
