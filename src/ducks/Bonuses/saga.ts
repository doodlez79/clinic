import {
  put, takeLatest, call, getContext,
} from 'redux-saga/effects';
import { ActionType } from 'deox';

import { HistoryType, TYPE_HISTORY } from 'ducks/Bonuses/Bonuses.types';
import {
  checkBonuses,
} from './actions';

function* checkBonusesTask(action: ActionType<typeof checkBonuses.request>) {
  const BonusesService = yield getContext('bonuses');

  try {
    const data = yield call([ BonusesService, 'checkBonuses' ], action.payload);
    yield put(checkBonuses.successed({
      ...data,
      history: data.history.filter((el: HistoryType) => !(el.type === TYPE_HISTORY.DEPOSIT && el.inHold)),
    }));
  } catch (err) {
    yield put(checkBonuses.failed());
  }
}

export default function* () {
  yield takeLatest(checkBonuses.request, checkBonusesTask);
}
