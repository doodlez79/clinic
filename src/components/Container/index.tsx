import React from 'react';
import { View } from 'react-native';

import { perfectSize } from 'helpers/perfectSize';

type Props = {
  paddingSize: number;
  mb?: number;
  flex?: number;
}

export const Container: React.FC<Props> = ({
  children,
  paddingSize = 8,
  mb = 0,
  flex = 0,
}) => (
  <View style={{ flex, paddingHorizontal: perfectSize(2 * paddingSize), marginBottom: perfectSize(mb) }}>
    { children }
  </View>
);
