import { generateAsyncActions } from 'helpers/Redux/Redux';
import { createActionCreator } from 'deox';
import { PromoType } from 'ducks/Promo/Promo.types';

const rootPrefix = '@promo';

/** GetPromo */
const prefixGetPromo = `${rootPrefix}/GET_PROMO`;
const getPromoActionTypes = generateAsyncActions(prefixGetPromo);

export interface GetPromoAction {
  type: typeof getPromoActionTypes.REQUEST;
}

export interface GetPromoSuccessedAction {
  type: typeof getPromoActionTypes.SUCCESSED;
  payload: PromoType[];
}

export interface GetPromoFailedAction {
  type: typeof getPromoActionTypes.FAILED;
  payload: string;
}

const getPromo = {
  request: createActionCreator(getPromoActionTypes.REQUEST),
  successed: createActionCreator(
    getPromoActionTypes.SUCCESSED,
    resolve => (payload: GetPromoSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getPromoActionTypes.FAILED,
    resolve => (errorMessage: GetPromoFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** GetPromoItem */
const prefixGetPromoItem = `${rootPrefix}/GET_PROMO_ITEM`;
const getPromoItemActionTypes = generateAsyncActions(prefixGetPromoItem);

export interface GetPromoItemAction {
  type: typeof getPromoItemActionTypes.REQUEST;
  payload: string;
  meta: {
    resolve: () => void,
    reject: () => void
  }
}

export interface GetPromoItemSuccessedAction {
  type: typeof getPromoItemActionTypes.SUCCESSED;
  payload: PromoType;
}

export interface GetPromoItemFailedAction {
  type: typeof getPromoItemActionTypes.FAILED;
  payload: string;
}

const getPromoItem = {
  request: createActionCreator(
    getPromoItemActionTypes.REQUEST,
    resolve => (payload: GetPromoItemAction['payload'], meta: GetPromoItemAction['meta']) => resolve(payload, meta),
  ),
  successed: createActionCreator(
    getPromoItemActionTypes.SUCCESSED,
    resolve => (payload: GetPromoItemSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getPromoItemActionTypes.FAILED,
    resolve => (errorMessage: GetPromoItemFailedAction['payload']) => resolve(errorMessage),
  ),
};

/* clearPromoItem */
const CLEAR_PROMO_ITEM = `${rootPrefix}/CLEAR_PROMO_ITEM`;

const clearPromoItem = createActionCreator(CLEAR_PROMO_ITEM);

export { getPromo, getPromoItem, clearPromoItem };
