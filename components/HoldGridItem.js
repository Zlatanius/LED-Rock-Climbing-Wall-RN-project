import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const HoldGridItem = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onSelect(props.id);
      }}
      style={{
        ...styles.gridItem,
        width: props.width,
        backgroundColor: props.color,
      }}>
      <Text>{props.id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default HoldGridItem;
