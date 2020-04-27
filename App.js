/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import BluethoothModule, {BTCharsets} from 'react-native-bluetooth-classic';
import rootReducer from './store/reducers/appReducer';
import AppNavigatior from './navigation/AppNavigator';

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
