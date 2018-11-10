import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../App.css";
import Moment from "react-moment";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import { CSVLink, CSVDownload } from "react-csv";
import AddCustomer from "./AddCustomer";

class Traininglist extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [] };
  }

  componentDidMount() {
    this.getTrainingData();
  }

  //getting API
  getTrainingData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          trainings: responseData
        });
      });
  };

  // rendering with React Table
  render() {
    return (
      <div className="App-body">
        <header className="List-header">
          <h5 className="List-title">Training List</h5>
        </header>
        <ReactTable
          defaultPageSize={10}
          pageSizeOptions={[5, 10, 15, 20]}
          data={this.state.trainings}
          columns={[
            {
              columns: [
                {
                  accessor: "_links.self.href",
                  show: false
                },
                {
                  Header: "Activity",
                  accessor: "activity"
                },
                {
                  Header: "Duration",
                  accessor: "duration"
                },
                {
                  id: "date",
                  Header: "Date",
                  accessor: d => {
                    let date = new Date(d.date);
                    let day = date.getDate();
                    let month = date.getMonth() + 1;
                    let year = date.getFullYear();
                    date = new Date(day, month, year);
                    return <Moment date={date} />;
                  }
                },
                {
                  id: "customerName",
                  Header: "Customer",
                  accessor: d => {
                    if (d.customer != null) {
                      return d.customer.firstname + " " + d.customer.lastname;
                    } else return d.customer;
                  }
                }
              ]
            }
          ]}
          filterable={true}
          className="-highlight"
        />
      </div>
    );
  }
}

export default Traininglist;
