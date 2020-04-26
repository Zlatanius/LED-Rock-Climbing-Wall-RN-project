import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ScanDevicesScreen from '../screens/ScanDevicesScreen';
import ReadWriteScreen from '../screens/ReadWriteScreen';

const AppStackNavigator = createStackNavigator();

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator>
        <AppStackNavigator.Screen
          name="ScanDevices"
          component={ScanDevicesScreen}
        />
        <AppStackNavigator.Screen
          name="ReadWrite"
          component={ReadWriteScreen}
        />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
