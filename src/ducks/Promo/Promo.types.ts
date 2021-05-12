import { MarkDownTypes } from 'types/MarkDown';

export interface PromoTypes {
  loading: boolean;
  error?: string;
  promos: PromoType[];
  promoItem: PromoType | null;
}

export interface PromoType {
  isGlobal: boolean;
  clinics: any;
  id: number;
  title: string;
  category:ICON_PROMO_CATEGORY,
  description: string;
  poster: string;

  markdown?: MarkDownTypes;
  startAt: Date | null;
  endAt: Date | null;
  createdAt: string;
  updatedAt: string;
  lifecycle: string;
  isInfinity: boolean;
}

export enum ICON_PROMO_CATEGORY {
  BONUS= 'BONUS',
  CASHBACK='CASHBACK',
  COMPLEX='COMPLEX',
  SALE='SALE'
}
