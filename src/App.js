import React, {Component} from 'react';
import './App.css';
import TodoItem from './TodoItem/TodoItem';
import TodoInput from './TodoInput/TodoInput';

class App extends Component {
  state = {
    url: "http://localhost:8888/wp-json/",
    auth: {
        login: "eddst",
        password: "eddst"
    },
    todos: []
  }

  // Get the data from WP
  componentDidMount() {
    fetch(`${this.state.url}wp/v2/todos`)
        .then(res => res.json())
        .then( response => {
          this.setState({todos: response})
        })
  }

  // Event on adding task
  keypressHandler = (event) => {
    if (event.keyCode === 13) {

        // Define the data object
        const data = {
            "status": "publish",
            "title": event.target.value
        }

        // Post the data to WP API
        fetch(`${this.state.url}wp/v2/todos`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(this.state.auth.login + ":" + this.state.auth.password).toString('base64'),
            }),
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(response => {
                // Edit the state
                const todos = [...this.state.todos]
                todos.push(response)
                this.setState({todos: todos})
            })
        event.target.value = ''
    }
  }

  toggleTaskHandler = (taskIndex) => {
      // State copy to edit it
      const task = this.state.todos[taskIndex]
      // Request body
      const data = {
          "fields": {
              "eddst_todo_done": ''
          }
      }
      if (task.acf.eddst_todo_done !== true) {
          data.fields.eddst_todo_done = true
          task.acf.eddst_todo_done = true
      } else {
          data.fields.eddst_todo_done = false
          task.acf.eddst_todo_done = false
      }
      const todos = [...this.state.todos]
      todos[taskIndex] = task
      this.setState({todos: todos})
      // Post the data to WP API
      fetch(`${this.state.url}acf/v3/posts/${task.id}`, {
          method: "POST",
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + Buffer.from(this.state.auth.login + ":" + this.state.auth.password).toString('base64'),
          }),
          body: JSON.stringify(data)
      })
  }

  deleteTodoHandler = (taskIndex) => {
      const taskId = this.state.todos[taskIndex].id
      const todos = [...this.state.todos]
      todos.splice(taskIndex, 1)
      this.setState({todos: todos})
      // Delete data on WP API
      fetch(`${this.state.url}wp/v2/todos/${taskId}`, {
          method: "DELETE",
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + Buffer.from(this.state.auth.login + ":" + this.state.auth.password).toString('base64'),
          }),
      })
  }

  render() {
    let todos = null;

    todos = (
          this.state.todos.map((todo, index) => {
              // Test to add classes
              if (todo.acf.eddst_todo_done === true) {
                  return <TodoItem
                      active="list-is-active"
                      content={todo.title.rendered}
                      key={todo.id}
                      delete={() => this.deleteTodoHandler(index)}
                      click={() => this.toggleTaskHandler(index)}
                  />
              } else {
                  return <TodoItem
                      content={todo.title.rendered}
                      key={todo.id}
                      delete={() => this.deleteTodoHandler(index)}
                      click={() => this.toggleTaskHandler(index)}
                  />
              }

          })
    );

    return(
        <div className="container">
          <h1>TodoList</h1>
          <div className="todo">
            <TodoInput
                keypress={(event) => this.keypressHandler(event)}/>
            <div className="content">
              <ul className="list-group">
                {todos}
              </ul>
            </div>

            <div className="todo-footer">
              <p>Double Click to Delete</p>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
