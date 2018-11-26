import React, { Component } from 'react';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { CSVLink } from "react-csv";

export default class TrainingHeader extends Component {
    render() {
        return <div>
            <header className="List-header">
              <h5 className="List-title">Training List</h5>
            </header>
            <div className="row">
              <CSVLink data={this.props.trainings}>
                <CloudUploadIcon />
              </CSVLink>
            </div>
          </div>;
    }
}

