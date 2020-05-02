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
import mainReducer from './store/reducers/mainReducer';
import gridReducer from './store/reducers/gridReducer';
import AppNavigatior from './navigation/AppNavigator';

const rootReducer = combineReducers({main: mainReducer, grid: gridReducer});

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
