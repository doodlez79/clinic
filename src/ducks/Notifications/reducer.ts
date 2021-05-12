import { createReducer } from 'deox';
import produce from 'immer';

import { NotificationStateType, TYPE_DEVICE } from 'ducks/Notifications/Notifications.types';

import { actionReset } from 'constants/resetAction';
import {
  getNotifications, readNotification,
  sendIdNotification,
} from './actions';

const initialState: NotificationStateType = {
  id: '',
  loading: false,
  device: TYPE_DEVICE.IOS,
  experienceId: '',
  error: {},
  notifications: [],
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([ sendIdNotification.request, getNotifications.successed ], state => produce(state, next => {
    next.error = '';
    next.loading = true;
  })),
  handleAction(sendIdNotification.successed, (state, actions) => produce(state, next => {
    next.loading = false;
    next.id = actions.payload.id;
    next.device = actions.payload.device;
    next.experienceId = actions.payload.experienceId;
  })),

  handleAction(getNotifications.successed, (state, action) => produce(state, next => {
    next.loading = false;
    next.notifications = action.payload;
  })),

  handleAction(readNotification.successed, (state, action) => produce(state, next => {
    next.loading = false;
    next.notifications = state.notifications.map(item => {
      if (item.id === action.payload.id) {
        return {
          ...item,
          isNewNotification: action.payload.isNewNotification,
        };
      }
      return item;
    });
  })),

  handleAction([ sendIdNotification.failed, getNotifications.failed ], state => produce(state, next => {
    next.loading = false;
  })),

  handleAction([ actionReset ], () => initialState),
]);

export default reducer;
