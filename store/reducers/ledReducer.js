import env from '../../env';
import {
  CHANGE_COURSOR_POS,
  ADD_HOLD,
  RESET,
  CHANGE_LED_TYPE,
} from '../actions/ledActions';
import Hold from '../../models/Hold';

let initialHolds = env.holds;

const initialState = {
  holds: initialHolds,
  cursorPosition: 0,
  ledType: true, //true = MAX2719, false = RGB
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COURSOR_POS:
      return {...state, cursorPosition: action.holdId};
    case ADD_HOLD:
      let newHolds = state.holds;
      newHolds[state.cursorPosition].state = true;
      return {...state, holds: newHolds};
    case RESET:
      const emptyHolds = [];
      initialHolds.forEach((element) => {
        emptyHolds.push(new Hold(element.id, false, 2));
      });
      return {
        ...initialState,
        holds: emptyHolds,
      };
    case CHANGE_LED_TYPE:
      return {...state, ledType: !state.ledType};

    default:
      return initialState;
  }
};
