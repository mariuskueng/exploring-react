import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import TodoList from './TodoList';
import TodoInput from './TodoInput';

function mapStateToProps(state) {
  return {
    todos: state.todos,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const TodoApp = (props) => (
  <div>
    <TodoInput addTodo={props.addTodo} />
    <TodoList todos={props.todos} toggleTodo={props.toggleTodo} />
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
