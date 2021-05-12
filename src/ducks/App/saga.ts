import {
  call, getContext, put, select, takeLatest,
} from 'redux-saga/effects';

import { PushNotificationService } from 'services';

import {
  actions as notificationActions,
} from '../Notifications';
import * as AppActions from './actions';
import { selectors as AuthSelectors } from '../Auth';
import { selectors as DevelopSelectors } from '../Develop';

import { appInit } from './actions';

function* initTask() {
  const apiService = yield getContext('api');

  const accessToken = yield select(AuthSelectors.accessToken);
  const mainUrl = yield select(DevelopSelectors.getMainUrl);

  try {
    yield call([ apiService, 'setAccessToken' ], accessToken);
    yield call([ apiService, 'setBaseUrl' ], mainUrl.url);

    const statusNotification = yield call(PushNotificationService.getPermissionNotifications);
    if (statusNotification === 'granted') {
      yield put(notificationActions.notificationInit.request());
    }
    yield put(appInit.successed());
  } catch (err) {
    yield put(AppActions.appInit.failed());
  }
}

export default function* () {
  yield takeLatest(appInit.request, initTask);
}
