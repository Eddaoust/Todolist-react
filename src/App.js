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
        let data = {
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
            .then(response => console.log(response))

        // Edit the state
        let inputValue = {
            title: {
                rendered: event.target.value
            }
        }
        let todos = [...this.state.todos]
        todos.push(inputValue)
        this.setState({todos: todos})
    }
  }

  render() {
    let todos = null;

    todos = (
          this.state.todos.map((todo) => {
            return <TodoItem
                    content={todo.title.rendered}
                />
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
