import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';

import { colors } from 'constants/colors';
import { Typography } from 'components/Typography';
import { alignTextConfig } from 'components/Typography/Typography.types';
import DateNotification from 'Icons/DateNotification.svg';
import { perfectSize } from 'helpers/perfectSize';
import { TYPE_NOTIFICATION } from 'ducks/Notifications/Notifications.types';
import { styles } from './styles';

export interface NotificationProps {
  newNotification: boolean;
  time: string;
  id: string;
  type: TYPE_NOTIFICATION
  idInformation?: string
  title?: string | null;
  description?: string | null;
}

export const PathByType: {[n: string]: string} = {
  [TYPE_NOTIFICATION.PROMOTION]: 'Promo/Detail',
  [TYPE_NOTIFICATION.POST]: 'News/Detail',
  [TYPE_NOTIFICATION.BONUS]: 'Balance',
};

const Notification: FC<NotificationProps> = ({
  title,
  description,
  time,
  newNotification,
  type,
  idInformation,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={ newNotification ? 1 : 0.5 }
      onPress={ () => {
        if (PathByType[type]) {
          navigation.navigate(PathByType[type], { id: idInformation });
        }
      } }
      style={{
        ...styles.container,
      }}
    >
      <View>
        {Boolean(title) && title && (
          <Typography
            text={ title }
            fontSize={ 17 }
            mb={ 2 }
            color={ newNotification ? colors.green : '#999999' }
            align={ alignTextConfig.LEFT }
          />
        )}
        {Boolean(description) && description && (
          <Typography
            regular
            fontSize={ 13 }
            align="left"
            color={ newNotification ? '#333333' : '#999999' }
            mb={ 12 }
            text={ description }
          />
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: perfectSize(18),
              marginRight: perfectSize(5),
            }}
          >
            <DateNotification
              strokeProps={ newNotification ? colors.green : '#999999' }
            />
          </View>

          <Text style={ styles.date }>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notification;
