import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

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
                { Header: "Id", accessor: "_links.self.href", show: false },
                { Header: "Activity", accessor: "activity" },
                { Header: "Duration", accessor: "duration" },
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
                }
              ]
            }
          ]}
          filterable
          defaultSorted={[{ id: "duration", asc: true }]}
          className="-highlight"
        />
      </div>
    );
  }
}
