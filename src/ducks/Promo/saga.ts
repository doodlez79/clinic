import {
  call, put, takeLatest, getContext,
} from 'redux-saga/effects';

import { ActionType } from 'deox';
import { getPromo, getPromoItem } from './actions';

function* getPromoTask() {
  const promoServices = yield getContext('promo');

  try {
    const result = yield call([ promoServices, 'getPromos' ]);

    yield put(getPromo.successed(result));
  } catch (err) {
    const errMsg = err.message[0];

    yield put(getPromo.failed(errMsg));
  }
}

function* getPromoItemTask(action: ActionType<typeof getPromoItem.request>) {
  const promoServices = yield getContext('promo');

  const { resolve, reject } = action.meta;

  try {
    const result = yield call([ promoServices, 'getPromoItem' ], action.payload);
    yield put(getPromoItem.successed(result));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (reject) {
      reject();
    }
  }
}

export default function* () {
  yield takeLatest(getPromo.request, getPromoTask);
  yield takeLatest(getPromoItem.request, getPromoItemTask);
}
