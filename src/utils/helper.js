import AsyncStorage from '@react-native-async-storage/async-storage';

export function convertTo12HourFormat(time24) {
  // Splitting the time into hours and minutes
  const [hours, minutes] = time24.split(':').map(Number);

  // Determining AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Converting hours to 12-hour format
  let hours12 = hours % 12;
  hours12 = hours12 || 12; // If hours is 0, it should be 12 for 12-hour format

  // Formatting minutes with leading zero if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Constructing the 12-hour format string
  const time12 = `${hours12}:${formattedMinutes} ${period}`;

  return time12;
}

export function removeItemFromArray(array, itemToRemove) {
  const index = array?.indexOf(itemToRemove);
  if (index !== -1) {
    array?.splice(index, 1);
  }
  return array;
}

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data:', e);
  }
};
