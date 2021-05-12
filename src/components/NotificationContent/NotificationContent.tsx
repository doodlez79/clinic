import React, { FC, useRef } from 'react';

import {
  View, FlatList, Platform, FlatListProps,
} from 'react-native';

import ProfileError from 'Icons/ProfileError.svg';
import { Typography } from 'components/Typography';
import { alignTextConfig } from 'components/Typography/Typography.types';
import Notification from 'components/Notification/Notification';

import { format, isValid } from 'date-fns';
import { NotificationContentType } from 'ducks/Notifications/Notifications.types';
import { Container } from 'components/Container';
import { perfectSize } from 'helpers/perfectSize';
import { NotificationContentProps } from './NotificationContent.types';

const NotificationContent: FC<NotificationContentProps> = ({
  notifications,
  setElemIdOnScroll,
  onRefresh,
  loading,
}) => {
  const onViewRef = useRef<
    FlatListProps<NotificationContentType>['onViewableItemsChanged']
  >(({ viewableItems }) => {
    const ids = viewableItems.reduce((acc: string[], { item }) => {
      if (item.isNewNotification) {
        acc = [ ...acc, item.id ];
      }
      return acc;
    }, [] as string[]);
    setElemIdOnScroll(ids);
  });

  return (
    <View>
      {notifications.length === 0 ? (
        <View
          style={{
            height: '60%',
            marginVertical: perfectSize(40),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ProfileError />
          <Typography
            color="#999"
            text="Вам ещё ни разу не приходили уведомления"
            align={ alignTextConfig.CENTER }
            style={{
              maxWidth: perfectSize(190),
            }}
            regular
            mt={ 10 }
            fontSize={ 13 }
          />
        </View>
      ) : (
        <View
          style={{
            height: '90%',
          }}
        >
          <FlatList
            onViewableItemsChanged={ onViewRef.current }
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            contentContainerStyle={{
              marginBottom: 50,
            }}
            refreshing={ loading }
            onRefresh={ onRefresh }
            data={ notifications }
            keyExtractor={ item => item.id }
            onEndReachedThreshold={ Platform.OS === 'ios' ? 0 : 0.5 }
            renderItem={ ({ item }) => (
              <Container paddingSize={ 8 }>
                <Notification
                  newNotification={ item.isNewNotification }
                  id={ item.id }
                  idInformation={ item.notification.entityId }
                  type={ item.notification.type }
                  title={ item.notification.title }
                  description={ item.notification.body }
                  time={ item.createdAt && isValid(item.createdAt) ? format(item.createdAt, 'dd-MM-yyyy HH:mm') : '' }
                />
              </Container>

            ) }
          />
        </View>
      )}
    </View>
  );
};

export default NotificationContent;
