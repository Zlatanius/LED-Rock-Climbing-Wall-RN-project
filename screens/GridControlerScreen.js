import React, {useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Switch,
  Text,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HoldsGrid from '../components/HoldsGrid';
import * as ledActions from '../store/actions/ledActions';
import HeaderButton from '../components/HeaderButton';

const GridControlerScreen = (props) => {
  const dispatch = useDispatch();
  const holds = useSelector((state) => state.leds.holds);
  const [isRgb, setIsRgb] = useState(
    !useSelector((state) => state.leds.ledType),
  );
  const [compHeight, setCompHeight] = useState();
  const [imagePath, setImagePath] = useState(
    'https://lh5.googleusercontent.com/71oz00aAN42OnSfaCAa6cN07kdge-W9d8CqR0l-HbL-4KBw5ygZ6bTR5gOIpUSvF8zGLosJddXMqmJNSZhCH=w1920-h937-rw',
  );

  const tmpImage = {
    uri: imagePath,
  };

  const idToCoords = (id) => {
    const y = -(Math.floor(id / 11) - 17);
    const x = id - Math.floor(id / 11) * 11;
    return {x, y};
  };

  const selectHandler = (holdId) => {
    dispatch(ledActions.toggleHold(holdId));
  };

  const resetHandler = () => {
    dispatch(ledActions.resetLeds());
  };

  const switchToggleHandler = () => {
    dispatch(ledActions.changeLedType());
    setIsRgb(!isRgb);
  };

  const pickBoulderHandler = () => {
    ImagePicker.openPicker({
      width: 1100,
      height: 1800,
      cropping: true,
    }).then((image) => {
      setImagePath(image.path);
    });
  };

  return (
    <View style={styles.mainContianer}>
      <View style={styles.switchContainer}>
        <Switch
          style={styles.switch}
          value={isRgb}
          onValueChange={switchToggleHandler}
        />
        <Text>Using RGB</Text>
      </View>
      <View
        style={styles.imageStyle}
        onLayout={(event) => {
          setCompHeight(event.nativeEvent.layout.height);
        }}>
        <ImageBackground
          source={tmpImage}
          style={styles.imageStyle}
          imageStyle={{resizeMode: 'stretch'}}>
          <HoldsGrid
            numOfColumns={11}
            onSelect={selectHandler}
            holds={holds}
            holdItemHeight={compHeight}
          />
        </ImageBackground>
      </View>
      <Text>
        {'L' +
          holds
            .reduce((holdsString, currHold) => {
              let newHolds = holdsString;
              if (currHold.state) {
                newHolds = `${idToCoords(currHold.id).x} ${
                  idToCoords(currHold.id).y
                } ${holdsString}`;
              }
              return newHolds;
            }, '')
            .trimEnd() +
          '|'}
      </Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="RESET" onPress={resetHandler} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="PICK BOULDER"
          onPress={pickBoulderHandler}
        />
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Grid Controller',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={'md-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  mainContianer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  switchContainer: {
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
  },
  switch: {},
  buttonContainer: {
    height: '10%',
    justifyContent: 'space-around',
  },
  imageStyle: {
    width: '100%',
    // height: '60%',
    flex: 1,
  },
});

export default GridControlerScreen;
