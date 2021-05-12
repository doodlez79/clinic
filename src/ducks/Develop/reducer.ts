import { createReducer } from 'deox';
import produce from 'immer';

import { DevelopTypes } from 'ducks/Develop/Develop.types';
import { actionReset } from 'constants/resetAction';
import { urlConfig } from 'ducks/Develop/config';

import {
  addUrl, changeMainUrl, checkUrl, deleteElem,
} from './actions';

const initialState: DevelopTypes = {
  loading: false,
  changeUrl: false,
  urls: urlConfig,
  mainUrl: '8da5f541-51dc-4c8e-b545-57deb774a827',
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([ addUrl ], (state, action) => produce(state, next => {
    next.urls = action.payload;
  })),

  handleAction([ deleteElem ], (state, action) => produce(state, next => {
    next.urls = state.urls.filter(el => el.id !== action.payload);
  })),

  handleAction([ checkUrl.request ], state => produce(state, next => {
    next.loading = true;
  })),

  handleAction([ checkUrl.successed ], (state, action) => produce(state, next => {
    next.urls = [ ...state.urls, action.payload ];
    next.loading = false;
  })),

  handleAction([ checkUrl.failed ], state => produce(state, next => {
    next.loading = false;
  })),

  handleAction([ changeMainUrl ], (state, action) => produce(state, next => {
    next.mainUrl = action.payload;
    next.changeUrl = true;
  })),

  handleAction(actionReset, state => produce(state, next => {
    next.changeUrl = false;
  })),
]);

export default reducer;
