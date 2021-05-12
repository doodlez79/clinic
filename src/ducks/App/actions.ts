import { createActionCreator } from 'deox';

import { generateAsyncActions } from 'helpers/Redux/Redux';

const rootPrefix = '@app';
/** appInit */
const prefixGetCode = `${rootPrefix}/init`;
const appActionTypes = generateAsyncActions(prefixGetCode);

export interface AppInitAction {
  type: typeof appActionTypes.REQUEST;
}
const appInit = {
  request: createActionCreator(appActionTypes.REQUEST),
  successed: createActionCreator(appActionTypes.SUCCESSED),
  failed: createActionCreator(appActionTypes.FAILED),
};

/** appNetworkConnection */
const prefixNetwork = `${rootPrefix}/network`;

const appNetwork = createActionCreator(prefixNetwork,
  resolve => (payload: boolean) => resolve(payload));

/** firstEnter */
const prefixFirstEnter = `${rootPrefix}/firstEnter`;

const firstEnter = createActionCreator(prefixFirstEnter);

/** showWalletModal */
const prefixShowWalletModal = `${rootPrefix}/showWalletModal`;

const showWalletModal = createActionCreator(prefixShowWalletModal);

export {
  appInit, appNetwork, firstEnter, showWalletModal,
};
