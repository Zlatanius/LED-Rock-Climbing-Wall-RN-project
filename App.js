/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import BluethoothModule, {BTCharsets} from 'react-native-bluetooth-classic';
import bluethoothReducer from './store/reducers/bluethoothReducer';
import gridReducer from './store/reducers/gridReducer';
import ledReducer from './store/reducers/ledReducer';
import AppNavigatior from './navigation/AppNavigator';

const rootReducer = combineReducers({
  main: bluethoothReducer,
  grid: gridReducer,
  leds: ledReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({BluethoothModule, BTCharsets}),
    ),
  ),
);

const App = (props) => {
  return (
    <Provider store={store}>
      <AppNavigatior />
    </Provider>
  );
};

export default App;
