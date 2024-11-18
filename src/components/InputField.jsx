import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {appColors} from '../utils/appColors';

const InputField = ({title, placeholder, onChangeText, value}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#c2c2c2"
        onChangeText={onChangeText}
        value={value}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: appColors.primary,
    borderRadius: 6,
    marginVertical: '3%',
  },
  input: {
    paddingHorizontal: 10,
  },
  title: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: appColors.secondry,
    color: appColors.primary,
    paddingHorizontal: 6,
  },
});
export default InputField;
