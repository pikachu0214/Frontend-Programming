import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

export default class TrainingTable extends Component {
  render() {
    return (
      <div>
        <ReactTable
          defaultPageSize={10}
          pageSizeOptions={[5, 10, 15, 20]}
          data={this.props.trainings}
          columns={[
            {
              columns: [
                {
                  Header: "Id",
                  accessor: "_links.self.href",
                  show: false,
                },
                {
                  Header: "Activity",
                  accessor: "activity",
                },
                {
                  Header: "Duration",
                  accessor: "duration",
                },
                {
                  id: "date",
                  Header: "Date",
                  accessor: d => {
                    return new Date(d.date).toLocaleDateString();
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
                },
                {
                  id: "button",
                  accessor: "id",
                  Cell: ({ value }) => (
                    <Button
                      variant="outlined"
                      color="secondary"
                      aria-label="Delete"
                      size="small"
                      onClick={() => this.props.deleteTraining(value)}
                    >
                      Delete
                      <DeleteIcon />{" "}
                    </Button>
                  )
                }
              ]
            }
          ]}
          filterable
          defaultSorted={[{ id: "duration", asc: true }]}
          className="-highlight"
        />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
