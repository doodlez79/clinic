import React, { FC } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';

import { OnBoardingFooterContent } from 'components/OnBoardingFooterContent';
import Date from 'Icons/Date.svg';
import { Typography } from 'components/Typography';
import Shadow from 'Icons/Shadow.svg';
import { MainStackParamList } from 'navigation/Navigation.types';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useDispatch } from 'react-redux';
import { Actions } from 'ducks';
import { PushNotificationService } from 'services';
import { perfectSize } from 'helpers/perfectSize';

export interface SecondOnBoardingScreenProps extends StackScreenProps<MainStackParamList, 'SecondScreen'>{}

const SecondOnBoardingScreen: FC<SecondOnBoardingScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const getPermissionNotification = async () => {
    const status = await PushNotificationService.requestPermission();
    if (status !== 'granted') {
      navigation.replace('ThirdScreen');
    } else {
      dispatch(Actions.Notification.notificationInit.request());
      navigation.replace('ThirdScreen');
    }
  };

  const safeAreaInsets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: safeAreaInsets.bottom }}>
      <View style={{ paddingHorizontal: perfectSize(32), flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              width: '100%',
            }}
          >
            <View>
              <View
                style={{
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: '#f9f9f9',
                  padding: perfectSize(20),
                  marginBottom: perfectSize(40),
                  marginTop: perfectSize(107),
                }}
              >
                <Typography
                  text="Ваши анализы готовы"
                  color="#1DBAB8"
                  align="left"
                  mb={ 15 }
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Date strokeProps="#1DBAB8" />
                  <Typography
                    text="Сейчас"
                    color="#1DBAB8"
                    align="left"
                    ml={ 5 }
                    fontSize={ 10 }
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: -22,
                    left: '15%',
                    width: '90%',
                    backgroundColor: '#E1F6F6',
                    height: 20,
                    borderBottomRightRadius: 12,
                    borderBottomLeftRadius: 12,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                width: 180,
                height: 40,
                marginTop: 0,
              }}
            >
              <Shadow />
            </View>
          </View>
          <OnBoardingFooterContent
            title="Получать уведомления"
            textBtn="Далее"
            onPress={ getPermissionNotification }
            linkPress={ () => navigation.replace('ThirdScreen') }
            currentScreen={ 2 }
            text="Вы можете получать уведомления о новых акциях и готовности результатов анализов.
                 Для этого разрешите нам отправку уведомлений"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SecondOnBoardingScreen;
