import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import ScheduleScreen from '../screens/ScheduleScreen';
import ScheduledMatchs from '../screens/ScheduledMatchs';
import UpdateSchedule from '../screens/UpdateSchedule';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="home" component={HomePage} />
        <Stack.Screen name="newSchedule" component={ScheduleScreen} />
        <Stack.Screen name="list" component={ScheduledMatchs} />
        <Stack.Screen name="update" component={UpdateSchedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
