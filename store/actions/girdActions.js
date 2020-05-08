export const ADD_HOLD = 'ADD_HOLD';
export const SELECT_HOLD_G = 'SELECT_HOLD_G';
export const RESET = 'RESET';

export const addHold = (holdId) => {
  return {type: ADD_HOLD, holdId};
};

export const selectHold = (holdId) => {
  return {type: SELECT_HOLD, holdId};
};

export const reset = () => {
  return {type: RESET};
};
