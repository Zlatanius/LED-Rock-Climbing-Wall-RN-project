import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ConnectScreen from '../screens/ConnectScreen';
import ReadWriteScreen from '../screens/ReadWriteScreen';
import GridControlerScreen from '../screens/GridControlerScreen';
import TouchConreolerScreen from '../screens/TouchControlerScreen';

const ConnectStackNavigator = createStackNavigator();
const ConnectNavigator = () => {
  return (
    <ConnectStackNavigator.Navigator>
      <ConnectStackNavigator.Screen
        name="ConnectDeviceScreen"
        component={ConnectScreen}
      />
    </ConnectStackNavigator.Navigator>
  );
};

const ReadWriteStackNavigator = createStackNavigator();
const ReadWriteNavigator = () => {
  return (
    <ReadWriteStackNavigator.Navigator>
      <ReadWriteStackNavigator.Screen
        name="ReadWriteScreen"
        component={ReadWriteScreen}
      />
    </ReadWriteStackNavigator.Navigator>
  );
};

const GridControlerStackNavigator = createStackNavigator();
const GridControlerNavigator = () => {
  return (
    <GridControlerStackNavigator.Navigator>
      <GridControlerStackNavigator.Screen
        name="GridControlerScreen"
        component={GridControlerScreen}
      />
    </GridControlerStackNavigator.Navigator>
  );
};

const TouchConreolerStackNavigator = createStackNavigator();
const TouchConreolerNavigator = () => {
  return (
    <TouchConreolerStackNavigator.Navigator>
      <TouchConreolerStackNavigator.Screen
        name="TouchControlerScreen"
        component={TouchConreolerScreen}
      />
    </TouchConreolerStackNavigator.Navigator>
  );
};

const AppDrawerNavigator = createDrawerNavigator();
const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <AppDrawerNavigator.Navigator initialRouteName="ConnectDeviceScreen">
        <AppDrawerNavigator.Screen
          name="ConnectDevice"
          component={ConnectNavigator}
        />
        <AppDrawerNavigator.Screen
          name="ReadWrite"
          component={ReadWriteNavigator}
        />
        <AppDrawerNavigator.Screen
          name="GridControler"
          component={GridControlerNavigator}
        />
        <AppDrawerNavigator.Screen
          name="TouchControler"
          component={TouchConreolerNavigator}
        />
      </AppDrawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
