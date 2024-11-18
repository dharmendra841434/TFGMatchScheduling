import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {appColors} from '../utils/appColors';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setScheduledMatchList} from '../reduxManagment/splice/appSlice';

const HomePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('scheduledMatch');
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (data !== null) {
        //   console.log(data, 'list');
        dispatch(setScheduledMatchList(data));
      }
    } catch (e) {
      console.error('Error retrieving data:', e);
      return null;
    }
  }, []);
  useEffect(() => {
    getData();
    //console.log(scheduledList, 'Sclist');
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={appColors.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Schedule Match</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: '2%',
          columnGap: 6,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '5%',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('newSchedule')}
          activeOpacity={0.6}
          style={styles.button}>
          <Icon name="calendar" size={56} color={appColors.secondry} />
          <Text style={{color: appColors.secondry}}>Schedule new match</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('list')}
          activeOpacity={0.6}
          style={styles.button}>
          <Icon2 name="list" size={40} color={appColors.secondry} />
          <Text style={{color: appColors.secondry, marginTop: 5}}>
            Your Scheduled Matchs
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: appColors.primary,
    height: '10%',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  title: {
    color: appColors.secondry,
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: appColors.primary,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});

export default HomePage;
