import {
  INITIALIZE,
  ADD_PERIPHERAL,
  CONNECT_TO_DEVICE,
  DID_NOT_CONNECT,
  DISCONNECT,
  SCANING,
} from '../actions/appActions';
import ENV from '../../env';

const initialState = {
  discoveredDevices: [],
  discoveredServices: [],
  discoveredCharacteristics: [],
  selectedDevice: {
    deviceId: null,
    selectedService: ENV.serviceId,
    selectedReadCharacteristic: ENV.readCharacteristicId,
    selectedWriteCharacteristic: ENV.writeCharacteristicId,
  },
  moduleIsInitialized: false,
  isConnected: false,
  didNotConnect: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {...state, moduleIsInitialized: true};
    case ADD_PERIPHERAL:
      return {
        ...state,
        discoveredDevices: state.discoveredDevices.concat(action.peripheral),
      };
    case CONNECT_TO_DEVICE:
      return {
        ...state,
        selectedDevice: {...state.selectedDevice, deviceId: action.deviceId},
        isConnected: true,
        didNotConnect: false,
      };
    case DID_NOT_CONNECT:
      return {...state, didNotConnect: true};
    case DISCONNECT:
      return {...initialState, moduleIsInitialized: state.moduleIsInitialized};
    case SCANING:
      return {...state, discoveredDevices: []};
    default:
      return state;
  }
};
