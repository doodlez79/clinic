import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getUser = (state: StoreTypes) => state.user;

export const isProfile = createSelector(getUser, user => user.profile);
export const isError = createSelector(getUser, user => user.error);
export const isLoading = createSelector(getUser, user => user.loading);
export const currentCity = createSelector(getUser, user => user.profile.city);
export const link = createSelector(getUser, user => user.walletLinkId);

export const walletLink = createSelector((state: StoreTypes) => state, (state: StoreTypes) => {
  const { walletLinkId } = state.user;
  const mainUrl = state.develop.urls.find(el => el.id === state.develop.mainUrl)!;

  const link = `${mainUrl.url}/wallet/${walletLinkId}`;

  return link;
});
