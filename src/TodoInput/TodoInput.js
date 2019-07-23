import React from 'react';
import './TodoInput.css';

const todoInput = (props) => {

    return(
        <input type="text" onKeyDown={props.keypress} className="form-control" id="todo-input" placeholder="Ajouter une tâche"/>
    );

}

export default todoInput;