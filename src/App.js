import React, {Component} from 'react';
import './App.css';
import TodoItem from './TodoItem/TodoItem';

class App extends Component {
  state = {
    url: "http://localhost:8888/wp-json/",
    todos: []
  }

  componentDidMount() {
    fetch(`${this.state.url}wp/v2/todos`)
        .then(res => res.json())
        .then( response => {
          this.setState({todos: response})
        })
  }

  render() {
    let todos = null;

    todos = (
        <div>
          {this.state.todos.map((todo) => {
            return <TodoItem
                    content={todo.title.rendered}
                />
          })}
        </div>
    );
    return(
        <div className="container">
          <h1>TodoList</h1>
          <div className="todo">

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
