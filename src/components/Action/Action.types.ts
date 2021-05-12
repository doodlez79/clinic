import { ICON_PROMO_CATEGORY } from 'ducks/Promo/Promo.types';

export interface ActionsProps {
  title: string;
  description: string;
  date: string | null;
  id: number;
  category: ICON_PROMO_CATEGORY

  style?: any;
  fullWidth?: boolean;
  green?: boolean;
  disable?: boolean;
  isInfinity?:boolean
}
