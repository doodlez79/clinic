import {
  put, takeLatest, call, getContext,
} from 'redux-saga/effects';
import { ActionType } from 'deox';

import {
  checkUrl,
} from './actions';

function* checkUrlTask(action: ActionType<typeof checkUrl.request>) {
  const DevelopService = yield getContext('develop');

  const { resolve, reject } = action.meta;

  try {
    yield call([ DevelopService, 'checkUrl' ], action.payload.url, action.payload.data);
    yield put(checkUrl.successed({ id: action.payload.id, url: action.payload.url }));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (reject) {
      reject('Не валидный URL');
    }
    yield put(checkUrl.failed());
  }
}

export default function* () {
  yield takeLatest(checkUrl.request, checkUrlTask);
}
