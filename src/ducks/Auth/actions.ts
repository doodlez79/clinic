import { createActionCreator } from 'deox';

import { generateAsyncActions } from 'helpers/Redux/Redux';
import { ActionMetaPromise } from 'types/ActionMetaPromise';
import { FormikErrors } from 'formik/dist/types';

const rootPrefix = '@auth';

/** authInit */
const prefixAuthInit = `${rootPrefix}/auth/init`;
const authInitActionTypes = generateAsyncActions(prefixAuthInit);

export interface AuthInitAction {
  type: typeof authInitActionTypes.REQUEST;
  payload: string;
  meta: {
    resolve: (clientExist: boolean) => void;
    reject: (err: FormikErrors<any>) => void;
  };
}

export interface AuthInitSuccessedAction {
  type: typeof authInitActionTypes.SUCCESSED;
  payload: {
    session: string;
    clientExist: boolean;
    renewAfter?: number;
    phone: string
  };
}

export interface AuthInitFailedAction {
  type: typeof authInitActionTypes.FAILED;
  payload: null
}

const authInit = {
  request: createActionCreator(
    authInitActionTypes.REQUEST,
    resolve => (
      phone: AuthInitAction['payload'],
      promise: AuthInitAction['meta'],
    ) => resolve(phone, promise),
  ),
  successed: createActionCreator(
    authInitActionTypes.SUCCESSED,
    resolve => (payload: AuthInitSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    authInitActionTypes.FAILED,
    resolve => (errorMessage: AuthInitFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** getCode */
const prefixGetCode = `${rootPrefix}/auth/getCode`;
const getCodeActionTypes = generateAsyncActions(prefixGetCode);

export interface GetCodeAction {
  type: typeof getCodeActionTypes.REQUEST;
  payload: {
    tokenSession: string;
    name: string;
  };
  meta: ActionMetaPromise;
}

export interface GetCodeSuccessedAction {
  type: typeof getCodeActionTypes.SUCCESSED;
  payload: {
    renewAfter: number;
  };
}

export interface GetCodeFailedAction {
  type: typeof getCodeActionTypes.FAILED;
  payload: string;
}

const getCode = {
  request: createActionCreator(
    getCodeActionTypes.REQUEST,
    resolve => (
      payload: GetCodeAction['payload'],
      promise: GetCodeAction['meta'],
    ) => resolve(payload, promise),
  ),
  successed: createActionCreator(
    getCodeActionTypes.SUCCESSED,
    resolve => (payload: GetCodeSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getCodeActionTypes.FAILED,
    resolve => (errorMessage: GetCodeFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** GetAccessToken */
const prefixGetAccessToken = `${rootPrefix}/signIn/getAccessToken`;
const getAccessTokenActionTypes = generateAsyncActions(prefixGetAccessToken);

export interface GetAccessTokenAction {
  type: typeof getAccessTokenActionTypes.REQUEST;
  payload: {
    uuid: string;
    code: string;
  };
  meta: ActionMetaPromise;
}

export interface GetAccessTokenSuccessedAction {
  type: typeof getAccessTokenActionTypes.SUCCESSED;
  payload: {
    accessToken: string;
  };
}

export interface GetAccessTokenFailedAction {
  type: typeof getAccessTokenActionTypes.FAILED;
  payload: string;
}

const getAccessToken = {
  request: createActionCreator(
    getAccessTokenActionTypes.REQUEST,
    resolve => (
      payload: GetAccessTokenAction['payload'],
      promise: GetAccessTokenAction['meta'],
    ) => resolve(payload, promise),
  ),
  successed: createActionCreator(
    getAccessTokenActionTypes.SUCCESSED,
    resolve => (payload: GetAccessTokenSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getAccessTokenActionTypes.FAILED,
    resolve => (errorMessage: GetAccessTokenFailedAction['payload']) => resolve(errorMessage),
  ),
};
/** ReSendCode */
const prefixReSendCode = `${rootPrefix}/ReSendCode`;
const reSendCodeActionTypes = generateAsyncActions(prefixReSendCode);

export interface ReSendCodeAction {
  type: typeof reSendCodeActionTypes.REQUEST;
  payload: string;
  meta: {
    resolve: (RenewAfter: number) => void;
  };
}

export interface ReSendCodeSuccessedAction {
  type: typeof reSendCodeActionTypes.SUCCESSED;
  payload: {
    renewAfter: number;
  };
}

export interface ReSendCodeFailedAction {
  type: typeof reSendCodeActionTypes.FAILED;
  payload: string;
}

const reSend = {
  request: createActionCreator(
    reSendCodeActionTypes.REQUEST,
    resolve => (
      payload: ReSendCodeAction['payload'],
      promise: ReSendCodeAction['meta'],
    ) => resolve(payload, promise),
  ),
  successed: createActionCreator(
    reSendCodeActionTypes.SUCCESSED,
    resolve => (payload: ReSendCodeSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    reSendCodeActionTypes.FAILED,
    resolve => (errorMessage: ReSendCodeFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** CancelAuth */
const prefixCancelAuth = `${rootPrefix}/cancel-auth`;
const cancelAuthActionTypes = generateAsyncActions(prefixCancelAuth);

export interface CancelAuthAction {
  type: typeof cancelAuthActionTypes.REQUEST;
  payload: string;
  meta: ActionMetaPromise;
}

export interface CancelAuthFailedAction {
  type: typeof cancelAuthActionTypes.FAILED;
  payload: string;
}

const cancelAuth = {
  request: createActionCreator(
    cancelAuthActionTypes.REQUEST,
    resolve => (
      payload: CancelAuthAction['payload'],
      promise: CancelAuthAction['meta'],
    ) => resolve(payload, promise),
  ),
  successed: createActionCreator(cancelAuthActionTypes.SUCCESSED),
  failed: createActionCreator(
    cancelAuthActionTypes.FAILED,
    resolve => (errorMessage: CancelAuthFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** SignOut */
const prefixSingOut = `${rootPrefix}/SingOut`;
const singOutActionTypes = generateAsyncActions(prefixSingOut);

export interface SingOutAction {
  type: typeof getAccessTokenActionTypes.REQUEST;
  payload: undefined;
  meta: ActionMetaPromise;
}

export interface SingOutFailedAction {
  type: typeof getAccessTokenActionTypes.FAILED;
  payload: string;
}

const signOut = {
  request: createActionCreator(
    singOutActionTypes.REQUEST,
    resolve => (promise: SingOutAction['meta']) => resolve(undefined, promise),
  ),
  successed: createActionCreator(singOutActionTypes.SUCCESSED),
  failed: createActionCreator(
    singOutActionTypes.FAILED,
    resolve => (errorMessage: SingOutFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** ClearErrors */
const CLEAR_ERRORS = `${rootPrefix}/CLEAR_ERRORS`;
const clearErrors = createActionCreator(CLEAR_ERRORS);

const signIn = {
  authInit,
  getCode,
  getAccessToken,
};

export {
  signIn, clearErrors, signOut, reSend, cancelAuth,
};
