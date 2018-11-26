import React, { Component } from "react";
import "../App.css";

//App components
import Header from "./Header";
import Cardio from "./Cardio";
import Weights from "./Weights";
import Footer from "./Footer";

export default class HomePage extends Component {
  render() {
    return <div className="container-fluid ">
        {/* Navbar */}
        <Header />
        <div className="card">

          {/* Section 1 */}
          <div className="card-header">Cardio</div>
          <div className="card-body">
            <Cardio />
          </div>

          {/* Section 2 */}
          <div className="card-header">Weights</div>
          <div className="card-body">
            <Weights />
          </div>

          <Footer />
        </div>
      </div>;
  }
}
