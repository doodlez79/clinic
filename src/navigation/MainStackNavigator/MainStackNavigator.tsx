import React, { FC } from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import {
  TouchableOpacity,
} from 'react-native';
import LeftArrow from 'Icons/LeftArrow.svg';
import { colors } from 'constants/colors';
import { perfectSize } from 'helpers/perfectSize';
import { MainStackNavigationConfig } from './MainStackNavigator.config';

const MainStack = createStackNavigator();

const MainStackNavigation: FC = () => (
  <MainStack.Navigator
    headerMode="screen"
    initialRouteName="Home"
    screenOptions={{
      gestureEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
    }}

  >
    {MainStackNavigationConfig.map(item => (
      <MainStack.Screen
        key={ item.id }
        name={ item.name }
        component={ item.component }
        options={{
          headerShown: Boolean(item.header),
          title: item.title,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'OpenSans-SemiBold',
            fontSize: perfectSize(17),
            color: '#000',
          },
          headerLeft: ({ onPress }) => (
            <TouchableOpacity
              onPress={ onPress }
            >
              <LeftArrow strokeProps={ colors.green } />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { marginLeft: perfectSize(16) },
          headerRightContainerStyle: {
            marginRight: perfectSize(16),
          },
          headerStyle: {
            elevation: 0,
            shadowColor: 'transparent',
          },

        }}
      />
    ))}
  </MainStack.Navigator>
);

export default MainStackNavigation;
