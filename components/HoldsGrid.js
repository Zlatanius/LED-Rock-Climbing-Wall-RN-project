import React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const HoldsGrid = (props) => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <FlatList
      data={props.holds}
      numColumns={props.numOfColumns}
      renderItem={(itemData) => {
        return (
          <TouchableOpacity
            style={{
              ...styles.gridItem,
              width: windowWidth / props.numOfColumns,
              backgroundColor:
                itemData.item.state || itemData.item.id === props.selectedHold
                  ? 'green'
                  : 'white',
            }}
            onPress={() => {
              props.onSelect(itemData.item.id);
            }}>
            <Text>{itemData.item.id + 1}</Text>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default HoldsGrid;
