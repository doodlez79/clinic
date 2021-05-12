import React, { FC, useEffect, useRef } from 'react';
import {
  Alert,
  View,
  Animated,
  Easing,
  Platform,
  SafeAreaView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import { OnBoardingFooterContent } from 'components/OnBoardingFooterContent';
import Fono from 'Icons/Fono.svg';
import Shadow from 'Icons/Shadow.svg';
import { Actions } from 'ducks';
import { MainStackParamList } from 'navigation/Navigation.types';
import { GeoLocationService } from 'services';
import { perfectSize } from 'helpers/perfectSize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface FirstOnBoardingScreenProps extends StackScreenProps<MainStackParamList, 'FirstScreen'>{}

const FirstOnBoardingScreen: FC<FirstOnBoardingScreenProps> = ({
  navigation,
}) => {
  const animationUpDown = useRef(new Animated.Value(0)).current;
  const shadowAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const getPermissionMap = async () => {
    const status = await GeoLocationService.getPermissionLocation();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    } else {
      navigation.replace('SecondScreen');

      const locationCurrent = await GeoLocationService.getCurrentLocation();
      dispatch(Actions.Misc.setLocations(locationCurrent));
    }
  };
  const runAnimationShadow = () => {
    shadowAnim.setValue(0);
    Animated.loop(
      Animated.timing(shadowAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const runAnimation = () => {
    animationUpDown.setValue(0);
    Animated.loop(
      Animated.timing(animationUpDown, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ).start();
  };

  useEffect(() => {
    runAnimation();
    runAnimationShadow();
  }, [ animationUpDown ]);

  const safeAreaInsets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{
      paddingTop: Platform.OS === 'ios' ? 0 : safeAreaInsets.top,
      paddingBottom: safeAreaInsets.bottom,
      flex: 1,
    }}
    >
      <View style={{ paddingHorizontal: perfectSize(32), flex: 1 }}>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: perfectSize(70),
            }}
          >
            <Animated.View
              style={{
                width: '100%',
                zIndex: 1000,
                transform: [
                  {
                    translateY: animationUpDown.interpolate({
                      inputRange: [ 0, 0.5, 1 ],
                      outputRange: [ 0, 30, 0 ],
                    }),
                  },
                ],
              }}
            >
              <View
                style={{
                  width: '100%',
                }}
              >
                <View style={{
                  width: perfectSize(180), height: perfectSize(207),
                }}
                >
                  <Fono />
                </View>
              </View>
            </Animated.View>
            <Animated.View
              style={{
                width: '100%',
                height: 40,
                marginTop: 20,
                transform: [
                  {
                    scaleX: shadowAnim.interpolate({
                      inputRange: [ 0, 0.5, 1 ],
                      outputRange: [ 0.8, 1, 0.8 ],
                    }),
                  },
                ],
              }}
            >
              <View style={{ width: perfectSize(180), height: perfectSize(18) }}>
                <Shadow />
              </View>
            </Animated.View>
          </View>

          <OnBoardingFooterContent
            title="Записаться на прием"
            textBtn="Далее"
            linkPress={ () => navigation.replace('SecondScreen') }
            onPress={ getPermissionMap }
            currentScreen={ 1 }
            text="Мы можем помочь Вам выбрать ближайший медицинский центр. Для этого нам необходимо
                  разрешение на доступ к Вашей геопозиции"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FirstOnBoardingScreen;
