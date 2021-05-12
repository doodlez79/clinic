import { createReducer } from 'deox';
import produce from 'immer';

import {
  appInit, appNetwork, firstEnter, showWalletModal,
} from './actions';

const initialState = {
  isInitialized: false,
  connection: true,
  firstEnter: true,
  showWalletModal: true,
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([ appInit.successed ], state => produce(state, next => {
    next.isInitialized = true;
  })),
  handleAction([ appNetwork ], (state, action) => produce(state, next => {
    next.connection = action.payload;
  })),
  handleAction([ firstEnter ], state => produce(state, next => {
    next.firstEnter = false;
  })),
  handleAction([ showWalletModal ], state => produce(state, next => {
    next.showWalletModal = false;
  })),
]);

export default reducer;
