import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getRecordFeedback = (state: StoreTypes) => state.recordFeedback;

export const isLoading = createSelector(
  getRecordFeedback,
  state => state.loading,
);
