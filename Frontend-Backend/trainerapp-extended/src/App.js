import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//App components
import HomePage from "./components/HomePage";
import Traininglist from "./components/Traininglist";
import Customerlist from "./components/Customerlist";
import NotFound from "./components/NotFound";

class App extends Component {
  render() {
    return <BrowserRouter>
        <div className="App">
          <div>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/trainings" component={Traininglist} />
              <Route path="/customers" component={Customerlist} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>;
  }
}

export default App;
