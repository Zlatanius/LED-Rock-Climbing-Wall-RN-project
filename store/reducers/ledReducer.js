import env from '../../env';
import {CHANGE_COURSOR_POS, ADD_HOLD} from '../actions/ledActions';

let initialHodls = [];
for (let i = 0; i < env.numOfLeds; i++) {
  initialHodls.push({id: i, state: false, color: 2});
}

const initialState = {
  holds: initialHodls,
  cursorPosition: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COURSOR_POS:
      return {...state, cursorPosition: action.holdId};
    case ADD_HOLD:
      let newHolds = state.holds;
      newHolds[state.cursorPosition].state = true;
      return {...state, holds: newHolds};
    default:
      return initialState;
  }
};
