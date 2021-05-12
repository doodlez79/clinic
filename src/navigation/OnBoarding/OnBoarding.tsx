import React, { FC } from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { OnBoardingNavigationConfig } from './OnBoarding.config';

const OnBoardingStack = createStackNavigator();

const OnBoardingNavigation: FC = () => (
  <OnBoardingStack.Navigator
    headerMode="none"
    initialRouteName="Home"
    screenOptions={{
      gestureEnabled: true,
      ...TransitionPresets.ScaleFromCenterAndroid,
    }}
  >
    {OnBoardingNavigationConfig.map(item => (
      <OnBoardingStack.Screen
        key={ item.id }
        name={ item.name }
        component={ item.component }
      />
    ))}
  </OnBoardingStack.Navigator>
);

export default OnBoardingNavigation;
