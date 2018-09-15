import React, { Component } from "react";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      description: "",
      todos: []
    };
  }
  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  addTodo = event => {
    event.preventDefault();
    const listObject = {
      description: this.state.description,
      date: this.state.date
    };
    this.setState({
      todos: [listObject, ...this.state.todos]
    });
  };
  render() {
    const todolist = this.state.todos.map((item, index) => (
      <tr key={index}>
        <td>{item.date}</td>
        <td>{item.description}</td>
      </tr>
    ));
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>
        <div>
          <form onSubmit={this.addTodo}>
            <fieldset>
              <legend>Add todo:</legend>
              Description:
              <input
                type="text"
                id="#"
                name="description"
                onChange={this.inputChanged}
                value={this.state.description}
              />
              Date:
              <input
                type="date"
                name="date"
                onChange={this.inputChanged}
                value={this.state.date}
              />
              <input type="submit" value="Add" />
            </fieldset>
          </form>
        </div>
        <div>
          <table className="App">
            <tbody>
              <tr>
                <th>Date</th>
                <th>Description</th>
              </tr>
              {todolist}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default App;
