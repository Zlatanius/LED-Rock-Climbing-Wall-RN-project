import React, {useState} from 'react';
import {View, StyleSheet, useWindowDimensions, Vibration} from 'react-native';
import {useDispatch} from 'react-redux';

import * as ledActions from '../store/actions/ledActions';
import env from '../env';

const TouchControlerPad = (props) => {
  const [prevMoveAmount, setPrevMoveAmount] = useState(0);
  const [totalMoveDelta, setTotalMoveDelta] = useState(0);
  const [touchOrigin, setTouchOrigin] = useState();
  const [elementHeight, setElementHeight] = useState();
  const dispatch = useDispatch();
  const screenWidth = useWindowDimensions().width;

  const onResponderMoveHandler = (event) => {
    const yPos = elementHeight - event.nativeEvent.locationY;
    const ySegment = Math.floor(yPos / (elementHeight / 45) + 5);
    const dx = event.nativeEvent.locationX - touchOrigin.x;
    const newMoveAmount = Math.floor(dx / (screenWidth / ySegment));
    if (prevMoveAmount !== newMoveAmount) {
      const currMoveDelta = newMoveAmount - prevMoveAmount;
      let newPos = props.selectedHold + currMoveDelta;
      console.log(`newPos: ${newPos}, currPos: ${props.selectedHold}`);
      if (newPos > env.numOfLeds - 1) {
        newPos = env.numOfLeds - 1;
      } else if (newPos < 0) {
        newPos = 0;
      }
      Vibration.vibrate(2);
      interpolateLeds(props.selectedHold, newPos);
      setPrevMoveAmount(newMoveAmount);
    }
  };

  const interpolateLeds = (startPos, endPos) => {
    if (startPos < endPos) {
      for (let i = startPos; i <= endPos; i++) {
        dispatch(ledActions.setCursor(i));
      }
    } else {
      for (let i = startPos; i >= endPos; i--) {
        dispatch(ledActions.setCursor(i));
      }
    }
  };

  const onResponderGrantHandler = (event) => {
    console.log('Responder Granted');
    const touchOriginPos = {
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
      t: event.nativeEvent.timestamp,
    };
    setTouchOrigin(touchOriginPos);
    setPrevMoveAmount(0);
    setTotalMoveDelta(0);
  };

  const onResponderReleaseHandler = (event) => {
    setTotalMoveDelta({
      x: event.nativeEvent.locationX - touchOrigin.x,
      y: event.nativeEvent.locationY - touchOrigin.y,
      dt: event.nativeEvent.timestamp - touchOrigin.t,
    });
    // console.log(
    //   Math.floor(
    //     (event.nativeEvent.locationX - touchOrigin.x) / (screenWidth / 50),
    //   ),
    // );
    // console.log(event.nativeEvent.timestamp - touchOrigin.t);
  };

  return (
    <View
      style={styles.touchPad}
      onLayout={(event) => {
        setElementHeight(event.nativeEvent.layout.height);
      }}
      onStartShouldSetResponder={(evt) => true}
      onResponderGrant={onResponderGrantHandler}
      onResponderMove={onResponderMoveHandler}
      onResponderRelease={onResponderReleaseHandler}></View>
  );
};

const styles = StyleSheet.create({
  touchPad: {
    flex: 1,
    backgroundColor: '#999',
  },
});

export default TouchControlerPad;
