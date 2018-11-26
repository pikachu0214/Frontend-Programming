import React, { Component } from "react";
import "../App.css";

export default class Weights extends Component {
  render() {
    return <div>
        <img src={require("../img/weights.jpg")} width="100" height="100" alt="" />
        <img src={require("../img/weights1.jpg")} width="100" height="100" alt="" />
        <img src={require("../img/weights2.jpg")} width="100" height="100" alt="" />
        <p className="lead">
          Our Weight instructor is one of the best in the world. Contact us
          for an appointment.
        </p>
        <hr className="my-4" />
      </div>;
  }
}
