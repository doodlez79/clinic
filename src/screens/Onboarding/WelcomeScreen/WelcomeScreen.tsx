import React, {
  FC, useCallback, useEffect, useRef,
} from 'react';
import { Animated, View } from 'react-native';

import { Typography } from 'components/Typography';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Actions } from 'ducks';
import { MainStackParamList } from 'navigation/Navigation.types';
import { perfectSize } from 'helpers/perfectSize';
import { GeoLocationService, PushNotificationService } from 'services';

export interface WelcomeScreenProps extends StackScreenProps<MainStackParamList, 'WelcomeScreen'>{}

const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const checkPermissions = async () => {
    const locationStatus = await GeoLocationService.hasPermissionLocation();
    const notificationsStatus = await PushNotificationService.getPermissionNotifications();
    if (locationStatus !== 'undetermined' && notificationsStatus !== 'undetermined') {
      navigation.replace('ThirdScreen');
    } else navigation.replace('FirstScreen');
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(Actions.App.firstEnter());
      dispatch(Actions.Misc.getMiscAll());
    }, []),
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => checkPermissions());
  }, [ fadeAnim ]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: perfectSize(70),
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fadeAnim,
          transform: [
            {
              scaleX: fadeAnim.interpolate({
                inputRange: [ 0, 1 ],
                outputRange: [ 1, 1.5 ],
              }),
            },
            {
              scaleY: fadeAnim.interpolate({
                inputRange: [ 0, 1 ],
                outputRange: [ 1, 1.5 ],
              }),
            },
          ],
        }}
      >
        <Typography
          text="Добро пожаловать!"
          fontSize={ 28 }
          color="#9DCD4B"
        />
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;
