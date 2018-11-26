import React, { Component } from "react";
import "../App.css";

//App components
import Header from "./Header";
import TrainingHeader from "./TrainingHeader";
import TrainingTable from "./TrainingTable";

export default class Traininglist extends Component {
  state = { trainings: [] };

  componentDidMount() {
    this.getTrainingData();
  }

  //Data from api
  getTrainingData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          trainings: responseData
        });
      });
  };

  render() {
    return (
      <div className="container-fluid">
        {/* Navbar Header */}
        <Header />

        {/* Body */}
        <div className="App-body">
          <TrainingHeader />
          <TrainingTable trainings={this.state.trainings}/>
        </div>
      </div>);
  }}
