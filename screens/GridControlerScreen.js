import React from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import HoldsGrid from '../components/HoldsGrid';
import * as ledActions from '../store/actions/ledActions';

const GridControlerScreen = (props) => {
  const dispatch = useDispatch();
  const holds = useSelector((state) => state.leds.holds);
  const selectedHold = useSelector((state) => state.leds.cursorPosition);

  const selectHandler = (holdId) => {
    dispatch(ledActions.setCursor(holdId));
  };

  const addHoldHandler = () => {
    dispatch(ledActions.addHold());
  };

  const resetHandler = () => {
    dispatch(ledActions.resetLeds());
  };

  return (
    <View style={styles.mainContianer}>
      <HoldsGrid
        numOfHolds={49}
        numOfColumns={7}
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
  buttonContainer: {
    height: '20%',
    justifyContent: 'space-around',
  },
});

export default GridControlerScreen;
