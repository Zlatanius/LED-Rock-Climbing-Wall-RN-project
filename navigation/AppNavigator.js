import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ConnectScreen, {
  screenOptions as connectScreenOpstions,
} from '../screens/ConnectScreen';
import ReadWriteScreen, {
  screenOptions as readWriteScreenOpstions,
} from '../screens/ReadWriteScreen';
import GridControlerScreen, {
  screenOptions as gridControlerScreenOpstions,
} from '../screens/GridControlerScreen';
import TouchConreolerScreen, {
  screenOptions as touchControllerScreenOpstions,
} from '../screens/TouchControlerScreen';

const ConnectStackNavigator = createStackNavigator();
const ConnectNavigator = () => {
  return (
    <ConnectStackNavigator.Navigator>
      <ConnectStackNavigator.Screen
        name="ConnectDeviceScreen"
        component={ConnectScreen}
        options={connectScreenOpstions}
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
        options={readWriteScreenOpstions}
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
        options={gridControlerScreenOpstions}
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
        options={touchControllerScreenOpstions}
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
