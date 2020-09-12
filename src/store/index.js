import { createStore } from 'redux';
const initialState = {
    number: 0
  };
  
  const incrementReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'INCREMENT': {
        state.number += 1
        return { ...state }
        break
      };
      default: return state;
    }
  };
const store = createStore(incrementReducer);

export default store;