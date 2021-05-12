import { createReducer } from 'deox';

import produce from 'immer';

import { actionReset } from 'constants/resetAction';
import {
  signIn, clearErrors, signOut, reSend, cancelAuth,
} from './actions';
import { AuthTypes } from './Auth.types';

const initialState: AuthTypes = {
  loading: false,
  isAuthorized: false,
  accessToken: undefined,
  renewAfter: 60,
  token: '',
  error: null,
  phone: '',
  clientExist: false,
};

const reducer = createReducer(initialState, handleAction => [
  handleAction(
    [
      signIn.authInit.request,
      signIn.getCode.request,
      signIn.getAccessToken.request,
      reSend.request,
      cancelAuth.request,
    ],
    state => produce(state, next => {
      next.error = '';
      next.loading = true;
    }),
  ),
  handleAction(signIn.authInit.request, (state, action) => produce(state, next => {
    next.phone = action.payload;
    next.error = '';
    next.loading = true;
  })),
  handleAction(signIn.authInit.successed, (state, action) => produce(state, next => {
    next.clientExist = action.payload.clientExist;
    next.token = action.payload.session;
    next.renewAfter = action.payload.renewAfter;
    next.loading = false;
    next.phone = action.payload.phone;
  })),
  handleAction(signIn.getAccessToken.successed, (state, action) => produce(state, next => {
    next.accessToken = action.payload.accessToken;
    next.isAuthorized = true;
    next.loading = false;
  })),

  handleAction([ signIn.getCode.successed, reSend.successed ], (state, action) => produce(state, next => {
    next.renewAfter = action.payload.renewAfter;
    next.loading = false;
  })),

  handleAction(cancelAuth.successed, state => produce(state, next => {
    next.loading = false;
  })),

  handleAction([ signIn.getCode.successed, reSend.successed ], (state, action) => produce(state, next => {
    next.renewAfter = action.payload.renewAfter;
    next.loading = false;
  })),

  handleAction(signOut.successed, state => produce(state, next => {
    next.accessToken = undefined;
    next.isAuthorized = false;
    next.loading = false;
  })),

  handleAction(
    [
      signIn.getCode.failed,
      signIn.authInit.failed,
      signIn.getAccessToken.failed,
      signOut.failed,
      reSend.failed,
      cancelAuth.failed,
    ],
    (state, action) => produce(state, next => {
      next.error = action.payload;
      next.loading = false;
    }),
  ),

  handleAction(clearErrors, state => produce(state, next => {
    next.error = '';
  })),

  handleAction(actionReset, (state, action) => (action.payload ? initialState : state)) ]);

export default reducer;
