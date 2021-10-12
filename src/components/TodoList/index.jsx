import PropTypes from 'prop-types';
import React from 'react';

TodoList.propTypes = {
    todos : PropTypes.array,
    onTodoClick : PropTypes.func,
};
TodoList.defaultProps = {
    todos : [],
    onTodoClick : null,
};

function TodoList(props) {

    const { todos , onTodoClick } = props;

    function handleTodoClick(todo, index){
       if(!onTodoClick) return;

        onTodoClick(todo , index)
    }

    return (
        <ul>
            { todos.map((todo, index) => (
                <li 
                    key={todo.id}
                    onClick={() => handleTodoClick(todo, index)}
                >
                    {todo.title}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;