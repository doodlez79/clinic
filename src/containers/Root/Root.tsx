import React, {
  useEffect, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Subscription } from '@unimodules/core';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { Actions, Selectors } from 'ducks';

import { NavigationApp } from 'navigation/Navigation';
import { Notification, NotificationResponse } from 'expo-notifications';
import { PathByType } from 'components/Notification/Notification';
import { NavigationContainerRef } from '@react-navigation/native';
import { TYPE_NOTIFICATION } from 'ducks/Notifications/Notifications.types';
import { useAssets } from 'expo-asset';
import { AppNavigationConfig } from 'constants/configAppNavigation';
import NetInfo from '@react-native-community/netinfo';
import { API } from 'services';

import { ErrorState } from 'components/ErrorState';

export const navigationRef = React.createRef<NavigationContainerRef>();

const Root = () => {
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  const dispatch = useDispatch();
  const appInit = useSelector(Selectors.App.isInitialized);
  const isFirstEnter = useSelector(Selectors.App.isFirstEnter);
  const isConnection = useSelector(Selectors.App.isConnection);

  const [ fontsLoaded ] = useFonts({
    'OpenSans-Regular': require('../../../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('../../../assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-Bold': require('../../../assets/fonts/OpenSans-Bold.ttf'),
  });

  const iconsMap = AppNavigationConfig.map(el => el.resolveIcon());

  const [ assets ] = useAssets(iconsMap);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      API.hasNetworkConnection(state.isConnected);
      dispatch(Actions.App.appNetwork(state.isConnected));
    });

    if (notificationListener) {
      notificationListener.current = Notifications.addNotificationReceivedListener(
        (notification:Notification) => {
          const { request: { content: { data: { type } } } } = notification;
          if (type === TYPE_NOTIFICATION.BONUS) {
            dispatch(
              Actions.Bonuses.checkBonuses.request(1),
            );
          }
          dispatch(
            Actions.Notification.getNotifications.request(),
          );
        },
      );
    }
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response:NotificationResponse) => {
        const { notification: { request: { trigger, content } } } = response;

        if (trigger.type === 'push') {
          if (navigationRef && navigationRef.current && content.data) {
            if (PathByType[content.data.type as string]) {
              navigationRef.current!.navigate(
                PathByType[content.data.type as string],
                { id: content.data.entityId },
              );
            } else {
              navigationRef.current!.navigate('Notifications');
            }
          }
        }
      },
    );

    return () => {
      unsubscribe();
      if (notificationListener && notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }

      if (responseListener && responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const isReadyApp = appInit && fontsLoaded && assets;

  useEffect(() => {
    if (isReadyApp) {
      SplashScreen.hideAsync().then(() => { });
    }
  }, [ isReadyApp ]);

  if (!isReadyApp) {
    return null;
  }

  return (
    <>
      <ErrorState isConnection={ isConnection } />
      <SafeAreaProvider initialMetrics={ initialWindowMetrics }>
        <NavigationApp firstVisit={ isFirstEnter } refProps={ navigationRef } />
      </SafeAreaProvider>
    </>
  );
};

export default Root;
