/*
  THIS IS THE FINAL VERSION OF THIS FILE
  DO NOT CHANGE OR YOU WILL BE FIRED
*/

import React from 'react';
import { View } from 'react-native';

import {
  BottomTabBarOptions,

  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Badge } from 'components/Badge';
import { Stub } from 'components/Stub';

import { Feather as FeatherIcon } from '@expo/vector-icons';
import HomeIcon from 'Icons/Home.svg';
import CategoryIcon from 'Icons/Category.svg';
import DocIcon from 'Icons/Doc.svg';

import { HomeScreen } from 'screens/Home';
import { RecordScreen } from 'screens/Record';
import { ServicesScreen } from 'screens/Services';
import { useSelector } from 'react-redux';
import { Selectors } from 'ducks';

const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: '#3ac6c4',
  inactiveTintColor: '#999999',
  labelStyle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 10,
  },
  style: {
    backgroundColor: '#ffffff',
    borderTopColor: '#f5f7fA',
    borderTopWidth: 1,
  },
};

const inactiveIconColor = '#e0e0e0';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const newNotifications = useSelector(Selectors.Notifications.getNotificationsArray);

  /* колличество нотификаций */
  const lengthNewNotifications = (newNotifications || []).filter(
    el => el.isNewNotification,
  ).length;

  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={ tabBarOptions }>
      <Tab.Screen
        name="Home"
        component={ HomeScreen }
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon strokeProps={ focused ? color : inactiveIconColor } />
          ),
        }}
      />
      <Tab.Screen
        name="enroll"
        component={ RecordScreen }
        options={{
          tabBarLabel: 'Запись',
          tabBarIcon: ({ color, focused }) => (
            <DocIcon strokeProps={ focused ? color : inactiveIconColor } />
          ),
        }}
      />
      <Tab.Screen
        name="services"
        component={ ServicesScreen }
        options={{
          tabBarLabel: 'Услуги',
          tabBarIcon: ({ color, focused }) => (
            <CategoryIcon strokeProps={ focused ? color : inactiveIconColor } />
          ),
        }}
      />
      <Tab.Screen
        name="menu"
        component={ Stub }
        options={{
          tabBarLabel: 'Меню',
          tabBarIcon: () => (
            <View>
              <FeatherIcon name="menu" color={ inactiveIconColor } size={ 25 } />
              {
                Boolean(lengthNewNotifications > 0) && (
                  <Badge left={ 0 } color={ tabBarOptions.activeTintColor } />
                )
              }

            </View>
          ),
        }}
        listeners={ ({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.toggleDrawer();
          },
        }) }
      />
    </Tab.Navigator>
  );
};
