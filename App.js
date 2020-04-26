/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import BluethoothModule from 'react-native-bluetooth-classic';
import rootReducer from './store/reducers/appReducer';
import AppNavigatior from './navigation/AppNavigator';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(ReduxThunk.withExtraArgument(BluethoothModule)),
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
