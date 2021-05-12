import React, { FC } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';

import { colors } from 'constants/colors';

import { perfectSize } from 'helpers/perfectSize';
import { FooterSpinnerProps } from './FooterSpinner.types';

const { width, height } = Dimensions.get('window');

const FooterSpinner: FC<FooterSpinnerProps> = ({ loading }) => {
  if (!loading) {
    return (
      <View
        style={{
          height: perfectSize(30),
        }}
      />
    );
  }

  return (
    <View
      style={{
        position: 'relative',
        width,
        height,
        paddingVertical: perfectSize(20),
        marginTop: perfectSize(10),
        marginBottom: perfectSize(10),
      }}
    >
      <ActivityIndicator animating size="large" color={ colors.greenBtn } />
    </View>
  );
};

export default FooterSpinner;
