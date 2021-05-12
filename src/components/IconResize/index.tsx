import React from 'react';
import { View } from 'react-native';

import { perfectSize } from 'helpers/perfectSize';

type Props = {
  size: number
}

export const IconResize: React.FC<Props> = ({ children, size }) => (
  <View style={{ width: perfectSize(size), aspectRatio: 1 }}>
    { children }
  </View>
);
