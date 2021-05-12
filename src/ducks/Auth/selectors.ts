import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getAuth = (state: StoreTypes) => state.auth;

export const isAuthorized = createSelector(getAuth, auth => auth.isAuthorized);
export const isError = createSelector(getAuth, auth => auth.error);
export const RenewAfter = createSelector(getAuth, auth => auth.renewAfter);
export const isLoading = createSelector(getAuth, auth => auth.loading);
export const isPhone = createSelector(getAuth, auth => auth.phone);
export const isToken = createSelector(getAuth, auth => auth.token);
export const accessToken = createSelector(getAuth, auth => auth.accessToken);
