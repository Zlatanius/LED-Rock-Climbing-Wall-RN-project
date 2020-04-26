import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const deviceItem = (props) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={props.pressHandler}>
      <View style={styles.textContiner}>
        <Text style={{...styles.text, ...styles.large}}>
          Name: {props.name}
        </Text>
        <Text style={styles.text}>Id: {props.id}</Text>
        <Text style={styles.text}>
          {props.numOfServices} services available
        </Text>
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
});

export default deviceItem;
