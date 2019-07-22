import React from 'react';
import './TodoItem.css';

const todoItem = (props) => {

    return(
        <div className="todoItem">
            <li className="list-group-item">{props.content}</li>
        </div>
    );
}

export default todoItem;