import { generateAsyncActions } from 'helpers/Redux/Redux';
import { createActionCreator } from 'deox';
import { NewsItemsMeta, NewsItemType } from 'ducks/News/News.types';

const rootPrefix = '@News';

/** GetNews */
const prefixGetNews = `${rootPrefix}/GET_NEWS`;
const getNewsActionTypes = generateAsyncActions(prefixGetNews);

export interface GetNewsAction {
  type: typeof getNewsActionTypes.REQUEST;
  payload: {
    meta: NewsItemsMeta;
    replace: boolean;
  };
  meta: {
    resolve: (isStopScrollGetData: boolean) => void;
  };
}

export interface GetNewsSuccessedAction {
  type: typeof getNewsActionTypes.SUCCESSED;
  payload: {
    newsItems: NewsItemType[];
    meta: NewsItemsMeta;
    replace: boolean;
  };
}

export interface GetNewsFailedAction {
  type: typeof getNewsActionTypes.FAILED;
  payload: string;
}

const getNews = {
  request: createActionCreator(
    getNewsActionTypes.REQUEST,
    resolve => (
      payload: GetNewsAction['payload'],
      promise: GetNewsAction['meta'],
    ) => resolve(payload, promise),
  ),
  successed: createActionCreator(
    getNewsActionTypes.SUCCESSED,
    resolve => (payload: GetNewsSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getNewsActionTypes.FAILED,
    resolve => (errorMessage: GetNewsFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** GetNewsItem */
const prefixGetNewsItem = `${rootPrefix}/GET_NEWS_ITEM`;
const getNewsItemActionTypes = generateAsyncActions(prefixGetNewsItem);

export interface GetNewsItemAction {
  type: typeof getNewsItemActionTypes.REQUEST;
  payload: {
    id: string;
  };
}

export interface GetNewsItemSuccessedAction {
  type: typeof getNewsItemActionTypes.SUCCESSED;
  payload: {
    newsItem: NewsItemType;
  };
}

export interface GetNewsItemFailedAction {
  type: typeof getNewsItemActionTypes.FAILED;
  payload: string;
}

const getNewsItem = {
  request: createActionCreator(
    getNewsItemActionTypes.REQUEST,
    resolve => (payload: GetNewsItemAction['payload']) => resolve(payload),
  ),
  successed: createActionCreator(
    getNewsItemActionTypes.SUCCESSED,
    resolve => (payload: GetNewsItemSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getNewsItemActionTypes.FAILED,
    resolve => (errorMessage: GetNewsItemFailedAction['payload']) => resolve(errorMessage),
  ),
};
/** clearNewsItem */

const CLEAR_NEWS_ITEM = `${rootPrefix}/CLEAR_NEWS_ITEM`;
const clearNewsItem = createActionCreator(CLEAR_NEWS_ITEM);
export { getNews, getNewsItem, clearNewsItem };
