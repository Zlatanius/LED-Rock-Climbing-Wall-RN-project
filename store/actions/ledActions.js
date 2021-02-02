import * as bluethoothActions from './bluethoothActions';

export const RESET = 'RESET';
export const CHANGE_LED_TYPE = 'CHANGE_LED_TYPE';
export const TOGGLE_HOLD = 'TOGGLE_HOLD';

const idToCoords = (id) => {
  const y = -(Math.floor(id / 11) - 17);
  const x = id - Math.floor(id / 11) * 11;
  return {x, y};
};

export const updateLeds = () => {
  return async (dispatch, getState) => {
    console.log('updating leds');
    console.log(`Led Type is: ${getState().leds.ledType}`);
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
    if (currHolds) {
      dispatch(bluethoothActions.sendMessage(`L${currHolds.trimEnd()}\n`));
    } else {
      dispatch(resetLeds());
    }
  };
};

export const toggleHold = (holdId) => {
  return (dispatch, getState) => {
    console.log(`X: ${idToCoords(holdId).x}, Y: ${idToCoords(holdId).y}`);
    dispatch({type: TOGGLE_HOLD, holdId});
    dispatch(updateLeds());
  };
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
