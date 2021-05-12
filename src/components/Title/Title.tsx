import React, { FC } from 'react';
import { View, Text } from 'react-native';

import { perfectSize } from 'helpers/perfectSize';
import { TitleProps } from './Title.types';
import { styles } from './styles';

const Title: FC<TitleProps> = ({ title, fontSizeCount = perfectSize(28) }) => (
  <View>
    <Text style={ [ styles.title, { fontSize: fontSizeCount }] }>
      { title }
    </Text>
  </View>
);

export default Title;
