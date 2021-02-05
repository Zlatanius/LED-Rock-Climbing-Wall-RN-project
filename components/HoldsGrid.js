import React, {useState} from 'react';
import {FlatList, Dimensions} from 'react-native';

import HoldGridItem from '././HoldGridItem';

const HoldsGrid = (props) => {
  const windowWidth = Dimensions.get('window').width;

  const renderHoldGridItem = (itemData) => {
    return (
      <HoldGridItem
        width={windowWidth / props.numOfColumns}
        height={props.holdItemHeight ? props.holdItemHeight / 18 : 20}
        color={
          itemData.item.state
            ? 'rgba(0, 0, 255, 0.6)'
            : 'rgba(255, 255, 255, 0.0)'
        }
        id={itemData.item.id}
        onSelect={props.onSelect}
      />
    );
  };

  return (
    <FlatList
      data={props.holds}
      extraData={props.holds}
      numColumns={props.numOfColumns}
      renderItem={renderHoldGridItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default HoldsGrid;
