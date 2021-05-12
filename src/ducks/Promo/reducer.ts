import { createReducer } from 'deox';
import produce from 'immer';

import { actionReset } from 'constants/resetAction';
import { clearPromoItem, getPromo, getPromoItem } from './actions';
import { PromoTypes } from './Promo.types';

const initialState: PromoTypes = {
  loading: false,
  promos: [],

  promoItem: null,
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([ getPromo.request, getPromoItem.request ], state => produce(state, next => {
    next.error = '';
    next.loading = true;
  })),
  handleAction(getPromo.successed, (state, action) => produce(state, next => {
    next.loading = false;
    next.promos = action.payload;
  })),
  handleAction(getPromoItem.successed, (state, action) => produce(state, next => {
    next.loading = false;
    next.promoItem = action.payload;
  })),
  handleAction(clearPromoItem, state => produce(state, next => {
    next.loading = false;
    next.promoItem = null;
  })),
  handleAction([ getPromo.failed, getPromoItem.failed ], state => produce(state, next => {
    next.loading = false;
  })),
  handleAction([ actionReset ], () => initialState),
]);

export default reducer;
