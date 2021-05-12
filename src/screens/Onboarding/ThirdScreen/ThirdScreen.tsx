import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import {
  Animated, View,
} from 'react-native';

import { OnBoardingFooterContent } from 'components/OnBoardingFooterContent';
import { StackScreenProps } from '@react-navigation/stack';
import Shadow from 'Icons/Shadow.svg';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from 'components/CardAuth/styles';
import { Typography } from 'components/Typography';
import { AntDesign } from '@expo/vector-icons';
import { useCountUp } from 'use-count-up';
import { CloseBtn } from 'components/CloseBtn';
import { MainStackParamList } from 'navigation/Navigation.types';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { perfectSize } from 'helpers/perfectSize';

export interface ThirdScreenProps extends StackScreenProps<MainStackParamList, 'SecondScreen'>{}

const ThirdOnBoardingScreen: FC<ThirdScreenProps> = ({ navigation }) => {
  const shadowAnim = useRef(new Animated.Value(0)).current;
  const animationUpDown = useRef(new Animated.Value(0)).current;
  const [ startCountUp, setStartCouting ] = useState(false);

  const { value } = useCountUp({
    isCounting: startCountUp,
    end: 9999,
    start: 0,
    duration: 2,
    easing: 'easeOutCubic',
  });

  const runAnimation = () => {
    Animated.parallel([
      Animated.timing(animationUpDown, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(shadowAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStartCouting(true);
    });
  };

  useEffect(() => {
    runAnimation();
  }, [ runAnimation ]);

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: safeAreaInsets.bottom }}>
      <View style={{ paddingHorizontal: perfectSize(32), flex: 1 }}>
        <CloseBtn onClose={ () => navigation.replace('Main') } />
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
            <Animated.View
              style={{
                height: perfectSize(147),
                width: perfectSize(226),
                borderRadius: 20,
                marginTop: 78,
                justifyContent: 'space-around',
                transform: [
                  {
                    translateY: animationUpDown.interpolate({
                      inputRange: [ 0, 1 ],
                      outputRange: [ -25, 0 ],
                    }),
                  },
                ],
              }}
            >
              <LinearGradient
                colors={ [ '#3BC6C3', '#00BAB8' ] }
                style={ styles.linerGradient }
              />
              <LinearGradient
                colors={ [ 'rgba(255,255,255,1)', 'rgba(255,255,255,0)' ] }
                style={{
                  ...styles.linerGradient,
                  zIndex: 101,
                  opacity: 0.58,
                }}
                start={{ x: 0.09, y: 0.09 }}
              />
              <View
                style={{
                  zIndex: 99999,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 24,
                }}
              >
                <Typography
                  fontSize={ 32 }
                  color="white"
                  text={ value ? value.toString() : '0' }
                />
                <AntDesign name="heart" color="white" size={ 24 } />
              </View>
              <View
                style={{
                  width: '100%',
                  height: 46,
                  zIndex: 999999,
                }}
              >
                <LinearGradient
                  colors={ [ 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)' ] }
                  style={{
                    alignItems: 'center',
                    borderRadius: 0,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    width: '100%',
                    height: '100%',
                    top: 0,
                  }}
                  start={{ x: 0.09, y: 0.09 }}
                />
              </View>
            </Animated.View>
            <Animated.View
              style={{
                width: 180,
                height: 40,
                marginTop: 0,
                transform: [
                  {
                    scaleX: shadowAnim.interpolate({
                      inputRange: [ 0, 1 ],
                      outputRange: [ 0.5, 1 ],
                    }),
                  },
                ],
              }}
            >
              <Shadow />
            </Animated.View>
          </View>
          <OnBoardingFooterContent
            title="Накапливать и тратить"
            textBtn="Получить бонусную карту"
            linkText="Спасибо, не надо"
            onPress={ () => navigation.replace('Auth') }
            linkPress={ () => navigation.replace('Main') }
            currentScreen={ 3 }
            // eslint-disable-next-line max-len
            text="Вы можете накапливать бонусные баллы и оплачивать до 50% от стоимости услуг в наших медицинских центрах"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ThirdOnBoardingScreen;
