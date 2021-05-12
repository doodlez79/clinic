import { ActionType } from 'deox';
import {
  call, put, takeLatest, getContext,
} from 'redux-saga/effects';

import { sendFeedBack, sendRecord } from './actions';

function* sendFeedBackTask(action: ActionType<typeof sendFeedBack.request>) {
  const { resolve, reject } = action.meta;

  const recordFeedbackService = yield getContext('recordFeedback');

  try {
    yield call([ recordFeedbackService, 'sendFeedback' ], action.payload);

    if (resolve) {
      resolve();
    }
    yield put(sendFeedBack.successed());
  } catch (err) {
    const errMsg = err.data.message[0];

    yield put(sendFeedBack.failed(errMsg));

    if (reject) {
      reject();
    }
  }
}

function* sendRecordTask(action: ActionType<typeof sendRecord.request>) {
  const { resolve, reject } = action.meta;

  const recordFeedbackService = yield getContext('recordFeedback');

  try {
    yield call([ recordFeedbackService, 'sendRecord' ], action.payload);

    if (resolve) {
      resolve();
    }
    yield put(sendFeedBack.successed());
  } catch (err) {
    const errMsg = err.data.message[0];

    yield put(sendFeedBack.failed(errMsg));

    if (reject) {
      reject();
    }
  }
}

export default function* () {
  yield takeLatest(sendFeedBack.request, sendFeedBackTask);
  yield takeLatest(sendRecord.request, sendRecordTask);
}
