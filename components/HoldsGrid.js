import React from 'react';
import {FlatList, Dimensions} from 'react-native';

import HoldGridItem from '././HoldGridItem';

const HoldsGrid = (props) => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <FlatList
      data={props.holds}
      extraData={props.holds}
      numColumns={props.numOfColumns}
      renderItem={(itemData) => {
        return (
          <HoldGridItem
            width={windowWidth / props.numOfColumns}
            color={itemData.item.state ? 'green' : 'white'}
            id={itemData.item.id}
            onSelect={props.onSelect}
          />
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default HoldsGrid;
