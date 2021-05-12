import { TYPE_ACTION_CONTENT } from 'components/ActionsContent/ActionsContent.types';
import { PromoType } from 'ducks/Promo/Promo.types';
import { STATUS_PROMO } from 'screens/Promo/Promo.types';

export const getActionsByType = (
  data: PromoType[],
  type: TYPE_ACTION_CONTENT,
): { active: PromoType[]; finished: PromoType[] } => {
  const result = {
    active: data.filter(item => item.lifecycle === STATUS_PROMO.ACTIVE),
    finished: data.filter(item => item.lifecycle === STATUS_PROMO.OUT_OF_DATE),
  };
  if (type === TYPE_ACTION_CONTENT.ALL) {
    return result;
  }
  if (type === TYPE_ACTION_CONTENT.ACTIVE) {
    return {
      ...result,
      finished: [],
    };
  }
  if (type === TYPE_ACTION_CONTENT.ARCHIVE) {
    return {
      ...result,
      active: [],
    };
  }
  return result;
};
