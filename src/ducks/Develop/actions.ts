import { createActionCreator } from 'deox';

import { generateAsyncActions } from 'helpers/Redux/Redux';

const rootPrefix = '@developState';
/** developAddUrl */
const prefixAddUrl = `${rootPrefix}/add_urls`;
const developAddUrlTypes = generateAsyncActions(prefixAddUrl);

export interface DevelopAddUrlAction {
  type: typeof developAddUrlTypes.REQUEST;
  payload: {id: string, url: string, removable: boolean}[];
}
const addUrl = createActionCreator(prefixAddUrl,
  resolve => (payload: DevelopAddUrlAction['payload']) => resolve(payload));

/** developChangeMainUrl */

const prefixChangeUrl = `${rootPrefix}/change_url`;

export interface DevelopChangeUrlAction {
  type: typeof developAddUrlTypes.REQUEST;
  payload: string;
}

const changeMainUrl = createActionCreator(prefixChangeUrl,
  resolve => (payload: DevelopChangeUrlAction['payload']) => resolve(payload));

/** developDeleteElem */

const prefixDeleteUrl = `${rootPrefix}/delete_url`;

export interface DevelopDeletelAction {
  type: typeof prefixDeleteUrl;
  payload: string;
}

const deleteElem = createActionCreator(prefixDeleteUrl,
  resolve => (payload: DevelopDeletelAction['payload']) => resolve(payload));

/** developCheckUrl */

const prefixCheckUrl = `${rootPrefix}/check_url`;
const developCheckUrlTypes = generateAsyncActions(prefixCheckUrl);

export interface CheckUrlAction {
  type: typeof developCheckUrlTypes.REQUEST;
  payload: { id: string; url: string, data: {test: string} };
  meta: {
    resolve: () => void,
    reject: (err: string) => void
  }
}

export interface CheckUrlActionSuccessed {
  type: typeof developCheckUrlTypes.SUCCESSED;
  payload: { id: string; url: string, removable: boolean },

}

export interface CheckUrlFailedAction {
  type: typeof developCheckUrlTypes.FAILED;
  payload: string;
}

const checkUrl = {
  request: createActionCreator(
    developCheckUrlTypes.REQUEST,
    resolve => (payload: CheckUrlAction['payload'], meta: CheckUrlAction['meta']) => resolve(payload, meta),
  ),
  successed: createActionCreator(
    developCheckUrlTypes.SUCCESSED,
    resolve => (payload: CheckUrlActionSuccessed['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    developCheckUrlTypes.FAILED,
  ),
};

export {
  addUrl, changeMainUrl, checkUrl, deleteElem,
};
