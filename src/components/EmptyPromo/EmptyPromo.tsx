import React, { FC } from 'react';

import { View } from 'react-native';
import EmptyProm from 'Icons/EmptyPromo.svg';
import { Typography } from 'components/Typography';
import { IconResize } from 'components/IconResize';
import { perfectSize } from 'helpers/perfectSize';
import { styles } from './styles';

const EmptyPromo:FC = () => (
  <View style={ styles.container }>
    <View style={{
      marginRight: perfectSize(18),
    }}
    >
      <IconResize size={ 48 }>
        <EmptyProm />
      </IconResize>
    </View>
    <View>
      <Typography
        style={{
          maxWidth: perfectSize(220),
        }}
        regular
        fontSize={ 13 }
        color="#999999"
        align="left"
        text="Новые акции уже спешат к Вам! Они просто задержались в пути"
      />
    </View>

  </View>
);

export default EmptyPromo;
