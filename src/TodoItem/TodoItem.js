import React from 'react';
import './TodoItem.css';

const todoItem = (props) => {

    return(
        <div className="todoItem list-group-item">
            <input type="checkbox"/>
            <li>{props.content}</li>
        </div>
    );
}

export default todoItem;