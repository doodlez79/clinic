import React, { FC } from 'react';

import { View } from 'react-native';

import { Typography } from 'components/Typography';
import { TextFieldProps } from './TextField.types';
import { styles } from './styles';

const TextField: FC<TextFieldProps> = ({ text, label }) => (
  <View style={{ marginBottom: 20 }}>
    <Typography
      style={ styles.label }
      text={ label }
      align="left"
      ml={ 8 }
      color="#999999"
    />
    <Typography style={ styles.text } text={ text } align="left" ml={ 8 } />
  </View>
);

export default TextField;
