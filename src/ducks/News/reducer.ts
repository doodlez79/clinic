import { createReducer } from 'deox';
import produce from 'immer';

import { actionReset } from 'constants/resetAction';
import { clearNewsItem, getNews, getNewsItem } from './actions';
import { NewsTypes } from './News.types';
import { defaultPageMeta } from './News.config';

const initialState: NewsTypes = {
  loading: false,
  newsItems: [],
  newsItem: null,
  meta: defaultPageMeta,
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([ getNews.request, getNewsItem.request ], state => produce(state, next => {
    next.error = '';
    next.loading = true;
  })),
  handleAction(getNews.successed, (state, actions) => produce(state, next => {
    next.loading = false;
    next.newsItems = actions.payload.replace
      ? actions.payload.newsItems
      : state.newsItems.concat(actions.payload.newsItems);
    next.meta = actions.payload.meta;
  })),

  handleAction(getNewsItem.successed, (state, actions) => produce(state, next => {
    next.loading = false;
    next.newsItem = actions.payload.newsItem;
  })),

  handleAction(clearNewsItem, state => produce(state, next => {
    next.loading = false;
    next.newsItem = initialState.newsItem;
  })),
  handleAction(getNews.failed, state => produce(state, next => {
    next.loading = false;
  })),
  handleAction([ actionReset ], () => initialState),
]);

export default reducer;
