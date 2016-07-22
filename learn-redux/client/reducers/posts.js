// a reducer takes in two things:
//
// 1. the action (info about what happened)
// 2. copy of the current state

function posts(state = [], action) {
  switch (action.type) {
    case 'INCREMENT_LIKES':
      console.log('incrementing likes');
      const i = action.index;
      // return [
      //   ...state.slice(0, i), // before the one we are upating
      //   {...state[i], likes: state[i].likes + 1}, // before the one we are upating
      //   ...state.slice(i + 1), // after the one we are upating
      // ]
      const newState = [...state];
      newState[i].likes++;
      return newState;
      break;
    default:
      return state;
  }
}

export default posts;
