import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const deviceItem = (props) => {
  const isConnected = useSelector((state) => state.main.isConnected);

  const connectedDeviceId = useSelector((state) => {
    if (isConnected) {
      return state.main.connectedDevice.id;
    }
  });

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={props.pressHandler}>
      <View style={styles.textContiner}>
        <View style={styles.firstRow}>
          <Text style={{...styles.text, ...styles.large}}>
            Name: {props.name}
          </Text>
          {connectedDeviceId === props.id && (
            <Text style={{...styles.text, ...styles.green}}>CONNECTED</Text>
          )}
        </View>
        <Text style={styles.text}>Id: {props.id}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#eee',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
  },
  textContiner: {
    paddingVertical: 5,
  },
  text: {
    paddingLeft: 4,
    fontSize: 17,
  },
  large: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
  },
  green: {
    color: 'green',
  },
});

export default deviceItem;
