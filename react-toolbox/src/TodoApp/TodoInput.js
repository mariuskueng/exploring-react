import React from 'react';

class TodoInput extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { text } = this;
    if (!text.value) return false;
    this.props.addTodo(text.value, false);
    text.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={ref => (this.text = ref)} />
      </form>
    );
  }
}

export default TodoInput;
