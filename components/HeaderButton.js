import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-ionicons';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Icon}
      iconSize={23}
      color={'black'}
    />
  );
};

export default CustomHeaderButton;
