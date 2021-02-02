import React, {useState} from 'react';
import {Button, View, StyleSheet, Switch, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import HoldsGrid from '../components/HoldsGrid';
import * as ledActions from '../store/actions/ledActions';

const GridControlerScreen = (props) => {
  const dispatch = useDispatch();
  const holds = useSelector((state) => state.leds.holds);
  const [isRgb, setIsRgb] = useState(
    !useSelector((state) => state.leds.ledType),
  );

  const selectHandler = (holdId) => {
    dispatch(ledActions.toggleHold(holdId));
  };

  const resetHandler = () => {
    dispatch(ledActions.resetLeds());
  };

  const switchToggleHandler = () => {
    dispatch(ledActions.changeLedType());
    setIsRgb(!isRgb);
  };

  const idToCoords = (id) => {
    const y = -(Math.floor(id / 11) - 17);
    const x = id - Math.floor(id / 11) * 11;
    return {x, y};
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
      <HoldsGrid numOfColumns={11} onSelect={selectHandler} holds={holds} />
      <Text>
        {'L' +
          holds
            .reduce((holdsString, currHold) => {
              let newHolds = holdsString;
              if (currHold.state) {
                newHolds = `${idToCoords(currHold.id).x} ${
                  idToCoords(currHold.id).y
                } ${holdsString}`;
              }
              return newHolds;
            }, '')
            .trimEnd() +
          '|'}
      </Text>
      <View style={styles.buttonContainer}>
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
    height: '10%',
    justifyContent: 'space-around',
  },
});

export default GridControlerScreen;
