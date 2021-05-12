import React, { FC } from 'react';

import { View, TouchableOpacity } from 'react-native';

import { CustomDrawerItemProps } from 'components/CustomDrawerItem/CustomDrawerItem.types';
import RightArrow from 'Icons/RightArrow.svg';
import { Typography } from 'components/Typography';
import { perfectSize } from 'helpers/perfectSize';
import { styles } from './styles';

const CustomDrawerItem: FC<CustomDrawerItemProps> = ({
  icon,
  title,
  customElem,
  onPress,
}) => (
  <TouchableOpacity
    style={{
      ...styles.DrawerItem,
    }}
    onPress={ onPress }
  >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={ styles.icon }>{icon()}</View>
        <Typography
          color="#333"
          text={ title }
          regular
          style={{
            paddingLeft: perfectSize(17),
          }}
        />
      </View>
      {customElem}
      <RightArrow strokeProps="#999" />
    </View>
  </TouchableOpacity>
);

export default CustomDrawerItem;
