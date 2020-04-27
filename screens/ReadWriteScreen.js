import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import * as appActions from '../store/actions/appActions';
import ENV from '../env';

const ServicesScreen = (props) => {
  const [currentText, setCurrentText] = useState('');
  const dispatch = useDispatch();

  const isConnected = useSelector((state) => state.isConnected);

  const textChangeHandler = (text) => {
    setCurrentText(text);
  };

  const convertToByteArray = (string) => {
    let bytes = [];
    for (let i = 0; i < string.length; ++i) {
      let code = string.charCodeAt(i);

      bytes = bytes.concat([code]);
    }
    return bytes.concat(10);
  };

  const onSubmit = (data) => {
    dispatch(appActions.sendMessage(data + '\n'));
  };

  const onDiscconect = () => {
    dispatch(appActions.disconnectCurrentDevice());
  };

  if (!isConnected) {
    props.navigation.navigate('ScanDevices');
  }

  const goThruTest = (numOfLeds, delay) => {
    let counter = 0;
    const myInterval = setInterval(() => {
      onSubmit(`L${counter} 2`);
      counter++;
      console.log(counter);
      if (counter === numOfLeds) {
        clearInterval(myInterval);
        counter = 0;
      }
    }, delay);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="SUBMIT" onPress={onSubmit.bind(this, currentText)} />
        <Button title="TEST" onPress={goThruTest.bind(this, 48, 5)} />
        <Button title="DISCONNECT" onPress={onDiscconect} />
      </View>
      <TextInput
        style={styles.input}
        value={currentText}
        onChangeText={textChangeHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  buttonContainer: {
    height: '30%',
    justifyContent: 'space-around',
  },
});

export default ServicesScreen;
