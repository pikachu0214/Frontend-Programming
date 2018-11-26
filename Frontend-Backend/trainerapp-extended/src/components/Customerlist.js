import React, { Component } from "react";
import "../App.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//App components
import Header from "./HomePageFile/Header";
import CustomerHeader from "./AddCustomerFile/CustomerHeader";
import CustomerTable from "./AddCustomerFile/CustomerTable";

export default class Customerlist extends Component {
  state = { customers: [] };

  componentDidMount() {
    this.getCustomersData();
  }

  //Data from api
  getCustomersData = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          customers: responseData.content
        });
      });
  };

  //delete customer from list
  deleteCustomer = idLink => {
    confirmAlert({
      title: "Confirm deletion",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(idLink, { method: "DELETE" })
              .then(res => {
                this.getCustomersData();
              })
              .catch(err => console.error(err));
            toast.success("Customer Deleted !", {
              position: toast.POSITION.BOTTOM_CENTER
            });
          }
        },
        {
          label: "No"
        }
      ]
    });
  };

  //update customer in the list
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
  //update and save customer list
  updateCustomer = (customer, link) => {
    console.log(link);
    console.log(customer);
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(response => {
        this.getCustomersData();
      })
      .catch(err => {
        console.error(err);
        this.setState({
          msg: "Error in updating"
        });
      });
  };

  //add customer to table
  addCustomer = customer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(res => this.getCustomersData())
      .catch(err => console.error(err));
  };
  render() {
    return (
      <div className="container-fluid">
        {/* Navbar Header */}
        <Header />
        {/* Body */}
        <div className="App-body">
          <CustomerHeader
            data={this.state.customers}
            addCustomer={this.addCustomer}
            getCustomersData={this.getCustomersData}
          />
          <CustomerTable
            customers={this.state.customers}
            deleteCustomer={this.deleteCustomer}
            renderEditable={this.renderEditable}
            updateCustomer={this.updateCustomer}
          />
        </div>
      </div>
    );
  }
}
