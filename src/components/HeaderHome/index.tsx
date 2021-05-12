import React from 'react';

import {
  View,
  ViewStyle,

  Text,

  TouchableOpacity,
} from 'react-native';

import ProfileMainIcon from 'Icons/ProfileMain.svg';

import { IconResize } from 'components/IconResize';
import { Typography } from 'components/Typography';
import { colors } from 'constants/colors';
import { perfectSize } from 'helpers/perfectSize';
import { styles } from './styles';

type Props = {
  style?: ViewStyle;
  profile?: any;
  openProfilePage: () => void;
  isConnection: boolean
}

const getPartOfDay = (date: Date = new Date()) => {
  const currentHour = date?.getHours() || 12;

  const segments = [ 5, 10, 17, 23 ];
  const cycleSegments = [ 0, ...segments, 24 ];

  const segment = cycleSegments.findIndex((startHour, index, hours) => {
    const endHour = hours[(index + 1) % hours.length];

    return (currentHour >= startHour && currentHour < endHour);
  });

  if (segment === 0 || segment === (cycleSegments.length - 1)) {
    return segments.length - 1;
  }

  return segment - 1;
};

const greetingByPartOfDay = [
  'Доброе утро',
  'Добрый день',
  'Добрый вечер',
  'Доброй ночи',
];

export const HeaderHome: React.FC<Props> = ({
  style,
  profile,
  openProfilePage,
}) => (

  <View style={ [ style, styles.container ] }>

    <View style={ styles.nameContainer }>

      <Text style={ styles.greeting }>
        { greetingByPartOfDay[getPartOfDay()] }
        { profile ? ',' : '' }
      </Text>
      { profile && (
        <Typography
          mt={ 10 }
          numberOfLines={ 1 }
          align="left"
          color={ colors.green }
          style={{ maxWidth: perfectSize(300) }}
          text={ [ profile?.name, profile?.patronymic ].join(' ').trim() }
        />
      )}
    </View>
    { profile && (
      <TouchableOpacity
        onPress={ openProfilePage }
      >
        <IconResize size={ 52 }>
          <ProfileMainIcon />
        </IconResize>
      </TouchableOpacity>
    ) }
  </View>
);
