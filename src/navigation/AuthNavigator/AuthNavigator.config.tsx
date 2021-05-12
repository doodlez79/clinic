import { AuthScreen } from 'screens/Auth';
import { optionsAnim } from 'constants/animationScreenConfig';
import { CodeScreen } from 'screens/Code';
import { AuthName } from 'screens/AuthName';

export const AuthNavigatorConfig = [
  {
    id: 1,
    name: 'AuthPhone',
    component: AuthScreen,
    options: optionsAnim,
  },
  {
    id: 2,
    name: 'AuthCode',
    component: CodeScreen,
    options: optionsAnim,
  },
  {
    id: 3,
    name: 'AuthName',
    component: AuthName,
    options: optionsAnim,
  },
];
