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
  deleteList = (index, e) => {
    let newState = Object.assign([], this.state.todos);
     newState.splice(index, 1);
      this.setState({
        todos: newState
     });
     console.log(this.deleteList);
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
    const todolist = this.state.todos.map((todo, index) => (
      <tr key={index}>
        <td>{todo.date}</td>
        <td>{todo.description}</td>
        <td>
          <button onClick={this.deleteList.bind(this, index)}>Delete</button>
        </td>
      </tr>
    ));
    return <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>
        <div>
          <form onSubmit={this.addTodo}>
            <fieldset>
              <legend>Add todo:</legend>
              Description:
              <input type="text" id="#" name="description" onChange={this.inputChanged} value={this.state.description} />
              Date:
              <input type="date" name="date" onChange={this.inputChanged} value={this.state.date} />
              <input type="submit" value="Add" />
            </fieldset>
          </form>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Description</th>
              </tr>
              {todolist}
            </tbody>
          </table>
        </div>
      </div>;
  }
}
console.log("Todo app is running");

export default App;
