import React, { Component } from 'react';
import '../App.css';

//App components
import Header from "./Header";
import CustomerHeader from "./CustomerHeader";
import CustomerTable from "./CustomerTable";

export default class Customerlist extends Component {
  state = { customers: [] };

  componentDidMount() {
    this.getCustomersData();
  }

//Data from api
  getCustomersData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        customers: responseData.content,
      });
    })
  }
  render() {
    return <div className="container-fluid">
        {/* Navbar Header */}
        <Header />

        {/* Body */}
        <div className="App-body">
          <CustomerHeader />
          <CustomerTable customers={this.state.customers} />
        </div>
      </div>; 
      }}
