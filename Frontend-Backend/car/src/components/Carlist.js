import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Carlist extends Component {
  state = { cars: [] };

  componentDidMount() {
    this.loadCars();
  }

  // Load cars from REST API
  loadCars = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          cars: responseData._embedded.cars
        });
      });
  };

  // Delete car
  onDelClick = idLink => {
    fetch(idLink, { method: "DELETE" })
      .then(res => this.loadCars())
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="App-body">
        <ReactTable
          data={this.state.cars}
          columns={[
            {
              columns: [
                {
                  Header: "Id",
                  accessor: "_links.self.href",
                  show: false
                },
                {
                  Header: "Brand",
                  accessor: "brand"
                },
                {
                  Header: "Model",
                  accessor: "model"
                },
                {
                  Header: "Year",
                  accessor: "year"
                },
                {
                  Header: "Color",
                  accessor: "color"
                },
                {
                  Header: "Fuel",
                  accessor: "fuel"
                },
                {
                  id: "button",
                  accessor: "_links.self.href",
                  Cell: ({ value }) => (
                    <button
                      className="btn btn-default btn-link"
                      onClick={() => {
                        this.onDelClick(value);
                      }}
                    >
                      Delete
                    </button>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={10}
          filterable
          className="-striped -highlight"
        />
        ,
      </div>
    );
  }
}

export default Carlist;
