import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';

export interface ProfileScreenProps extends StackScreenProps<MainStackParamList, 'Profile'>{}

export enum SEX_TYPE {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
