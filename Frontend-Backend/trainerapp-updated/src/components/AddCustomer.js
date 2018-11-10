import React from "react";
import SkyLight from "react-skylight";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";


class AddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      streetaddress: "",
      postcode: "",
      city: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Save car and load cars and finally close modal
  handleSubmit = event => {
    event.preventDefault();
    const customer = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city
    };
    this.props.addCustomer(customer);
    this.props.getCustomersData();
    this.refs.simpleDialog.hide();
  };

  render() {
    // Add car page doesn't fit to default size modal
    const addCustomerDialog = {
      width: "55%",
      height: "450px",
      marginTop: "-200px",
      marginLeft: "-35%"
    };

    return (
      <div>
        <SkyLight
          dialogStyles={addCustomerDialog}
          hideOnOverlayClicked
          ref="simpleDialog"
        >
          <div className="card" style={{ width: "95%" }}>
            <div className="card-body">
              <h5 className="card-title">Add Customer</h5>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="First Name: "
                    className="form-control"
                    name="firstName"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Last Name: "
                    className="form-control"
                    name="lastName"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Email: "
                    className="form-control"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Phone: "
                    className="form-control"
                    name="phone"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Address: "
                    className="form-control"
                    name="streetaddress"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Post Code: "
                    className="form-control"
                    name="postcode"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="City: "
                    className="form-control"
                    name="city"
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
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            mini
            onClick={() => this.refs.simpleDialog.show()}
          >
          <AddIcon />
          </Button>
        </div>
      </div>
    );
  }
}

export default AddCustomer;
