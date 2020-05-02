import React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import * as gridActions from '../store/actions/girdActions';

const HoldsGrid = (props) => {
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
  const selectedHolds = useSelector((state) => state.grid.selectedHolds);

  let holds = [];
  for (let i = 0; i < props.numOfHolds; i++) {
    holds.push(i);
  }

  return (
    <FlatList
      data={holds}
      numColumns={props.numOfColumns}
      renderItem={(itemData) => {
        return (
          <TouchableOpacity
            style={{
              ...styles.gridItem,
              width: windowWidth / props.numOfColumns,
              backgroundColor: selectedHolds.some((hold) => {
                const currHold = hold > 4 ? hold + 1 : hold;
                return itemData.item === currHold;
              })
                ? 'green'
                : 'white',
            }}
            onPress={() => {
              let currHolds = '';
              selectedHolds.forEach((hold) => {
                currHolds = `${currHolds}${hold} 2 `;
              });
              console.log(currHolds);
              if (itemData.item < 6) {
                props.handleSelect(
                  `L${currHolds ? currHolds : ''}${itemData.item} 2`,
                );
                dispatch(gridActions.selectHold(itemData.item));
              } else {
                props.handleSelect(
                  `L${currHolds ? currHolds : ''}${itemData.item - 1} 2`,
                );
                dispatch(gridActions.selectHold(itemData.item - 1));
              }
            }}>
            <Text>{itemData.item + 1}</Text>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.toString()}
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
