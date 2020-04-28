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

import * as appActions from '../store/actions/appActions';
import DeviceItem from '../components/DeviceItem';

const ConnectScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();

  const pairedDevices = useSelector((state) => state.pairedDevices);

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
              console.log('User accept permissions');
            } else {
              console.log('User refuse permissions');
            }
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    dispatch(appActions.intialize());
  }, []);

  const selectDeviceHandler = async (id) => {
    await dispatch(appActions.connectToDevice(id));
  };

  const onDiscconect = () => {
    dispatch(appActions.disconnectCurrentDevice());
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.devicesContainer}>
        <FlatList
          // onRefresh={startScan}
          refreshing={isRefreshing}
          data={pairedDevices}
          renderItem={(itemData) => {
            return (
              <DeviceItem
                name={itemData.item.name}
                id={itemData.item.id}
                pressHandler={selectDeviceHandler.bind(this, itemData.item.id)}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          title="DISCONNECT"
          onPress={onDiscconect}
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

export default ConnectScreen;
