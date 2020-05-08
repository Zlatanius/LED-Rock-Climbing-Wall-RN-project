import * as bluethoothActions from './bluethoothActions';

export const CHANGE_COURSOR_POS = 'CHANGE_COURSOR_POS';
export const ADD_HOLD = 'ADD_HOLD';
export const RESET = 'RESET';

export const updateLeds = () => {
  return async (dispatch, getState) => {
    console.log('updating leds');
    const selectedHold = getState().leds.holds[getState().leds.cursorPosition];
    const currHolds = getState().leds.holds.reduce((holdsString, currHold) => {
      let newHolds = holdsString;
      if (currHold.state) {
        newHolds = `${currHold.id} ${currHold.color} ${holdsString}`;
      }
      return newHolds;
    }, '');
    dispatch(
      bluethoothActions.sendMessage(
        `L${selectedHold.id} ${selectedHold.color} ${currHolds}\n`,
      ),
    );
  };
};

export const setCursor = (holdId) => {
  return (dispatch) => {
    dispatch({type: CHANGE_COURSOR_POS, holdId});
    dispatch(updateLeds());
  };
};

export const addHold = () => {
  return {type: ADD_HOLD};
};

export const resetLeds = () => {
  return async (dispatch) => {
    dispatch(bluethoothActions.sendMessage(`R\n`));
    dispatch({type: RESET});
  };
};
