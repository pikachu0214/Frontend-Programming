import React, { Component } from "react";
import "../App.css";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Todolist extends Component {
  render() {
    return (
      <div className="App">   
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th />
            </tr>
            {this.props.data.map((todo, index) => (
              <tr key={index}>
                <td>{todo.date}</td>
                <td>{todo.description}</td>
                <td>
                  <button id={index} onClick={this.props.deleteList}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
console.log("Todo app is running");

export default Todolist;
