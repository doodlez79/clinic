import React from 'react';

import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';

import { MainStackNavigation } from 'navigation/MainStackNavigator';

import { CustomDrawerContent } from 'components/CustomDrawerContent';

const DrawerStack = createDrawerNavigator();

const customDrawerRenderer = (props: DrawerContentComponentProps) => (
  <CustomDrawerContent { ...props } />
);

export const DrawerNavigator: React.FC = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <DrawerStack.Navigator
      drawerContent={ customDrawerRenderer }
      drawerPosition="right"
      drawerStyle={ isLargeScreen ? null : { width: '100%' } }
      drawerType="slide"
      edgeWidth={ 0 }
      initialRouteName="Main"
    >
      <DrawerStack.Screen name="Main" component={ MainStackNavigation } />
    </DrawerStack.Navigator>
  );
};
