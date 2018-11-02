import React from "react";
import SkyLight from "react-skylight";

class AddCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { brand: "", model: "", year: "", color: "", fuel: "" };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Save car and load cars and finally close modal
  handleSubmit = event => {
    event.preventDefault();
    var newCar = {
      brand: this.state.brand,
      model: this.state.model,
      color: this.state.color,
      year: this.state.year,
      fuel: this.state.fuel
    };
    this.props.addCar(newCar);
    this.props.loadCars();
    this.refs.simpleDialog.hide();
  };

  render() {
    // Add car page doesn't fit to default size modal
    const addCarDialog = {
      width: "70%",
      height: "450px",
      marginTop: "-300px",
      marginLeft: "-35%"
    };

    return (
      <div>
        <SkyLight
          dialogStyles={addCarDialog}
          hideOnOverlayClicked
          ref="simpleDialog"
        >
          <div className="card" style={{ width: "95%" }}>
            <div className="card-body">
              <h5 className="card-title">New car</h5>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Brand"
                    className="form-control"
                    name="brand"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Model"
                    className="form-control"
                    name="model"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Color"
                    className="form-control"
                    name="color"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Year"
                    className="form-control"
                    name="year"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Fuel"
                    className="form-control"
                    name="fuel"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </SkyLight>
        <div className="col-md-2">
          <button
            style={{ margin: "10px" }}
            className="btn btn-primary"
            onClick={() => this.refs.simpleDialog.show()}
          >
            New car
          </button>
        </div>
      </div>
    );
  }
}

export default AddCar;
