import { createActionCreator } from 'deox';

import { generateAsyncActions } from 'helpers/Redux/Redux';
import { UserStoreTypes } from 'ducks/User/User.types';
// import { ActionMetaPromise } from 'src/types/ActionMetaPromise';

const rootPrefix = '@user';

/** getUserProfile */
const prefixGetUser = `${rootPrefix}/getProfile`;
const getUserActionTypes = generateAsyncActions(prefixGetUser);

export interface GetUserSuccessedAction {
  type: typeof getUserActionTypes.SUCCESSED;
  payload: UserStoreTypes['profile'];
}

export interface GetUserFailedAction {
  type: typeof getUserActionTypes.FAILED;
  payload: string;
}

const getUser = {
  request: createActionCreator(getUserActionTypes.REQUEST),
  successed: createActionCreator(
    getUserActionTypes.SUCCESSED,
    resolve => (payload: GetUserSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getUserActionTypes.FAILED,
    resolve => (errorMessage: GetUserFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** patchUserProfile */
const prefixPatchUser = `${rootPrefix}/patchProfile`;
const patchUserActionTypes = generateAsyncActions(prefixPatchUser);

export interface PatchUserAction {
  type: typeof patchUserActionTypes.REQUEST;
  payload:
    | UserStoreTypes['profile']
    | { city: UserStoreTypes['profile']['city'] };
  meta: {
    resolve?: () => void;
    reject?: (err: any) => void;
  }
}

export interface PatchUserSuccessedAction {
  type: typeof patchUserActionTypes.SUCCESSED;
  payload: UserStoreTypes['profile'];
}

export interface PatchUserFailedAction {
  type: typeof patchUserActionTypes.FAILED;
  payload: string;
}

const patchUser = {
  request: createActionCreator(
    patchUserActionTypes.REQUEST,
    resolve => (
      payload: PatchUserAction['payload'],
      promise: PatchUserAction['meta'],
    ) => resolve(payload, promise),
  ),
  successed: createActionCreator(
    patchUserActionTypes.SUCCESSED,
    resolve => (payload: PatchUserSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    patchUserActionTypes.FAILED,
    resolve => (errorMessage: PatchUserFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** patchUserCityProfile */
const prefixPatchUserCity = `${rootPrefix}/patchProfileCity`;
const patchUserCityActionTypes = generateAsyncActions(prefixPatchUserCity);

export interface PatchUserCityAction {
  type: typeof patchUserCityActionTypes.REQUEST;
  payload:{id: string}
}

export interface PatchUserCitySuccessedAction {
  type: typeof patchUserCityActionTypes.SUCCESSED;
  payload: UserStoreTypes['profile'];
}

export interface PatchUserCityFailedAction {
  type: typeof patchUserCityActionTypes.FAILED;
  payload: string;
}

const patchUserCity = {
  request: createActionCreator(
    patchUserCityActionTypes.REQUEST,
    resolve => (
      payload: PatchUserCityAction['payload'],
    ) => resolve(payload),
  ),
  successed: createActionCreator(
    patchUserCityActionTypes.SUCCESSED,
    resolve => (payload: PatchUserCitySuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    patchUserCityActionTypes.FAILED,
    resolve => (errorMessage: PatchUserCityFailedAction['payload']) => resolve(errorMessage),
  ),
};

/* setUserName */
export interface SetUserNameAction {
  type: typeof patchUserActionTypes.FAILED;
  payload: string;
}
const setUserName = createActionCreator(
  `${rootPrefix}SET_USER_NAME`,
  resolve => (payload: SetUserNameAction['payload']) => resolve(payload),
);

/* setUserCity */
export interface SetUserCityAction {
  type: typeof patchUserActionTypes.FAILED;
  payload: {
    id: string
  };
}
const setUserCity = createActionCreator(
  `${rootPrefix}SET_USER_CITY`,
  resolve => (payload: SetUserCityAction['payload']) => resolve(payload),
);
/* ClearUserInformation */
const clearUserInformation = createActionCreator(`${rootPrefix}CLEAR_USER`);

/** walletLinkId */
const prefixWalletLinkId = `${rootPrefix}/walletLinkId`;
const walletLinkIdActionTypes = generateAsyncActions(prefixWalletLinkId);

export interface GetWalletLinkIdAction {
  type: typeof walletLinkIdActionTypes.REQUEST;
  payload: {
    platform: string
  }
  meta: {
    resolve?: (res:string) => void;
    reject?: () => void;
  }
}

export interface GetWalletLinkIdSuccessedAction {
  type: typeof walletLinkIdActionTypes.SUCCESSED;
  payload: {
    id: string;
  };
}

export interface GetWalletLinkIdFailedAction {
  type: typeof walletLinkIdActionTypes.FAILED;
  payload?: string;
}

const getWalletLinkId = {
  request: createActionCreator(
    walletLinkIdActionTypes.REQUEST,
    resolve => (payload: GetWalletLinkIdAction['payload'],
      meta: GetWalletLinkIdAction['meta']) => resolve(payload, meta),
  ),
  successed: createActionCreator(
    walletLinkIdActionTypes.SUCCESSED,
    resolve => (payload: GetWalletLinkIdSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    walletLinkIdActionTypes.FAILED,
    resolve => (errorMessage: GetWalletLinkIdFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** clearWalletLinkId */

const prefixClearWalletLinkId = `${rootPrefix}/clearWalletLinkId`;

const clearWalletLinkId = createActionCreator(prefixClearWalletLinkId);

export {
  getUser, patchUser, clearUserInformation, setUserName, setUserCity, patchUserCity,
  getWalletLinkId, clearWalletLinkId,
};
