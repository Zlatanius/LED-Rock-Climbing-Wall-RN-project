export const CONNECT_TO_DEVICE = 'CONNECT_TO_DEVICE';
export const DID_NOT_CONNECT = 'DID_NOT_CONNECT';
export const ADD_PAIRED_DEVICES = 'ADD_PAIRED_DEVICES';
export const DISCONNECT = 'DISCONNECT';

const getPairedDevicesHelper = async (dispatch, BluethoothModule) => {
  console.log('getting paired devices');
  const devices = await BluethoothModule.list();
  dispatch({type: ADD_PAIRED_DEVICES, devices: devices});
};

const connectToDeviceHelepr = async (
  dispatch,
  BluethoothModule,
  isConnected,
  deviceId,
) => {
  try {
    const connectedDevice = isConnected
      ? await BluethoothModule.getConnectedDevice()
      : await BluethoothModule.connect(deviceId);
    console.log(connectedDevice);
    console.log('connected');
    dispatch({type: CONNECT_TO_DEVICE, connectedDevice: connectedDevice});
  } catch (error) {
    console.log('did not connect');
    console.log(error);
    dispatch({type: DID_NOT_CONNECT});
  }
};

export const intialize = () => {
  return async (dispatch, getState, {BluethoothModule, BTCharsets}) => {
    await BluethoothModule.setEncoding(BTCharsets.ASCII);
    const isConnected = await BluethoothModule.isConnected();
    console.log(`Device is connected: ${isConnected}`);
    if (isConnected) {
      connectToDeviceHelepr(dispatch, BluethoothModule, true);
    } else {
      await getPairedDevicesHelper(dispatch, BluethoothModule);
    }
  };
};

export const connectToDevice = (deviceId) => {
  return async (dispatch, getState, {BluethoothModule, BTCharsets}) => {
    console.log('connecting');
    console.log(deviceId);
    connectToDeviceHelepr(dispatch, BluethoothModule, false, deviceId);
  };
};

export const sendMessage = (data) => {
  return async (dispatch, getState, {BluethoothModule, BTCharsets}) => {
    console.log(data);
    try {
      const response = await BluethoothModule.write(data);
      console.log(response);
    } catch (error) {
      console.log('Error sending message');
      console.log(error);
    }
  };
};

export const disconnectCurrentDevice = () => {
  return async (dispatch, getState, {BluethoothModule, BTCharsets}) => {
    try {
      await BluethoothModule.disconnect();
      console.log('disconnected');
      dispatch({type: DISCONNECT});
    } catch (error) {
      console.log('disconnect failed');
      console.log(error);
    }
  };
};
