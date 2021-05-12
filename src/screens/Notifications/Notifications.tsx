import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import {
  Linking, Platform, View,
  AppState, ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Actions, Selectors } from 'ducks';
import { CloseBtn } from 'components/CloseBtn';
import { Title } from 'components/Title';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { colors } from 'constants/colors';
import { NotificationContent } from 'components/NotificationContent';
import { ContentNoAuth } from 'components/ContentNoAuth';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { PushNotificationService } from 'services';
import { compareDesc } from 'date-fns';
import { NotificationsProps } from './Notifications.types';

// const { RNAndroidOpenSettings } = NativeModules;

const Notifications: FC<NotificationsProps> = ({ navigation }) => {
  const isAuthorized = useSelector(Selectors.Auth.isAuthorized);
  const loading = useSelector(Selectors.Notifications.isLoading);
  const isConnected = useSelector(Selectors.App.isConnection);
  const [ statusNotifications, setStatusNotifications ] = useState('');
  const dispatch = useDispatch();
  const [ elemIdOnScroll, setElemIdOnScroll ] = useState<string[]>([]);
  const Notifications = useSelector(
    Selectors.Notifications.getNotificationsArray,
  );
  const sortNotifications = [ ...Notifications ].sort(a => {
    if (a.isNewNotification) {
      return -1;
    }
    return 1;
  }).sort((a, b) => compareDesc(a.createdAt, b.createdAt));

  const onRefresh = useCallback(() => {
    dispatch(Actions.Notification.getNotifications.request());
  }, []);

  const handlerStatusNotification = async () => {
    const status = await PushNotificationService.getPermissionNotifications();
    setStatusNotifications(status);
  };

  useFocusEffect(onRefresh);

  useEffect(() => {
    AppState.addEventListener('change', () => {
      handlerStatusNotification();
    });

    return AppState.removeEventListener('change', () => {
      // handlerStatusNotification();
    });
  }, []);

  useFocusEffect(useCallback(() => {
    (async () => {
      await handlerStatusNotification();
    })();
  }, []));

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (elemIdOnScroll.length > 0) {
        elemIdOnScroll.forEach(item => {
          dispatch(
            Actions.Notification.readNotification.request({ id: item }),
          );
        });
      }
    });
    return () => unsubscribe();
  }, [ navigation, elemIdOnScroll ]);

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      // console.log(NativeModules, "NativeModules")
      // RNAndroidOpenSettings();
    }
  };

  const setReadNotifications = useCallback(
    value => setElemIdOnScroll(s => Array.from(new Set(s.concat(value)))),
    [],
  );

  const AmountNewNotifications = Notifications.filter(el => el.isNewNotification)
    .length;

  const safeAreaInsets = useSafeAreaInsets();
  const renderNotificationContent = () => {
    if (statusNotifications !== 'granted') {
      return (
        <ContentNoAuth
          textBtn="Настройки"
          onClick={ openAppSettings }
          text="Необходимо пройти в настройки, чтобы начать получать уведомления "
        />
      );
    }
    if (isAuthorized) {
      return (
        <NotificationContent
          loading={ loading }
          onRefresh={ onRefresh }
          setElemIdOnScroll={ setReadNotifications }
          notifications={ sortNotifications }
        />
      );
    }
    return (
      <ContentNoAuth
        isConnected={ isConnected }
        onClick={ () => navigation.navigate('Auth') }
        text="Необходимо авторизоваться, чтобы начать получать уведомления"
      />
    );
  };

  return (
    <View style={{ paddingTop: safeAreaInsets.top }}>
      <Container paddingSize={ 8 }>
        <CloseBtn onClose={ () => navigation.navigate('Home') } />
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: 24,
            marginBottom: 20,
          }}
        >
          <Title title="Уведомления" />
          {isAuthorized && (
            <View
              style={{
                marginTop: 5,
              }}
            >
              <Typography
                color={ AmountNewNotifications > 0 ? colors.green : '#999' }
                text={ AmountNewNotifications > 0
                  ? `${AmountNewNotifications} нов${AmountNewNotifications === 1 ? 'ая' : 'ых'}`
                  : 'Нет новых' }
              />
            </View>
          )}
        </View>
      </Container>
      {
        statusNotifications !== ''
          ? renderNotificationContent()
          : <ActivityIndicator size="small" />
      }
    </View>
  );
};

export default Notifications;
