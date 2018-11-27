import React, { Component } from "react";
import "../App.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//App components
import Header from "./HomePageFile/Header";
import TrainingHeader from "./AddTrainingFile/TrainingHeader";
import TrainingTable from "./AddTrainingFile/TrainingTable";


export default class Traininglist extends Component {
  state = { trainings: [] };

  componentDidMount() {
    this.getTrainingData();
    console.log(this.state.trainings);
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
  
  //add training to customer
  addTraining = (link, training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: this.state.date,
        activity: this.state.activity,
        duration: this.state.duration,
        customer: link
      })
    })
      .then(
        toast.success("Training added", {
          position: toast.POSITION.BOTTOM_CENTER
        })
      )
      .catch(err => console.error(err));
  };
  //delete training from list
  deleteTraining = idLink => {
    confirmAlert({
      title: "Confirm deletion",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          label: "Yes, delete it.",
          onClick: () => {
            fetch(
              `https://customerrest.herokuapp.com/api/trainings/${idLink}`,
              { method: "DELETE" }
            )
              .then(res => {
                this.getTrainingData();
              })
              .catch(err => console.error(err));
            toast.success("Training Deleted !", {
              position: toast.POSITION.BOTTOM_CENTER
            });
          }
        },
        {
          label: "Do not delete!"
        }
      ]
    });
  };
  render() {
    return (
      <div className="container-fluid">
        {/* Navbar Header */}
        <Header />

        {/* Body */}
        <div className="App-body">
          <TrainingHeader
            data={this.state.trainings}
            addTraining={this.addTraining}
            getTrainingData={this.getTrainingData}
          />
          <TrainingTable
            trainings={this.state.trainings}
            deleteTraining={this.deleteTraining}
          />
        </div>
      </div>
    );
  }
}
