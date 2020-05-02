import {ADD_HOLD, SELECT_HOLD, RESET} from '../actions/girdActions';

const initialState = {
  selectedHolds: [],
  currentHold: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_HOLD:
      if (!state.selectedHolds.find((hold) => hold === action.holdId)) {
        return {
          ...state,
          selectedHolds: state.selectedHolds.concat(action.holdId),
        };
      }
      return state;
    case SELECT_HOLD:
      return {...state, currentHold: action.holdId};
    case RESET:
      return initialState;
    default:
      return initialState;
  }
};
