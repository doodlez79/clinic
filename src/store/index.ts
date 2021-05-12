import Constants from 'expo-constants';

import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import {
  persistReducer,
  persistStore,

  PersistConfig,
  PersistedState,

  DEFAULT_VERSION as PERSIST_DEFAULT_VERSION,
} from 'redux-persist';

import { composeWithDevTools } from 'redux-devtools-extension';

import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer, { saga, Actions, State } from 'ducks';

import * as Services from 'services';

import { actionReset } from 'constants/resetAction';
import createTransform from 'redux-persist/es/createTransform';
import { setDateMap } from 'helpers/SetDate/SetDate';

const setDate = createTransform(
  state => ({ ...setDateMap(state) }),
);

export const configureStore = (initialState: any) => {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      api: Services.API,
      auth: Services.AuthService,
      user: Services.UserService,
      promo: Services.PromoService,
      news: Services.NewsService,
      misc: Services.MiscServices,
      recordFeedback: Services.RecordFeedbackServices,
      notifications: Services.NotificationsService,
      bonuses: Services.BonusesServices,
      develop: Services.DevelopService,
    },
  });

  const persistConfig: PersistConfig<State> = {
    key: 'root',
    version: Constants.manifest.extra.version.buildNumber,
    storage: AsyncStorage,
    whitelist: [ 'auth', 'notification', 'misc', 'user', 'promo', 'develop', 'firstVisit', 'app' ],
    transforms: [ setDate ],
    migrate: (persistedState, version) => {
      const state = persistedState as PersistedState & State;
      const persistedVersion = persistedState?._persist.version || PERSIST_DEFAULT_VERSION;

      const isApiEndpointChanged = state.develop.changeUrl;
      const isVersionChanged = version !== persistedVersion;

      const needToReset = isApiEndpointChanged || isVersionChanged;
      const needToHardReset = isApiEndpointChanged;

      if (needToReset) {
        const { _persist, ...stateToReset } = state;

        return Promise.resolve(rootReducer(stateToReset, actionReset(needToHardReset)) as PersistedState & State);
      }

      return Promise.resolve(state);
    },
  };

  const middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const persistReducerStore = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistReducerStore, initialState, middlewares);
  const persistor = persistStore(store, null, () => {
    store.dispatch(Actions.App.appInit.request());
  });

  sagaMiddleware.run(saga);

  return {
    persistor,
    store,
  };
};
