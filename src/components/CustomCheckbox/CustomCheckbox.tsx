import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Accept from 'Icons/Accept.svg';

import { CustomCheckboxProps } from './CustomCheckbox.types';
import { styles } from './styles';

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  text,
  disabled,
  onChange,
  value,
}) => (
  <TouchableOpacity
    style={ styles.checkboxContainer }
    onPress={ onChange }
    disabled={ disabled }
  >
    <View style={ styles.checkbox }>
      {value && <Accept />}
    </View>
    <Text style={ disabled ? { ...styles.text, color: '#999' } : styles.text }>
      {text}
    </Text>
  </TouchableOpacity>
);

export default CustomCheckbox;
