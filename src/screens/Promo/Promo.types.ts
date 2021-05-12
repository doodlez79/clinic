import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';

export interface PromoScreenProps extends StackScreenProps<MainStackParamList, 'Promo'>{}

export enum STATUS_PROMO {
  OUT_OF_DATE = 'OUT_OF_DATE',
  ACTIVE = 'ACTIVE'
}
