import React, { FC } from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer, NavigationContainerRef } from '@react-navigation/native';

import { colors } from 'constants/colors';
import { DrawerNavigator } from 'navigation/DrawerNavigator';
import { AuthNavigation } from 'navigation/AuthNavigator';
import { OnBoardingNavigation } from 'navigation/OnBoarding';

const RootStack = createStackNavigator();

interface NavigationAppProps {
  firstVisit: boolean,
  refProps: React.RefObject<NavigationContainerRef>
}

export const NavigationApp: FC<NavigationAppProps> = ({ firstVisit, refProps }) => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
      primary: colors.green,
    },
  };

  return (
    <NavigationContainer theme={ MyTheme } ref={ refProps }>
      <RootStack.Navigator
        headerMode="none"
        initialRouteName={ firstVisit ? 'OnBoarding' : 'Main' }
        screenOptions={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <RootStack.Screen name="Main" component={ DrawerNavigator } />
        <RootStack.Screen name="OnBoarding" component={ OnBoardingNavigation } />
        <RootStack.Screen name="Auth" component={ AuthNavigation } />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
