import env from '../../env';
import {RESET, CHANGE_LED_TYPE, TOGGLE_HOLD} from '../actions/ledActions';
import Hold from '../../models/Hold';

let initialHolds = env.holds;

const initialState = {
  holds: initialHolds,
  ledType: true, //true = MAX2719, false = RGB
};

export default (state = initialState, action) => {
  switch (action.type) {
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

    case TOGGLE_HOLD:
      let newHolds = state.holds.map((hold) => {
        let newHold = hold;
        if (hold.id == action.holdId) newHold.state = !newHold.state;
        return newHold;
      });
      return {...state, holds: newHolds};

    default:
      return initialState;
  }
};
