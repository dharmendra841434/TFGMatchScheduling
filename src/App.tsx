import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';
import StackNavigator from './navigations/StackNavigator';
import {store} from './reduxManagment/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
