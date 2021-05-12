import { createReducer } from 'deox';
import produce from 'immer';

import { actionReset } from 'constants/resetAction';
import {
  clearUserInformation,
  getUser,
  setUserName,
  patchUser, setUserCity, getWalletLinkId, clearWalletLinkId,
} from './actions';
import { UserStoreTypes } from './User.types';

const initialState: UserStoreTypes = {
  loading: false,
  error: '',
  profile: {
    id: '0',
    phone: '',
    name: '',
    cardNumber: null,
    surname: '',
    sex: '',
    patronymic: '',
    city: null,
    email: '',
    isEmailConfirmed: false,
    avatar: '',
    isBlocked: false,
    birthDate: null,
    isProfileCompleted: false,
    settings: {
      id: '',
      smsNotifications: false,
      emailNotifications: false,
      pushNotifications: false,
    },
    emailAwaitingConfirmation: null,
  },
  walletLinkId: '',
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([ getUser.request, patchUser.request ], state => produce(state, next => {
    next.error = '';
    next.loading = true;
  })),
  handleAction([ getUser.successed, patchUser.successed ], (state, action) => produce(state, next => {
    next.profile = action.payload;
    next.loading = false;
  })),
  handleAction(clearUserInformation, state => produce(state, next => {
    next.profile = initialState.profile;
    next.loading = false;
  })),

  handleAction(setUserName, (state, action) => produce(state, next => {
    next.profile.name = action.payload;
    next.loading = false;
  })),

  handleAction(setUserCity, (state, action) => produce(state, next => {
    next.profile = {
      ...state.profile,
      city: action.payload,
    };
    next.loading = false;
  })),

  handleAction([ getUser.failed, patchUser.failed ], (state, action) => produce(state, next => {
    next.error = action.payload;
    next.loading = false;
  })),
  handleAction(getWalletLinkId.successed, (state, action) => produce(state, next => {
    next.walletLinkId = action.payload.id;
    next.loading = false;
  })),
  handleAction([ clearWalletLinkId ], state => produce(state, next => {
    next.walletLinkId = '';
  })),
  handleAction([ actionReset ], () => initialState),
]);

export default reducer;
