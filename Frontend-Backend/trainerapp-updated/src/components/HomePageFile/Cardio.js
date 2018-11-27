import React, { Component } from 'react';
import "../../App.css";

export default class Cardio extends Component {
    render() {
        return <div>
            <img src={require("../../img/cardio.jpg")} width="100" height="100" alt="" />
            <img src={require("../../img/cardio1.jpg")} width="100" height="100" alt="" />
            <img src={require("../../img/swimmingpool.jpg")} width="100" height="100" alt="" />
            <p className="lead">
              Our Yoga instructor is one of the best in the world.
              Contact us for an appointment.
            </p>
            <hr className="my-4" />
            <p>
              We have a basketball court, sauna, and swimming pool and
              tennis court. Start today.
            </p>
            <hr />
          </div>;
    }
}

