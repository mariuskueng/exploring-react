import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  color: black;
  text-decoration: ${props => props.completed ? 'line-through' : ''};
  &:hover {
    &:after {
      content: ' ${props => props.completed ? '❎' : '✅'}'
    }
  }
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
        onClick={() => this.toggleTodo(index, todo.completed)}
      >
        {todo.text}
      </ListItem>
    );

  }
}

export default Todo;
