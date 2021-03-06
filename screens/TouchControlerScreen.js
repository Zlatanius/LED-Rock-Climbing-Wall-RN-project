import React, {useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import TouchControlPad from '../components/TouchControlPad';
import * as ledActions from '../store/actions/ledActions';
import HeaderButton from '../components/HeaderButton';

const TouchControlerScreen = (props) => {
  const selectedHold = useSelector((state) => state.leds.cursorPosition);
  const dispatch = useDispatch();
  //console.log(`Height outside: ${touchPadHeight}`);

  const resetHandler = () => {
    dispatch(ledActions.resetLeds());
  };

  return (
    <View>
      <View style={styles.touchPad}>
        <TouchControlPad selectedHold={selectedHold} />
      </View>
      <View>
        <Button
          title="ADD HOLD"
          onPress={() => {
            dispatch(ledActions.addHold());
          }}
        />
        <Button style={styles.button} title="RESET" onPress={resetHandler} />
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Touch Controller',
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
  touchPad: {
    width: '100%',
    height: '70%',
  },
  buttonContainer: {
    height: '20%',
    justifyContent: 'space-around',
  },
});

export default TouchControlerScreen;
