import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  text-decoration: ${props => props.completed ? 'line-through' : ''};
`;

const CheckBox = styled.input`
  display: inline-block;
  margin-right: 10px;
`;

class Todo extends React.Component {
  toggleTodo(index, completed) {
    this.props.toggleTodo(index, completed);
  }

  render() {
    const { todo, index } = this.props;
    return (
      <ListItem
        completed={(todo.completed ? true : false)}
        >
        <CheckBox
          type="checkbox"
          checked={(todo.completed ? true : false)}
          onChange={() => this.toggleTodo(index, todo.completed)}
        />
        {todo.text}
      </ListItem>
    );

  }
}

export default Todo;
