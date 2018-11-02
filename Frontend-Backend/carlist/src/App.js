import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Carlist from "./components/Carlist";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cars in stock</h1>
        </header>
        <Carlist />
      </div>
    );
  }
}

export default App;
