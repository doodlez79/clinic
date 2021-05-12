import { createActionCreator } from 'deox';

import { generateAsyncActions } from 'helpers/Redux/Redux';
import { ActionMetaPromise } from 'types/ActionMetaPromise';

const rootPrefix = '@RecordFeedback';

/** sendRecord */
const prefixSendRecord = `${rootPrefix}/SEND_RECORD`;
const sendRecordActionTypes = generateAsyncActions(prefixSendRecord);

export interface SendRecordAction {
  type: typeof sendRecordActionTypes.REQUEST;
  payload: {
    clinicId: number;
    productId: string;
  };
  meta: {
    resolve: () => void;
    reject: () => void;
  };
}

export interface SendRecordSuccessedAction {
  type: typeof sendRecordActionTypes.SUCCESSED;
}

export interface SendRecordFailedAction {
  type: typeof sendRecordActionTypes.FAILED;
  payload: string;
}

const sendRecord = {
  request: createActionCreator(
    sendRecordActionTypes.REQUEST,
    resolve => (
      phone: SendRecordAction['payload'],
      promise: SendRecordAction['meta'],
    ) => resolve(phone, promise),
  ),
  successed: createActionCreator(sendRecordActionTypes.SUCCESSED),
  failed: createActionCreator(
    sendRecordActionTypes.FAILED,
    resolve => (errorMessage: SendRecordFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** sendFeedback */
const prefixSendFeedback = `${rootPrefix}/SEND_FEEDBACK`;
const sendFeedbackActionTypes = generateAsyncActions(prefixSendFeedback);

export interface SendFeedbackAction {
  type: typeof sendFeedbackActionTypes.REQUEST;
  payload: {
    name: string;
    email: string;
    description: string;
    subjectId: string;
  };
  meta: ActionMetaPromise;
}

export interface SendFeedbackSuccessedAction {
  type: typeof sendFeedbackActionTypes.SUCCESSED;
}

export interface SendFeedbackFailedAction {
  type: typeof sendFeedbackActionTypes.FAILED;
  payload: string;
}

const sendFeedBack = {
  request: createActionCreator(
    sendFeedbackActionTypes.REQUEST,
    resolve => (
      payload: SendFeedbackAction['payload'],
      promise: SendFeedbackAction['meta'],
    ) => resolve(payload, promise),
  ),
  successed: createActionCreator(sendFeedbackActionTypes.SUCCESSED),
  failed: createActionCreator(
    sendFeedbackActionTypes.FAILED,
    resolve => (errorMessage: SendFeedbackFailedAction['payload']) => resolve(errorMessage),
  ),
};
export { sendFeedBack, sendRecord };
