import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {appColors} from '../utils/appColors';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import InputField from '../components/InputField';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomModal from '../components/CustomModal';
import {timeSlot} from '../utils/timeSlot';
import {convertTo12HourFormat, storeData} from '../utils/helper';
import {useSelector, useDispatch} from 'react-redux';
import {setScheduledMatchList} from '../reduxManagment/splice/appSlice';
import useLocalDatabase from '../utils/useLocalDatabase';

const UpdateSchedule = props => {
  const schedule_data = props?.route?.params?.schedule;
  const [modalVisible, setModalVisible] = useState(false);
  const [isOpenTimeSlotModal, setIsOpenTimeSlotModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(schedule_data?.matchDay);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    schedule_data?.timeSlot,
  );
  const [match, setMatch] = useState(schedule_data?.matchName);
  const [participent1, setParticipent1] = useState(
    schedule_data?.firstParticipent,
  );
  const [participent2, setParticipent2] = useState(
    schedule_data?.secondParticipent,
  );
  const scheduledList = useSelector(state => state.app.scheduledList);
  const dispatch = useDispatch();
  const {  updateItem ,items,refreshItems} =useLocalDatabase()

  //console.log(schedule_data, 'updfat');

  const navigation = useNavigation();
  console.log(scheduledList);
  const getDayName = date => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const selectedDate = new Date(date);
    const dayName = days[selectedDate.getDay()];
    setModalVisible(false);
    setSelectedDay(dayName);
    setSelectedTimeSlot([]);
  };

  const openCalendar = () => {
    setModalVisible(true);
  };

  const closeCalendar = () => {
    setModalVisible(false);
  };

  const openTimeSlotModal = () => {
    setIsOpenTimeSlotModal(true);
  };

  const closeTimeSlotModal = () => {
    setIsOpenTimeSlotModal(false);
  };

  //console.log(scheduledList, 'new sched');

  const HandleSubmit = () => {
    if (
      [match, participent1, participent2, selectedDay].some(v => v === '') ||
      selectedTimeSlot?.length === 0
    ) {
      return alert('All Fields are Required!!');
    }
    const matchScheduleData ={
      id: schedule_data?.id,
      matchName: match,
      firstParticipent: participent1,
      secondParticipent: participent2,
      matchDay: selectedDay,
      timeSlot: selectedTimeSlot,
    }
    updateItem(schedule_data?.id,matchScheduleData)
    ToastAndroid.showWithGravity(
      ` Match Scheduled on ${selectedDay}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    setMatch('');
    setParticipent1('');
    setParticipent2('');
    setSelectedDay('');
    setSelectedTimeSlot([]);
    refreshItems()
    navigation.goBack();
   };

  return (
    <View style={styles.screen}>
      <CustomModal modalVisible={modalVisible} onRequestClose={closeCalendar}>
        <>
          <Calendar
            onDayPress={day => getDayName(day.dateString)}
            hideArrows={true}
          />
          <Button title="Close" onPress={closeCalendar} />
        </>
      </CustomModal>
      <CustomModal
        modalVisible={isOpenTimeSlotModal}
        onRequestClose={closeTimeSlotModal}>
        <View
          style={{
            backgroundColor: appColors.secondry,
            padding: '10%',
            position: 'relative',
          }}>
          <TouchableOpacity
            onPress={() => setIsOpenTimeSlotModal(false)}
            style={{position: 'absolute', right: 8, top: 8}}>
            <Icon name="close" size={25} color={appColors.appGray} />
          </TouchableOpacity>
          {timeSlot
            ?.filter((item, index) => item.day === selectedDay)
            ?.map((item, index) => (
              <View key={index}>
                {item?.slot?.map((item2, index2) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (!selectedTimeSlot?.includes(item2)) {
                        setSelectedTimeSlot([...selectedTimeSlot, item2]);
                        setIsOpenTimeSlotModal(false);
                        return;
                      }
                      alert('This Time Slot Already Selected');
                    }}
                    key={index2}
                    style={{paddingVertical: 6, alignItems: 'center'}}>
                    <Text
                      style={{
                        color: selectedTimeSlot?.includes(item2)
                          ? appColors.appGray
                          : appColors.primary,
                        fontSize: 17,
                      }}>
                      {convertTo12HourFormat(item2)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
        </View>
      </CustomModal>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon2
            size={20}
            name="arrow-back-ios-new"
            color={appColors.secondry}
          />
        </TouchableOpacity>
        <Text style={styles.title}>New Schedule</Text>
      </View>
      <ScrollView>
        <View style={{paddingVertical: '5%', paddingHorizontal: '3%'}}>
          <InputField
            onChangeText={m => setMatch(m)}
            title="Match"
            placeholder="Match Name"
            value={match}
          />
          <InputField
            onChangeText={m => setParticipent1(m)}
            title="Participent 1"
            placeholder="Participent 1 Name"
            value={participent1}
          />
          <InputField
            onChangeText={m => setParticipent2(m)}
            title="Participent 2"
            placeholder="Participent 2 Name"
            value={participent2}
          />
          <TouchableOpacity
            onPress={() => openCalendar()}
            activeOpacity={0.6}
            style={styles.button}>
            <Icon2 name="event-note" size={35} color={appColors.primary} />
            <Text style={{color: appColors.primary, fontSize: 16}}>
              {selectedDay === '' ? 'Select Day' : selectedDay}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openTimeSlotModal()}
            activeOpacity={0.6}
            disabled={selectedDay == '' ? true : false}
            style={{
              ...styles.button,
              borderColor:
                selectedDay == '' ? appColors.appGray : appColors.primary,
            }}>
            <Icon
              name="timer"
              size={35}
              color={selectedDay == '' ? appColors.appGray : appColors.primary}
            />
            <Text
              style={{
                color:
                  selectedDay == '' ? appColors.appGray : appColors.primary,
                fontSize: 16,
              }}>
              {` ${
                selectedDay === ''
                  ? `First Select Match Day`
                  : `Select Time Slot For ${selectedDay}`
              } `}
            </Text>
          </TouchableOpacity>
          <View style={{marginTop: 6}}>
            <Text style={{color: appColors.primary}}>Match Time Slots</Text>
            {selectedTimeSlot?.length > 0 && (
              <View style={{marginTop: 6}}>
                <FlatList
                  data={selectedTimeSlot}
                  renderItem={({item, index}) => (
                    <View key={index} style={styles.slotList}>
                      <Text style={{color: appColors.secondry}}>
                        Match on {selectedDay} at {convertTo12HourFormat(item)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          let arr = [...selectedTimeSlot];
                          const index = arr?.indexOf(item);
                          if (index !== -1) {
                            arr?.splice(index, 1);
                          }
                          setSelectedTimeSlot(arr);
                        }}>
                        <Icon2 name="delete" color="red" size={22} />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => HandleSubmit()}
        style={styles.scheduleButton}>
        <Text
          style={{
            fontWeight: 'bold',
            color: appColors.secondry,
            fontSize: 20,
          }}>
          Schedule Match
        </Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: '3%',
    flexDirection: 'row',
    columnGap: 10,
  },
  title: {
    color: appColors.secondry,
    fontSize: 22,
  },
  button: {
    flexDirection: 'row',
    borderColor: appColors.primary,
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 20,
    marginVertical: '4%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotList: {
    backgroundColor: appColors.primary,
    paddingVertical: 12,
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  scheduleButton: {
    backgroundColor: appColors.primary,
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    left: 4,
    right: 4,
    bottom: 0,
  },
});

export default UpdateSchedule;
