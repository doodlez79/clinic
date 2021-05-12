import { generateAsyncActions } from 'helpers/Redux/Redux';
import { createActionCreator } from 'deox';
import { NotificationContentType, TYPE_DEVICE } from 'ducks/Notifications/Notifications.types';
import { ActionMetaPromise } from 'types/ActionMetaPromise';

const rootPrefix = '@Notifications';

/** notificationInit */
const prefixNotificationInit = `${rootPrefix}/NOTIFICATION_INIT`;
const notificationInitActionTypes = generateAsyncActions(prefixNotificationInit);

const notificationInit = {
  request: createActionCreator(
    notificationInitActionTypes.REQUEST,
  ),
  successed: createActionCreator(
    notificationInitActionTypes.SUCCESSED,
  ),
  failed: createActionCreator(
    notificationInitActionTypes.FAILED,
  ),
};

/** sendId */
const prefixSendId = `${rootPrefix}/SEND_ID`;
const sendIdActionTypes = generateAsyncActions(prefixSendId);

export interface SendIdAction {
  type: typeof sendIdActionTypes.REQUEST;
  payload: {
    id: string;
    device: TYPE_DEVICE;
    experienceId: string
  };
  meta: ActionMetaPromise
}

export interface SendIdSuccessedAction {
  type: typeof sendIdActionTypes.SUCCESSED;
  payload: {
    id: string;
    device: TYPE_DEVICE;
    experienceId: string
  };

}

export interface SendIdFailedAction {
  type: typeof sendIdActionTypes.FAILED;
  payload?: string;
}

const sendIdNotification = {
  request: createActionCreator(
    sendIdActionTypes.REQUEST,
    resolve => (payload: SendIdAction['payload'], meta: SendIdAction['meta']) => resolve(payload, meta),
  ),
  successed: createActionCreator(
    sendIdActionTypes.SUCCESSED,
    resolve => (payload: SendIdSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    sendIdActionTypes.FAILED,
    resolve => (errorMessage: SendIdFailedAction['payload']) => resolve(errorMessage),
  ),
};

/* getAllNotifications */
const prefixGetNotifications = `${rootPrefix}/GET_NOTIFICATION`;
const getNotificationsActionTypes = generateAsyncActions(prefixGetNotifications);

export interface GetNotificationsAction {
  type: typeof getNotificationsActionTypes.REQUEST;
}

export interface GetNotificationsSuccessedAction {
  type: typeof getNotificationsActionTypes.SUCCESSED;
  payload: NotificationContentType[];
}

export interface GetNotificationsFailedAction {
  type: typeof getNotificationsActionTypes.FAILED;
  payload?: string;
}

const getNotifications = {
  request: createActionCreator(
    getNotificationsActionTypes.REQUEST,
  ),
  successed: createActionCreator(
    getNotificationsActionTypes.SUCCESSED,
    resolve => (payload: GetNotificationsSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getNotificationsActionTypes.FAILED,
    resolve => (errorMessage: GetNotificationsFailedAction['payload']) => resolve(errorMessage),
  ),
};

/* readNotification */
const prefixReadNotification = `${rootPrefix}/READ_NOTIFICATION`;
const readNotificationActionTypes = generateAsyncActions(prefixReadNotification);

export interface ReadNotificationAction {
  type: typeof readNotificationActionTypes.REQUEST;
  payload: {
    id: string
  }
}

export interface ReadNotificationSuccessedAction {
  type: typeof readNotificationActionTypes.SUCCESSED;
  payload: {
    id: string,
    isNewNotification: boolean
  };
}

export interface ReadNotificationsFailedAction {
  type: typeof readNotificationActionTypes.FAILED;
  payload?: string;
}

const readNotification = {
  request: createActionCreator(
    readNotificationActionTypes.REQUEST,
    resolve => (payload: ReadNotificationAction['payload']) => resolve(payload),
  ),
  successed: createActionCreator(
    readNotificationActionTypes.SUCCESSED,
    resolve => (payload: ReadNotificationSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    readNotificationActionTypes.FAILED,
    resolve => (errorMessage: ReadNotificationsFailedAction['payload']) => resolve(errorMessage),
  ),
};

export {
  sendIdNotification, readNotification, getNotifications, notificationInit,
};
