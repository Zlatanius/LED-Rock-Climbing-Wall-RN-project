import React, {useState} from 'react';
import {Button, View, StyleSheet, Switch, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import HoldsGrid from '../components/HoldsGrid';
import * as ledActions from '../store/actions/ledActions';

const GridControlerScreen = (props) => {
  const dispatch = useDispatch();
  const holds = useSelector((state) => state.leds.holds);
  const selectedHold = useSelector((state) => state.leds.cursorPosition);
  const [isRgb, setIsRgb] = useState(false);

  const selectHandler = (holdId) => {
    dispatch(ledActions.setCursor(holdId));
  };

  const addHoldHandler = () => {
    dispatch(ledActions.addHold());
  };

  const resetHandler = () => {
    dispatch(ledActions.resetLeds());
  };

  const switchToggleHandler = () => {
    dispatch(ledActions.changeLedType());
    setIsRgb(!isRgb);
  };

  return (
    <View style={styles.mainContianer}>
      <View style={styles.switchContainer}>
        <Switch
          style={styles.switch}
          value={isRgb}
          onValueChange={switchToggleHandler}
        />
        <Text>Using RGB</Text>
      </View>
      <HoldsGrid
        numOfHolds={49}
        numOfColumns={11}
        onSelect={selectHandler}
        holds={holds}
        selectedHold={selectedHold}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="ADD HOLD"
          onPress={addHoldHandler}
        />
        <Button style={styles.button} title="RESET" onPress={resetHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContianer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  switchContainer: {
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
  },
  switch: {},
  buttonContainer: {
    height: '20%',
    justifyContent: 'space-around',
  },
});

export default GridControlerScreen;
