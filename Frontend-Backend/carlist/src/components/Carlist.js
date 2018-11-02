import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import { CSVLink, CSVDownload } from "react-csv";
import AddCar from "./Addcar";

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
    confirmAlert({
      title: "",
      message: "Are you sure you want to delete this?",
      confirmLabel: "OK",
      cancelLabel: "CANCEL",
      onConfirm: () => {
        fetch(idLink, { method: "DELETE" })
          .then(res => this.loadCars())
          .catch(err => console.error(err));

        toast.success("Delete succeed", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }
    });
  };

  // Create new car
  addCar(car) {
    fetch("https://carstockrest.herokuapp.com/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(car)
    })
      .then(res => this.loadCars())
      .catch(err => console.error(err));
  }

  // Update car
  updateCar(car, link) {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(car)
    })
      .then(
        toast.success("Changes saved", {
          position: toast.POSITION.BOTTOM_LEFT
        })
      )
      .catch(err => console.error(err));
  }

  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.cars];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ cars: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.cars[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  render() {
    return (
      <div className="App-body">
        <div className="row">
          <AddCar addCar={this.addCar} loadCars={this.loadCars} />
          <CSVLink style={{ padding: 20 }} data={this.state.cars}>
            Download CSV
          </CSVLink>
        </div>
        <ReactTable
          data={this.state.cars}
          columns={[
            {
              columns: [
                {
                  accessor: "_links.self.href",
                  show: false
                },
                {
                  Header: "Brand",
                  accessor: "brand",
                  Cell: this.renderEditable
                },
                {
                  Header: "Model",
                  accessor: "model",
                  Cell: this.renderEditable
                },
                {
                  Header: "Year",
                  accessor: "year",
                  Cell: this.renderEditable
                },
                {
                  Header: "Color",
                  accessor: "color",
                  Cell: this.renderEditable
                },
                {
                  Header: "Fuel",
                  accessor: "fuel",
                  Cell: this.renderEditable
                },
                {
                  Header: "Price €",
                  accessor: "price",
                  Cell: this.renderEditable
                },
                {
                  id: "button",
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: "_links.self.href",
                  Cell: ({ value, row }) => (
                    <button
                      className="btn btn-default btn-link"
                      onClick={() => {
                        this.updateCar(row, value);
                      }}
                    >
                      Save
                    </button>
                  )
                },
                {
                  id: "button",
                  sortable: false,
                  filterable: false,
                  width: 100,
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
          filterable
          className="-highlight"
        />
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default Carlist;
