import * as bluethoothActions from './bluethoothActions';

export const CHANGE_COURSOR_POS = 'CHANGE_COURSOR_POS';
export const ADD_HOLD = 'ADD_HOLD';
export const RESET = 'RESET';
export const CHANGE_LED_TYPE = 'CHANGE_LED_TYPE';

const idToCoords = (id) => {
  const y = Math.floor(id / 11);
  const x = id - y * 11;
  return {x, y};
};

export const updateLeds = () => {
  return async (dispatch, getState) => {
    console.log('updating leds');
    console.log(`Led Type is: ${getState().leds.ledType}`);
    // const ledType =
    const selectedHold = getState().leds.holds[getState().leds.cursorPosition];
    console.log(
      `X: ${idToCoords(selectedHold.id).x}, Y: ${
        idToCoords(selectedHold.id).y
      }`,
    );
    const currHolds = getState().leds.holds.reduce((holdsString, currHold) => {
      let newHolds = holdsString;
      if (currHold.state) {
        newHolds = `${
          getState().leds.ledType ? idToCoords(currHold.id).x : currHold.id
        } ${
          getState().leds.ledType ? idToCoords(currHold.id).y : currHold.color
        } ${holdsString}`;
      }
      return newHolds;
    }, '');
    dispatch(
      bluethoothActions.sendMessage(
        `L${
          getState().leds.ledType
            ? idToCoords(selectedHold.id).x
            : selectedHold.id
        } ${
          getState().leds.ledType
            ? idToCoords(selectedHold.id).y
            : selectedHold.color
        } ${currHolds}\n`,
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

export const changeLedType = () => {
  return {type: CHANGE_LED_TYPE};
};
