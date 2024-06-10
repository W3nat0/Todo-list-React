import React, { Component } from "react";
import "./Todo.css";

class Todo extends Component {
  constructor() {
    super();
    const savedTasks = localStorage.getItem("tasks");
    this.state = {
      title: "",
      tasks: savedTasks ? JSON.parse(savedTasks) : [],
      editingTaskId: null,
      editingTitle: "",
    };
  }
  // save localStorage
  saveToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // on change
  handleOnChange = (e) => {
    this.setState({ title: e.target.value });
  };

  // Submit button
  handleOnSubmit = (e) => {
    e.preventDefault();
    const { title, tasks } = this.state;
    if (title.trim() !== "") {
      const newTasks = [
        ...tasks,
        { id: Math.random(), title: title, checked: false },
      ];
      this.setState({
        title: "",
        tasks: newTasks,
      });
      this.saveToLocalStorage(newTasks);
    }
  };

  // Remove button
  handleOnRemove = (id) => {
    const newTasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({
      tasks: newTasks,
    });
    this.saveToLocalStorage(newTasks);
  };

  // Check button
  handleToggleChecked = (id) => {
    const newTasks = this.state.tasks.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    this.setState({
      tasks: newTasks,
    });
    this.saveToLocalStorage(newTasks);
  };

  // Edit button
  handleEditChange = (e) => {
    this.setState({ editingTitle: e.target.value });
  };

  handleOnEdit = (id) => {
    const taskToEdit = this.state.tasks.find((task) => task.id === id);
    this.setState({
      editingTaskId: id,
      editingTitle: taskToEdit.title,
    });
  };

  handleEditSubmit = (id) => {
    const { editingTitle, tasks } = this.state;
    if (editingTitle.trim() !== "") {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, title: editingTitle } : task
      );
      this.setState({
        tasks: newTasks,
        editingTaskId: null,
        editingTitle: "",
      });
      this.saveToLocalStorage(newTasks);
    }
  };

  handleCancelEdit = () => {
    this.setState({
      editingTaskId: null,
      editingTitle: "",
    });
  };

  render() {
    return (
      <div className="todo-app">
        <h1>Todo App</h1>
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            placeholder="Add a new task"
            value={this.state.title}
            onChange={this.handleOnChange}
          />
          <button type="submit">Add Task</button>
        </form>
        <ul>
          {this.state.tasks.map((task) => (
            <li key={task.id}>
              {this.state.editingTaskId === task.id ? (
                <div className="edit-task">
                  <form>
                    <input
                      type="text"
                      value={this.state.editingTitle}
                      onChange={this.handleEditChange}
                    />

                    <button
                      className="edit-save"
                      type="submit"
                      onClick={() => this.handleEditSubmit(task.id)}
                    >
                      Save
                    </button>

                    <button
                      className="edit-cancel"
                      onClick={this.handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              ) : (
                <div className="content">
                  <h3
                    style={{
                      textDecoration: task.checked ? "line-through" : "none",
                      color: task.checked ? "grey" : "black",
                      marginRight: "300px",
                    }}
                  >
                    {task.title}
                  </h3>

                  <div className="btn-container">
                    <button
                      onClick={() => this.handleToggleChecked(task.id)}
                      className="check-btn"
                    >
                      <i className="fas fa-check"></i>
                    </button>

                    <button
                      onClick={() => this.handleOnEdit(task.id)}
                      className="edit-btn"
                    >
                      <i className="fas fa-edit"></i>
                    </button>

                    <button
                      onClick={() => this.handleOnRemove(task.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;
