import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  PanResponder,
  Vibration,
} from 'react-native';
import {useDispatch} from 'react-redux';

import * as ledActions from '../store/actions/ledActions';

const TouchControlerPad = (props) => {
  const [movePosition, setMovePosition] = useState(0);
  const [moveAmount, setMoveAmount] = useState(0);
  const dispatch = useDispatch();
  const screenWidth = useWindowDimensions().width;
  const elementHeight = props.heightOfElement;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        Vibration.vibrate(2);
      },
      onPanResponderMove: (evt, gestureState) => {
        const ySegment = Math.floor(
          (elementHeight - evt.nativeEvent.locationY) / (elementHeight / 20),
        );
        console.log(ySegment, elementHeight);
        const currMoveAmount = Math.floor(gestureState.dx / (screenWidth / 20));
        if (movePosition !== currMoveAmount) {
          setMovePosition((prevValue) => {
            setMoveAmount(currMoveAmount - prevValue);
            return currMoveAmount;
          });
        }
        return false;
      },
      onPanResponderRelease: (evt, gestureState) => {
        setMoveAmount(0);
        setMovePosition(0);
      },
    }),
  ).current;

  useEffect(() => {
    Vibration.vibrate(2);
    // console.log(movePosition);
    if (moveAmount !== 0) {
      const newPos = props.selectedHold + (moveAmount >= 0 ? 1 : -1);
      dispatch(ledActions.setCursor(newPos));
      dispatch(ledActions.updateLeds());
    }
  }, [movePosition]);

  return <View style={styles.touchPad} {...panResponder.panHandlers}></View>;
};

const styles = StyleSheet.create({
  touchPad: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default TouchControlerPad;
