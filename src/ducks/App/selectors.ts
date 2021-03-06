import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getApp = (state: StoreTypes) => state.app;

export const isInitialized = createSelector(getApp, app => app.isInitialized);
export const isConnection = createSelector(getApp, app => app.connection);
export const isFirstEnter = createSelector(getApp, app => app.firstEnter);
export const isShowWalletModal = createSelector(getApp, app => app.showWalletModal);
