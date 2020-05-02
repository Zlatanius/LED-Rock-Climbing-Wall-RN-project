import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import * as mainActions from '../store/actions/mainActions';
import ENV from '../env';

const ReadWriteScreen = (props) => {
  const [currentText, setCurrentText] = useState('');
  const dispatch = useDispatch();

  const isConnected = useSelector((state) => state.main.isConnected);

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
    dispatch(mainActions.sendMessage(data + '\n'));
  };

  const onDiscconect = async () => {
    await dispatch(mainActions.disconnectCurrentDevice());
    props.navigation.navigate('Connect');
  };

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

  return !isConnected ? (
    <View style={styles.warning}>
      <Text>There is no device connected</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="SUBMIT" onPress={onSubmit.bind(this, currentText)} />
        <Button title="TEST" onPress={goThruTest.bind(this, 48, 1)} />
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
  warning: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReadWriteScreen;
