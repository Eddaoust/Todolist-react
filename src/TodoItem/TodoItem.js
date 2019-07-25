import React from 'react';
import './TodoItem.css';

const todoItem = (props) => {

    return(
        <div className={props.active ? props.active + " todoItem list-group-item": "todoItem list-group-item"} onClick={props.click} onDoubleClick={props.delete}>
            <li>{props.content}</li>
        </div>
    );
}

export default todoItem;