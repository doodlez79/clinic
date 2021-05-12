import React, { FC } from 'react';
import { View } from 'react-native';

import { BadgeProps } from './Badge.types';
import { styles } from './styles';

const Badge: FC<BadgeProps> = ({ left = 7, color = '#f25657' }) => (
  <View style={{ ...styles.badge, left, backgroundColor: color }} />
);

export default Badge;
