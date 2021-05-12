import { createReducer } from 'deox';
import produce from 'immer';

import { actionReset } from 'constants/resetAction';
import { BonusesStateType } from './Bonuses.types';

import { checkBonuses } from './actions';

const initialState: BonusesStateType = {
  data: {
    total: 0,
    history: [],
    inHold: 0,
    available: 0,
  },
  loading: false,
  error: '',
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([ checkBonuses.request ], state => produce(state, next => {
    next.error = '';
    next.loading = true;
  })),
  handleAction(checkBonuses.successed, (state, actions) => produce(state, next => {
    next.loading = false;
    next.data = actions.payload;
  })),

  handleAction([ checkBonuses.failed ], state => produce(state, next => {
    next.loading = false;
  })),

  handleAction([ actionReset ], () => initialState),
]);

export default reducer;
