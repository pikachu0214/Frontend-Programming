import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

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
                {
                  Header: "Id",
                  accessor: "_links.self.href",
                  show: false,
                  Cell: this.props.renderEditable
                },
                {
                  Header: "First name",
                  accessor: "firstname",
                  Cell: this.props.renderEditable
                },
                {
                  Header: "Last name",
                  accessor: "lastname",
                  Cell: this.props.renderEditable
                },
                {
                  Header: "Email",
                  accessor: "email",
                  Cell: this.props.renderEditable
                },
                {
                  Header: "Phone",
                  accessor: "phone",
                  Cell: this.props.renderEditable
                },
                {
                  Header: "Address",
                  accessor: "streetaddress",
                  Cell: this.props.renderEditable
                },
                {
                  Header: "Postcode",
                  accessor: "postcode",
                  Cell: this.props.renderEditable
                },
                {
                  Header: "City",
                  accessor: "city",
                  Cell: this.props.renderEditable
                },
                {
                  id: "button",
                  width: 100,
                  accessor: "",
                  Cell: ({ value, row }) => (
                    <Button
                      variant="outlined"
                      color="primary"
                      aria-label="Save"
                      size="small"
                      onClick={() => {
                        this.props.updateCustomer(row, value);
                      }}
                    >
                      Save
                      <SaveIcon />
                    </Button>
                  )
                },
                {
                  id: "button",
                  width: 100,
                  accessor: "links[0].href",
                  Cell: ({ value }) => (
                    <Button
                      variant="outlined"
                      color="secondary"
                      aria-label="Delete"
                      size="small"
                      onClick={() => this.props.deleteCustomer(value)}
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
          defaultSorted={[{ id: "lastname", asc: true }]}
          className="-highlight"
        />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
