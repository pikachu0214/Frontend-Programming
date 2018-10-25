import React, { Component } from "react";
import Carlist from "./components/Carlist";
import "./App.css";



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>CarShop</h2>
        </header>
        <section className="carslist">
          <Carlist />
        </section>
      </div>
    );
  }
}

export default App;
