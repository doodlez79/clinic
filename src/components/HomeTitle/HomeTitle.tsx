import React, { FC } from 'react';
import { View } from 'react-native';

import { Typography } from 'components/Typography';
import { HomeTitleProps } from './HomeTitle.types';

const HomeTitle: FC<HomeTitleProps> = ({ title }) => (
  <View>
    <Typography text={ title } fontSize={ 22 } color="#333" />
  </View>
);

export default HomeTitle;
