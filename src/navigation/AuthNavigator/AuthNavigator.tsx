import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthNavigatorConfig } from './AuthNavigator.config';

const AuthStack = createStackNavigator();

const AuthNavigation: FC = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {AuthNavigatorConfig.map(item => (
      <AuthStack.Screen
        key={ item.id }
        name={ item.name }
        component={ item.component }
        options={ item.options }
      />
    ))}
  </AuthStack.Navigator>
);

export default AuthNavigation;
