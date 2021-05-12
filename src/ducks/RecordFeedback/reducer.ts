import { createReducer } from 'deox';

import produce from 'immer';

import { sendFeedBack, sendRecord } from './actions';

export interface RecordFeedbackTypes {
  loading: boolean;
  error: string;
}

const initialState: RecordFeedbackTypes = {
  loading: false,
  error: '',
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([ sendRecord.request, sendFeedBack.request ], state => produce(state, next => {
    next.error = '';
    next.loading = true;
  })),

  handleAction([ sendRecord.successed, sendFeedBack.successed ], state => produce(state, next => {
    next.loading = false;
  })),

  handleAction([ sendRecord.failed, sendFeedBack.failed ], state => produce(state, next => {
    next.loading = false;
  })),
]);

export default reducer;
