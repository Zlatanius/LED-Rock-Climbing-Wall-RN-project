import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import * as appActoins from '../store/actions/appActions';
import ENV from '../env';

const ServicesScreen = (props) => {
  const [currentText, setCurrentText] = useState('');
  const dispatch = useDispatch();

  const selectedDeviceId = useSelector(
    (state) => state.selectedDevice.deviceId,
  );

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

  const submitHandler = (data) => {
    dispatch(
      appActoins.sendMessage(
        selectedDeviceId,
        ENV.serviceId,
        ENV.writeCharacteristicId,
        convertToByteArray(data),
      ),
    );
  };

  const goThruTest = (numOfLeds, delay) => {
    let counter = 0;
    const myInterval = setInterval(() => {
      submitHandler(`L${counter} ${(counter % 3) + 1}`);
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
      <TextInput
        style={styles.input}
        value={currentText}
        onChangeText={textChangeHandler}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="SUBMIT"
          onPress={submitHandler.bind(this, currentText)}
        />
        <Button title="TEST" onPress={goThruTest.bind(this, 49, 150)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  buttonContainer: {
    height: '20%',
    justifyContent: 'space-around',
  },
});

export default ServicesScreen;
