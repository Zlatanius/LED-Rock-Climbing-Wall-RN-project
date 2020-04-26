import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  Platform,
  PermissionsAndroid,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeModules, NativeEventEmitter} from 'react-native';

import * as appActions from '../store/actions/appActions';
import DeviceItem from '../components/DeviceItem';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const ScanDevicesScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();

  const isInitialised = useSelector((state) => state.moduleIsInitialized);
  const deviceIsConnected = useSelector((state) => state.isConnected);
  const didNotConnect = useSelector((state) => state.didNotConnect);
  const currentDeviceId = useSelector((state) => state.selectedDevice.deviceId);
  const currPeripherals = useSelector((state) => state.discoveredDevices);

  let discoverPeripheralHandler;
  let stopScanHandler;

  useEffect(() => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ).then((result) => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ).then((result) => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
  }, [PermissionsAndroid]);

  useEffect(() => {
    dispatch(appActions.startBle());
  }, [dispatch]);

  useEffect(() => {
    discoverPeripheralHandler = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    stopScanHandler = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      handleStopScan,
    );
    return () => {
      discoverPeripheralHandler.remove();
      stopScanHandler.remove();
    };
  });

  const handleDiscoverPeripheral = (peripheral) => {
    const peripherals = currPeripherals;
    if (!peripherals.find((per) => per.id === peripheral.id)) {
      console.log('Adding peripheral');
      dispatch(appActions.addPeripheral(peripheral));
    }
  };

  const handleStopScan = () => {
    console.log('Scan stop');
    discoverPeripheralHandler.remove();
    stopScanHandler.remove();
  };

  const startScan = () => {
    setIsRefreshing(true);
    console.log('Started Scan');
    if (isInitialised) {
      dispatch(appActions.startScan());
    }
    setIsRefreshing(false);
  };

  if (deviceIsConnected) {
    props.navigation.navigate('ReadWrite');
  }

  const selectDeviceHandler = (id) => {
    dispatch(appActions.connectToDevice(id));
    if (didNotConnect) {
      setTimeout(selectDeviceHandler.bind(this, id), 1000);
    }
  };

  const disconnectHandler = (deviceId) => {
    dispatch(appActions.disconnectCurrentDevice());
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.devicesContainer}>
        <FlatList
          onRefresh={startScan}
          refreshing={isRefreshing}
          data={currPeripherals}
          renderItem={(itemData) => {
            return (
              <DeviceItem
                name={itemData.item.name}
                id={itemData.item.id}
                numOfServices={itemData.item.advertising.serviceUUIDs.length}
                pressHandler={selectDeviceHandler.bind(this, itemData.item.id)}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} title="SCAN" onPress={startScan} />
        <Button
          style={styles.button}
          title="DISCONNECT"
          onPress={disconnectHandler.bind(this, currentDeviceId)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  devicesContainer: {
    width: '100%',
    height: '80%',
  },
  buttonsContainer: {
    width: '80%',
    height: '20%',
    justifyContent: 'space-around',
  },
  button: {
    marginVertical: 5,
  },
});

export default ScanDevicesScreen;
