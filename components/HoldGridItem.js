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
        height: props.height,
        backgroundColor: props.color,
      }}>
      {/* <Text>{props.id}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default HoldGridItem;
