import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Addcar from "./Addcar";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

class Carlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      open: false,
      msg: ""
    };
  }
  componentDidMount() {
    this.listCars();
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
  updateCar = (car, link) => {
    console.log(link);
    console.log(car);
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car)
    })
      .then(response => {
        this.listCars();
        this.setState({
          showSnack: true,
          msg: "Car Updated"
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ msg: "Error in updating" });
      });
  };
  saveCar = car => {
    fetch("https://carstockrest.herokuapp.com/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car)
    }).then(response => {
      this.setState({ showSnack: true });
      this.listCars();
    });
  };

  handleClose = () => {
    this.setState({ showSnack: false });
  };

  listCars = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ cars: responseData._embedded.cars });
      });
  };

  // Delete a car
  deleteCar = link => {
    //alert(link); this will alert the
    fetch(link, { method: "DELETE" }).then(response => {
      this.listCars();
      this.setState({ showSnack: true, msg: "Car deleted" });
    });
  };

  render() {
    const columns = [
      { Header: "Brand", accessor: "brand", Cell: this.renderEditable },
      { Header: "Model", accessor: "model", Cell: this.renderEditable },
      { Header: "Color", accessor: "color", Cell: this.renderEditable },
      { Header: "fuel", accessor: "fuel", Cell: this.renderEditable },
      { Header: "Year", accessor: "year", Cell: this.renderEditable },
      { Header: "Price (£)", accessor: "price", Cell: this.renderEditable },
      {
        Header: "",
        filterable: false,
        sortable: false,
        minWidth: 30,
        accessor: "_links.self.href",
        Cell: ({ row, value }) => (
          <Tooltip title="Update">
            <Button
              size="small"
              color="default"
              onClick={() => this.updateCar(row, value)}
            >
              <SaveIcon />
            </Button>
          </Tooltip>
        )
      },
      {
        Header: "",
        accessor: "_links.self.href",
        Cell: ({ value }) => (
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={() => this.deleteCar(value)}
            >
              {" "}
              <DeleteIcon />{" "}
            </IconButton>
          </Tooltip>
        )
      }
    ];
    return (
      <div>
        <Addcar saveCar={this.saveCar} />
        <ReactTable
          defaultPageSize={15}
          filterable={true}
          data={this.state.cars}
          columns={columns}
        />
        <Snackbar
          message={this.state.msg}
          autoHideDuration={3000}
          open={this.state.showSnack}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Carlist;
