import React, {useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import TouchControlPad from '../components/TouchControlPad';
import * as ledActions from '../store/actions/ledActions';

const TouchControlerScreen = (props) => {
  const [touchPadHeight, setTouchPadHeight] = useState(0);
  const selectedHold = useSelector((state) => state.leds.cursorPosition);
  const dispatch = useDispatch();
  //console.log(`Height outside: ${touchPadHeight}`);

  const resetHandler = () => {
    dispatch(ledActions.resetLeds());
  };

  return (
    <View>
      <View
        style={styles.touchPad}
        onLayout={(event) => {
          setTouchPadHeight(event.nativeEvent.layout.height);
        }}>
        <TouchControlPad
          selectedHold={selectedHold}
          heightOfElement={touchPadHeight}
        />
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
