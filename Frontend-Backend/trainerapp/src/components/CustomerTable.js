import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class CustomerTable extends Component {
  render() {
    return (
      <div>
        <ReactTable
          defaultPageSize={10}
          pageSizeOptions={[5, 10, 15, 20]}
          data={this.props.customers}
          columns={[
            {
              columns: [
                { Header: "Id", accessor: "_links.self.href", show: false },
                { Header: "First name", accessor: "firstname" },
                { Header: "Last name", accessor: "lastname" },
                { Header: "Email", accessor: "email" },
                { Header: "Phone", accessor: "phone" },
                { Header: "Address", accessor: "streetaddress" },
                { Header: "Postcode", accessor: "postcode" },
                { Header: "City", accessor: "city" }
              ]
            }
          ]}
          filterable
          defaultSorted={[{ id: "lastname", asc: true }]}
          className="-highlight"
        />
      </div>
    );
  }
}
