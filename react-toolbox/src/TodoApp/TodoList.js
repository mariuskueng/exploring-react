import React from 'react';
import styled from 'styled-components';

import Todo from './Todo';

const Heading = styled.h2`
  font-family: sans-serif;
`;

const TodoList = ({ todos, toggleTodo }) => (
  <div>
    <Heading>Todos</Heading>
    <ul>
      {todos.map((todo, index) =>
        <Todo key={index} todo={todo} index={index} toggleTodo={toggleTodo} />)}
    </ul>
  </div>
);

export default TodoList;
