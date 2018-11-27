import React, { Component } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { CSVLink } from "react-csv";
import AddTraining from "./AddTraining";

export default class TrainingHeader extends Component {
  render() {
    return (
      <div>
        <header className="List-header">
          <h5 className="List-title">Training List</h5>
        </header>
        <div className="row">
          <AddTraining
            addTraining={this.props.addTraining}
            getTrainingData={this.props.getTrainingData}
          />
          <CSVLink data={this.props.data}>
            <CloudUploadIcon />
          </CSVLink>
        </div>
      </div>
    );
  }
}
