import React from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import HoldsGrid from '../components/HoldsGrid';
import * as mainActions from '../store/actions/mainActions';
import * as gridActions from '../store/actions/girdActions';

const GridControlerScreen = (props) => {
  const dispatch = useDispatch();
  const selectedHold = useSelector((state) => state.grid.currentHold);

  const selectHandler = (holdData) => {
    dispatch(mainActions.sendMessage(`${holdData}\n`));
  };

  const addHoldHandler = () => {
    dispatch(gridActions.addHold(selectedHold));
  };

  const resetHandler = () => {
    dispatch(mainActions.sendMessage(`R\n`));
    dispatch(gridActions.reset());
  };

  return (
    <View style={styles.mainContianer}>
      <HoldsGrid
        numOfHolds={49}
        numOfColumns={7}
        handleSelect={selectHandler}
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
