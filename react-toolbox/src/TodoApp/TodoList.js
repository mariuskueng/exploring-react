import React from 'react';
import styled from 'styled-components';

import Todo from './Todo';

const Heading = styled.h2`
  font-family: sans-serif;
`;

const List = styled.li`
  list-style: none;
`;

const TodoList = ({ todos, toggleTodo }) => (
  <div>
    <Heading>Todos</Heading>
    <List>
      {todos.map((todo, index) =>
        <Todo key={index} todo={todo} index={index} toggleTodo={toggleTodo} />)}
    </List>
  </div>
);

export default TodoList;
