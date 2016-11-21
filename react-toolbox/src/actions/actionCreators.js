export function addTodo(text, completed) {
  return {
    type: 'ADD_TODO',
    text,
    completed
  }
}

export function toggleTodo(index, completed) {
  return {
    type: 'TOGGLE_TODO',
    index,
    completed
  }
}
