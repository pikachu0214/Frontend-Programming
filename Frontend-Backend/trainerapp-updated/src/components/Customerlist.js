import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../App.css";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import { CSVLink, CSVDownload } from "react-csv";
import AddCustomer from "./AddCustomer";

class Customerlist extends Component {
  constructor(props) {
    super(props);
    this.getCustomersData = this.getCustomersData.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
    this.state = { customers: [] };
  }
  //lifecycle method
  componentDidMount() {
    this.getCustomersData();
  }
  //method to edit list in cell
  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  updateCustomer = (customer, link) => {
    console.log(link);
    console.log(customer);
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    })
      .then(response => {
        this.getCustomersData();
      })
      .catch(err => {
        console.error(err);
        this.setState({ msg: "Error in updating" });
      });
  };
  //method to save a customer
  // Create new car
  addCustomer(customer) {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(res => this.getCustomersData())
      .catch(err => console.error(err));
  }
  //method to delete a customer from the list
  //confirm delete
  deleteCustomer = idLink => {
    confirmAlert({
      title: "Confirm deletion",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          label: "Yes, delete it.",
          onClick: () => {
            fetch(idLink, { method: "DELETE" })
              .then(res => {
                this.getCustomersData();
              })
              .catch(err => console.error(err));
            alert("customer deleted");
            toast.warn("Warning notification", {
              position: toast.POSITION.BOTTOM_LEFT
            });
          }
        },
        {
          label: "No do not delete!"
        }
      ]
    });
  };
  //getting customer list from rest api
  getCustomersData = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          customers: responseData.content
        });
      });
  };
  //rendering with React Table
  render() {
    return (
      <div className="App-body">
        <header className="List-header">
          <h5 className="List-title">Customer's List</h5>
        </header>
        <div className="row">
          <AddCustomer
            addCustomer={this.addCustomer}
            getCustomersData={this.getCustomersData}
          />
          <CSVLink data={this.state.customers}>
            <CloudUploadIcon />
          </CSVLink>
        </div>
        <ReactTable
          className="-highlight"
          filterable={true}
          sortable={true}
          defaultPageSize={10}
          pageSizeOptions={[5, 10, 15, 20]}
          data={this.state.customers}
          columns={[
            {
              columns: [
                {
                  Header: "Id",
                  accessor: "_links.self.href",
                  show: false,
                  Cell: this.renderEditable
                },
                {
                  Header: "First name",
                  accessor: "firstname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Last name",
                  accessor: "lastname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Email",
                  accessor: "email",
                  Cell: this.renderEditable
                },
                {
                  Header: "Phone",
                  accessor: "phone",
                  Cell: this.renderEditable
                },
                {
                  Header: "Address",
                  accessor: "streetaddress",
                  Cell: this.renderEditable
                },
                {
                  Header: "Postcode",
                  accessor: "postcode",
                  Cell: this.renderEditable
                },
                { Header: "City", accessor: "city", Cell: this.renderEditable },
                {
                  id: "button",
                  width: 100,
                  accessor: "links[0].href",
                  Cell: ({ value, row }) => (
                    <Button
                      variant="outlined"
                      color="primary"
                      aria-label="Save"
                      size="small"
                      onClick={() => {
                        this.updateCustomer(row, value);
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
                      onClick={() => this.deleteCustomer(value)}
                    >
                      Delete
                      <DeleteIcon />{" "}
                    </Button>
                  )
                }
              ]
            }
          ]}
        />
      </div>
    );
  }
}
export default Customerlist;
