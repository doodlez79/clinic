import { all, fork } from 'redux-saga/effects';

import { combineReducers, StateFromReducersMapObject } from 'redux';

import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer, {
  actions as authActions,
  saga as authSaga,
  selectors as authSelectors,
} from './Auth';

import bonusesReducer, {
  actions as bonusesActions,
  saga as bonusesSaga,
  selectors as bonusesSelectors,
} from './Bonuses';

import developReducer, {
  actions as developActions,
  selectors as developSelectors,
  saga as developSaga,
} from './Develop';

import miscReducer, {
  actions as miscActions,
  saga as miscSaga,
  selectors as miscSelectors,
} from './Misc';

import recordFeedbackReduces, {
  actions as recordFeedbackActions,
  saga as recordFeedbackSaga,
  selectors as recordFeedbackSelectors,
} from './RecordFeedback';

import appReducer, {
  actions as appActions,
  saga as appSaga,
  selectors as appSelectors,
} from './App';

import userReducer, {
  actions as userActions,
  saga as userSaga,
  selectors as userSelectors,
} from './User';

import promoReducer, {
  actions as promoActions,
  saga as promoSaga,
  selectors as promoSelectors,
} from './Promo';

import newsReducer, {
  actions as newsActions,
  saga as newsSaga,
  selectors as newsSelectors,
} from './News';

import notificationReducer, {
  actions as notificationActions,
  saga as notificationSaga,
  selectors as notificationSelectors,
} from './Notifications';

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  whitelist: [ 'firstEnter' ],
};

const reducersMap = {
  auth: authReducer,
  app: persistReducer(appPersistConfig, appReducer),
  user: userReducer,
  promo: promoReducer,
  news: newsReducer,
  notification: notificationReducer,
  misc: miscReducer,
  recordFeedback: recordFeedbackReduces,
  bonuses: bonusesReducer,
  develop: developReducer,
};

const reducer = combineReducers(reducersMap);

const actions = {
  Auth: authActions,
  App: appActions,
  User: userActions,
  Promo: promoActions,
  News: newsActions,
  Notification: notificationActions,
  Misc: miscActions,
  RecordFeedback: recordFeedbackActions,
  Bonuses: bonusesActions,
  Develop: developActions,
};

const selectors = {
  Auth: authSelectors,
  App: appSelectors,
  User: userSelectors,
  Promo: promoSelectors,
  News: newsSelectors,
  Notifications: notificationSelectors,
  Misc: miscSelectors,
  RecordFeedback: recordFeedbackSelectors,
  Bonuses: bonusesSelectors,
  Develop: developSelectors,
};

function* saga() {
  yield all([ fork(authSaga) ]);
  yield all([ fork(appSaga) ]);
  yield all([ fork(userSaga) ]);
  yield all([ fork(promoSaga) ]);
  yield all([ fork(newsSaga) ]);
  yield all([ fork(miscSaga) ]);
  yield all([ fork(developSaga) ]);
  yield all([ fork(notificationSaga) ]);
  yield all([ fork(recordFeedbackSaga) ]);
  yield all([ fork(bonusesSaga) ]);
}

export type State = StateFromReducersMapObject<typeof reducersMap>;

export {
  reducer as default, saga, selectors as Selectors, actions as Actions,
};
