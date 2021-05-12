import { ActionType } from 'deox';
import {
  call, put, takeLatest, getContext,
} from 'redux-saga/effects';
import {
  getUser, getWalletLinkId, patchUser, patchUserCity,
} from './actions';

function* getUserTask() {
  const UserService = yield getContext('user');
  try {
    const profile = yield call([ UserService, 'getUser' ]);
    yield put(getUser.successed(profile));
  } catch (err) {
    yield put(getUser.failed(err));
  }
}

function* patchUserTask(action: ActionType<typeof patchUser.request>) {
  const UserService = yield getContext('user');
  const { resolve, reject } = action.meta;

  try {
    const profile = yield call([ UserService, 'patchUser' ], action.payload);
    yield put(patchUser.successed(profile));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (reject) {
      reject(err.data);
    }

    yield put(getUser.failed(err));
  }
}

function* patchUserCityTask(action: ActionType<typeof patchUserCity.request>) {
  const UserService = yield getContext('user');

  try {
    const profile = yield call([ UserService, 'patchUserCity' ], action.payload);
    yield put(patchUserCity.successed(profile));
  } catch (err) {
    yield put(patchUserCity.failed(err));
  }
}

function* getWalletLinkIdTask(action: ActionType<typeof getWalletLinkId.request>) {
  const UserService = yield getContext('user');

  const { platform } = action.payload;
  const { resolve } = action.meta;
  try {
    const data = yield call([ UserService, 'getWalletLinkId' ], platform);
    yield put(getWalletLinkId.successed(data));
    if (resolve) {
      resolve(data.id);
    }
  } catch (err) {
    yield put(getWalletLinkId.failed(err));
  }
}

export default function* () {
  yield takeLatest(getUser.request, getUserTask);
  yield takeLatest(patchUser.request, patchUserTask);
  yield takeLatest(patchUserCity.request, patchUserCityTask);
  yield takeLatest(getWalletLinkId.request, getWalletLinkIdTask);
}
