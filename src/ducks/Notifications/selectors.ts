import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getNotifications = (state: StoreTypes) => state.notification;

export const getNotificationsArray = createSelector(
  getNotifications,
  notifications => notifications.notifications,
);

export const isLoading = createSelector(
  getNotifications,
  notifications => notifications.loading,
);

export const getNotificationDevice = createSelector(
  getNotifications,
  notifications => notifications.device,
);

export const getTokenNotification = createSelector(
  getNotifications,
  notifications => notifications.id,
);
