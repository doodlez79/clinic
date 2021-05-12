import {
  FirstOnBoardingScreen,
  SecondOnBoardingScreen,
} from 'screens/Onboarding';
import { WelcomeScreen } from 'screens/Onboarding/WelcomeScreen';
import { ThirdOnBoardingScreen } from 'screens/Onboarding/ThirdScreen';

export const OnBoardingNavigationConfig = [
  {
    id: 0,
    name: 'Welcome',
    component: WelcomeScreen,
  },
  {
    id: 1,
    name: 'FirstScreen',
    component: FirstOnBoardingScreen,
  },
  {
    id: 2,
    name: 'SecondScreen',
    component: SecondOnBoardingScreen,
  },
  {
    id: 3,
    name: 'ThirdScreen',
    component: ThirdOnBoardingScreen,
  },
];
