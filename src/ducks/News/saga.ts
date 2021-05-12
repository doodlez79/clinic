import {
  call, put, takeLatest, getContext,
} from 'redux-saga/effects';
import { ActionType } from 'deox';
import { getNews, getNewsItem } from './actions';

function* getNewsTask(action: ActionType<typeof getNews.request>) {
  const NewsServices = yield getContext('news');

  const { meta: NewsMeta, replace } = action.payload;
  const { resolve } = action.meta;

  try {
    const { result, meta } = yield call([ NewsServices, 'getNews' ], NewsMeta);

    if (result.length === 0 && resolve) {
      resolve(false);
    } else {
      resolve(true);
    }
    yield put(getNews.successed({ newsItems: result, meta, replace }));
  } catch (err) {
    const errMsg = err.message[0];

    yield put(getNews.failed(errMsg));
  }
}

function* getNewsItemTask(action: ActionType<typeof getNewsItem.request>) {
  const NewsServices = yield getContext('news');

  const { id } = action.payload;

  try {
    const result = yield call([ NewsServices, 'getNewsItem' ], id);
    yield put(getNewsItem.successed({ newsItem: result }));
  } catch (err) {
    const errMsg = err.message[0];

    yield put(getNewsItem.failed(errMsg));
  }
}

export default function* () {
  yield takeLatest(getNews.request, getNewsTask);
  yield takeLatest(getNewsItem.request, getNewsItemTask);
}
