import React from "react";
import SkyLight from "react-skylight";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

export default class AddTraining extends React.Component {
  state = {
    activity: "",
    duration: "",
    date: "",
    customer: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newTraining = {
      date: this.state.date,
      duration: this.state.duration,
      activity: this.state.activity,
      customer: this.state.customer
    };
    this.props.addTraining(newTraining);
    this.props.getTrainingData();
    this.refs.simpleDialog.hide();
  };

  render() {
    const addTrainingDialog = {
      width: "55%",
      height: "450px",
      marginTop: "-200px",
      marginLeft: "-35%"
    };
    return (
      <div>
        <SkyLight
          dialogStyles={addTrainingDialog}
          hideOnOverlayClicked
          ref="simpleDialog"
        >
          <div className="card" style={{ width: "95%" }}>
            <div className="card-body">
              <h5 className="card-title">Add Training</h5>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Activity: "
                    className="form-control"
                    name="activity"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Duration: "
                    className="form-control"
                    name="duration"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    placeholder="Date: "
                    className="form-control"
                    name="date"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Name: "
                    className="form-control"
                    name="customer"
                    onChange={this.handleChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    <SaveIcon />
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
