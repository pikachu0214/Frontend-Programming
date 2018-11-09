import React, { Component } from "react";
import "./App.css";
import Customerlist from "./components/Customerlist";
import Traininglist from "./components/Traininglist";
import Navigator from "./components/Navigator";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigator />
            <Switch>
              <Route path="/trainings" component={Traininglist} />
              <Route path="/customers" component={Customerlist} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
