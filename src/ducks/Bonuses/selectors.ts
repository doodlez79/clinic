import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getNotifications = (state: StoreTypes) => state.bonuses;

export const getInHoldBonuses = createSelector(
  getNotifications,
  bonuses => bonuses.data.inHold,
);

export const isLoading = createSelector(
  getNotifications,
  bonuses => bonuses.loading,
);

export const getAvailable = createSelector(
  getNotifications,
  bonuses => bonuses.data.available,
);

export const getTotalBonuses = createSelector(
  getNotifications,
  bonuses => bonuses.data.total,
);

export const getHistoryBonuses = createSelector(
  getNotifications,
  bonuses => bonuses.data.history,
);
