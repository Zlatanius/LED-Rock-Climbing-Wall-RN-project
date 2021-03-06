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
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import * as bluethoothActions from '../store/actions/bluethoothActions';
import DeviceItem from '../components/DeviceItem';
import HeaderButton from '../components/HeaderButton';

const ConnectScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();

  const pairedDevices = useSelector((state) => state.main.pairedDevices);

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
    dispatch(bluethoothActions.intialize());
  }, []);

  const selectDeviceHandler = async (id) => {
    await dispatch(bluethoothActions.connectToDevice(id));
  };

  const onDiscconect = () => {
    dispatch(bluethoothActions.disconnectCurrentDevice());
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

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Connect Device',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={'md-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
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
