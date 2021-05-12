import { ICON_PROMO_CATEGORY } from 'ducks/Promo/Promo.types';

import Sale from 'Icons/CategoryPromo/Sale.svg';
import SaleEx from 'Icons/CategoryPromo/SaleEx.svg';

import Bonus from 'Icons/CategoryPromo/Bonus.svg';
import BonusEx from 'Icons/CategoryPromo/BonusEx.svg';

import Complex from 'Icons/CategoryPromo/Complex.svg';
import ComplexEx from 'Icons/CategoryPromo/ComplexEx.svg';

import Cashback from 'Icons/CategoryPromo/Cashback.svg';
import CashbackEx from 'Icons/CategoryPromo/CashbackEx.svg';

import React from 'react';

export const IconByType = {
  /* eslint-disable */
  [ICON_PROMO_CATEGORY.BONUS]: (disable: boolean, color: string) => disable ? <Bonus fill={ color } /> : <BonusEx />,
  [ICON_PROMO_CATEGORY.SALE]: (disable: boolean, color: string) => disable ? <Sale fill={ color } /> : <SaleEx />,
  [ICON_PROMO_CATEGORY.COMPLEX]: (disable: boolean, color: string) => disable ? <Complex fill={ color } /> : <ComplexEx />,
  [ICON_PROMO_CATEGORY.CASHBACK]: (disable: boolean, color: string) => disable ? <Cashback fill={ color } /> : <CashbackEx />,
};

