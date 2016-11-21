const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: action.completed
        }
      ];
    case 'TOGGLE_TODO':
      return state.map((t, i) => {
        if (action.index === i) {
          return {
            ...t,
            completed: !t.completed,
          }
        }
        return t;
      })
    default:
      return state;
  }
}

export default todos;
