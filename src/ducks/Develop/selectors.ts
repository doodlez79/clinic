import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getApp = (state: StoreTypes) => state.develop;

export const getAllUrls = createSelector(getApp, app => app.urls);
export const getMainUrl = createSelector(getApp, app => app.urls.find(el => el.id === app.mainUrl)!);
export const isLoading = createSelector(getApp, app => app.loading);
