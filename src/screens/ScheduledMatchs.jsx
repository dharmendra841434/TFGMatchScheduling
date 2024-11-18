import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../utils/appColors';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {convertTo12HourFormat, storeData} from '../utils/helper';
import CustomModal from '../components/CustomModal';
import CustomButton from '../components/CustomButton';
import {setScheduledMatchList} from '../reduxManagment/splice/appSlice';
import useLocalDatabase from '../utils/useLocalDatabase';

const ScheduledMatchs = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [docId, setDocId] = useState('');
  const { items, loading, addItem, updateItem, deleteItem, refreshItems } =useLocalDatabase()
  

  useEffect(() => {
    const refreshData = async()=>{
     await refreshItems()
    }
    refreshData()
  }, [loading])
  
const handleDelete=()=>{
  deleteItem(docId).then(()=>{
    setDocId("")
    dispatch(setScheduledMatchList(items))
  })
 
}

console.log(items,"cvfhrtht");

  return (
    <View style={styles.screen}>
      <CustomModal modalVisible={docId === '' ? false : true}>
        <View
          style={{
            backgroundColor: appColors.secondry,
            padding: 10,
            alignItems: 'center',
            borderRadius: 4,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: appColors.primary,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Are You sure to Delete Schedule?
          </Text>
          <View style={styles.popupContainer}>
            <CustomButton
              title="Ok"
              onPress={handleDelete}
              style={{
                backgroundColor: appColors.appRed,
                paddingHorizontal: '15%',
              }}
            />
            <CustomButton onPress={() => setDocId('')} title="Cancel" />
          </View>
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
        <Text style={styles.title}>Schedule List</Text>
      </View>
      <View style={{padding: 8, height: '90%'}}>
        {loading?<ActivityIndicator/>:<FlatList
          data={items?.flat()}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View key={index} style={styles.card}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: appColors.primary,
                  fontSize: 20,
                  textTransform: 'capitalize',
                }}>
                {item?.matchName}
              </Text>
              <View style={styles.detailContainer}>
                <Text
                  style={{
                    color: appColors.appBlack,
                    textTransform: 'capitalize',
                  }}>
                  First Participent :{' '}
                </Text>
                <Text
                  style={{
                    color: appColors.appBlack,
                    textTransform: 'capitalize',
                  }}>
                  {item?.firstParticipent}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text
                  style={{
                    color: appColors.appBlack,
                    textTransform: 'capitalize',
                  }}>
                  Second Participent :{' '}
                </Text>
                <Text
                  style={{
                    color: appColors.appBlack,
                    textTransform: 'capitalize',
                  }}>
                  {item?.secondParticipent}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text
                  style={{
                    color: appColors.appBlack,
                    textTransform: 'capitalize',
                  }}>
                  Match Day :{' '}
                </Text>
                <Text
                  style={{
                    color: appColors.appBlack,
                    textTransform: 'capitalize',
                  }}>
                  {item?.matchDay}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text
                  style={{
                    color: appColors.appBlack,
                    textTransform: 'capitalize',
                  }}>
                  Time Slot :{' '}
                </Text>
                {item?.timeSlot?.map((item2, index2) => (
                  <View key={index2}>
                    <Text
                      style={{
                        color: appColors.appBlack,
                        textTransform: 'capitalize',
                      }}>
                      {convertTo12HourFormat(item2)}
                    </Text>
                  </View>
                ))}
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  columnGap: 6,
                  paddingVertical: '3%',
                }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setDocId(item?.id)}
                  style={{
                    width: '50%',
                    backgroundColor: '#cf2932',
                    paddingVertical: 10,
                    borderRadius: 6,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: appColors.secondry}}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    navigation.navigate('update', {
                      schedule: item,
                    })
                  }
                  style={{
                    width: '50%',
                    backgroundColor: appColors.primary,
                    paddingVertical: 10,
                    borderRadius: 6,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: appColors.secondry}}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />}
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
    alignItems: 'center',
    paddingHorizontal: '3%',
    flexDirection: 'row',
    columnGap: 10,
  },
  title: {
    color: appColors.secondry,
    fontSize: 22,
  },
  card: {
    backgroundColor: '#e8e8ed',
    marginVertical: 6,
    alignItems: 'center',
    padding: 6,
    borderRadius: 7,
    elevation: 6,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
    marginVertical: 6,
    width: '50%',
  },
  popupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    columnGap: 10,
    marginTop: '10%',
  },
});

export default ScheduledMatchs;
