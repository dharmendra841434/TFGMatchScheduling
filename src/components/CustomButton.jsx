import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {appColors} from '../utils/appColors';

const CustomButton = ({title, style, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.conatiner, style]}>
      <Text style={{color: appColors.secondry, textTransform: 'capitalize'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: appColors.primary,
    paddingHorizontal: '10%',
    paddingVertical: 7,
    borderRadius: 4,
  },
});

export default CustomButton;
