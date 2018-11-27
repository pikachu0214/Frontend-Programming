import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as firebase from "firebase";
import "../App.css";

firebase.initializeApp({
  apiKey: "AIzaSyBJBAk2GVTAqh3XFIDBnS5N3w9BCwgAjMY",
  authDomain: "trainerapp-29dfc.firebaseapp.com",
  databaseURL: "https://trainerapp-29dfc.firebaseio.com",
  projectId: "trainerapp-29dfc",
  storageBucket: "trainerapp-29dfc.appspot.com",
  messagingSenderId: "135042498421"
});

export default class LoginPage extends Component {
  state = { signIn: false };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.location = "/homepage";
      }
      this.setState({ signIn: !!user });
    });
  }
  //signin with Google & FB criteria
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: { signInSuccessWithAuthResult: () => false }
  };

  render() {
    return (
      <div className="container-fluid signIn">
        <div className="container signIn">
          {this.state.signIn ? (
            <div >
              <div >Signed in!</div>
            </div>
          ) : (
             <div> 
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
            </div>
          )}
        </div>
      </div>
    );
  }
}
