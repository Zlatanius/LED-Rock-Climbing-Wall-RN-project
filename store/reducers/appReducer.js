import {
  CONNECT_TO_DEVICE,
  DID_NOT_CONNECT,
  ADD_PAIRED_DEVICES,
  DISCONNECT,
} from '../actions/appActions';
import ENV from '../../env';

const initialState = {
  pairedDevices: [],
  connectedDevice: null,
  isConnected: false,
  didNotConnect: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PAIRED_DEVICES:
      return {...initialState, pairedDevices: action.devices};
    case CONNECT_TO_DEVICE:
      return {
        ...state,
        connectedDevice: action.connectedDevice,
        isConnected: true,
        didNotConnect: false,
      };
    case DID_NOT_CONNECT:
      return {...state, didNotConnect: true};
    case DISCONNECT:
      return {...initialState, pairedDevices: state.pairedDevices};
    default:
      return state;
  }
};
