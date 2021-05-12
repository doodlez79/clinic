import React, { FC } from 'react';

import { View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { colors } from 'constants/colors';
import { Typography } from 'components/Typography';
import { perfectSize } from 'helpers/perfectSize';

export interface ErrorFieldProps {
  text?: string;
}

const ErrorField: FC<ErrorFieldProps> = ({ text }) => (
  <View
    style={{
      left: 0,
      marginLeft: perfectSize(8),
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <MaterialIcons name="error-outline" color={ colors.red } size={ perfectSize(16) } />
    <Typography
      style={{
        fontSize: 10,
        marginLeft: 5,
        color: colors.red,
      }}
      regular
      fontSize={ 10 }
      ml={ 5 }
      color={ colors.red }
      text={ text }
    />
  </View>
);

export default ErrorField;
