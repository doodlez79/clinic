import {
  put, takeLatest, call, getContext, takeEvery,
} from 'redux-saga/effects';
import { ActionType } from 'deox';
import { PushNotificationService } from 'services';
import {
  getNotifications, readNotification, sendIdNotification, notificationInit,
} from './actions';

function* notificationInitTask() {
  try {
    const { token, platform, experienceId } = yield call(PushNotificationService.getDevicePushTokenInformation);

    yield put(sendIdNotification.request({
      id: token,
      device: platform,
      experienceId,
    }, { resolve: () => {} }));
  } catch (err) {
    yield put(notificationInit.failed());
  }
}

function* sendIdTask(action: ActionType<typeof sendIdNotification.request>) {
  const NotificationsServices = yield getContext('notifications');

  const { id, device, experienceId } = action.payload;
  const { resolve } = action.meta;
  try {
    yield call([ NotificationsServices, 'sendId' ], id, device, experienceId);

    yield put(sendIdNotification.successed({ id, device, experienceId }));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    yield put(sendIdNotification.failed(''));
  }
}

function* getNotificationsTask() {
  const NotificationsServices = yield getContext('notifications');
  try {
    const data = yield call([ NotificationsServices, 'getList' ]);
    yield put(getNotifications.successed(data));
  } catch (err) {
    yield put(getNotifications.failed(''));
  }
}

function* readNotificationTask(action: ActionType<typeof readNotification.request>) {
  const NotificationsServices = yield getContext('notifications');

  const { id } = action.payload;
  try {
    const { id: idReadNotif, isNewNotification } = yield call([ NotificationsServices, 'readrNotification' ], id);
    yield put(readNotification.successed({ id: idReadNotif, isNewNotification }));
  } catch (err) {
    yield put(getNotifications.failed(''));
  }
}

export default function* () {
  yield takeLatest(sendIdNotification.request, sendIdTask);
  yield takeEvery(readNotification.request, readNotificationTask);
  yield takeLatest(getNotifications.request, getNotificationsTask);
  yield takeLatest(notificationInit.request, notificationInitTask);
}
