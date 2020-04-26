export const INITIALIZE = 'INITIALIZE';
export const ADD_PERIPHERAL = 'ADD_PERIPHERAL';
export const CONNECT_TO_DEVICE = 'CONNECT_TO_DEVICE';
export const DID_NOT_CONNECT = 'DID_NOT_CONNECT';
export const DISCONNECT = 'DISCONNECT';
export const SCANING = 'SCANING';

export const startBle = () => {
  return async (dispatch, getState, BleManager) => {
    await BleManager.start({showAlert: false}).then(() => {
      console.log('Module Started');
    });
    dispatch({type: INITIALIZE});
  };
};

export const startScan = () => {
  return async (dispatch, getState, BleManager) => {
    BleManager.scan([], 5, true);
    dispatch({type: SCANING});
  };
};

export const addPeripheral = (peripheral) => {
  return {type: ADD_PERIPHERAL, peripheral: peripheral};
};

export const connectToDevice = (deviceId) => {
  return async (dispatch, getState, BleManager) => {
    try {
      await BleManager.connect(deviceId);
      console.log('connected');
      const services = await BleManager.retrieveServices(deviceId);
      dispatch({type: CONNECT_TO_DEVICE, deviceId: deviceId});
    } catch {
      console.log('Error');
      console.log(error);
      dispatch({type: DID_NOT_CONNECT});
    }
  };
};

export const disconnectCurrentDevice = () => {
  return async (dispatch, getState, BleManager) => {
    BleManager.getConnectedPeripherals([]).then((devicesArray) => {
      console.log(devicesArray[0].id);
      BleManager.disconnect(devicesArray[0].id)
        .then(() => {
          console.log('disconecting');
          dispatch({type: DISCONNECT});
        })
        .catch((error) => {
          console.log('error');
        });
    });
  };
};

export const sendMessage = (deviceId, serviceId, characteristicId, data) => {
  return async (dispatch, getState, BleManager) => {
    try {
      const response = await BleManager.write(
        deviceId,
        serviceId,
        characteristicId,
        data,
        20,
      );
      console.log(response);
    } catch {
      console.log('Error');
      console.log(getState.selectedDevice.deviceId);
    }
  };
};
