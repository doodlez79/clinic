/*
  THIS IS THE FINAL VERSION OF THIS FILE
  DO NOT CHANGE OR YOU WILL BE FIRED
*/

import 'react-native-get-random-values';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Sentry from 'sentry-expo';

import { registerRootComponent } from 'expo';
import { enableScreens } from 'react-native-screens';

import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { configureStore } from 'store';

import { Root } from 'containers/Root';
import PersistContext from 'helpers/PersistContext/PersistContext';

SplashScreen.preventAutoHideAsync().catch(() => {});
enableScreens(false);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

Sentry.init({
  dsn: 'https://761914e371f7445c99f42707bfad9751@o448858.ingest.sentry.io/5556193',
  enableInExpoDevelopment: false,
  debug: false,
});

const { store, persistor } = configureStore({});

const App = () => (
  <>
    {/* eslint-disable-next-line react/style-prop-object */}
    <StatusBar animated style="dark" />
    <Provider store={ store }>
      <PersistContext.Provider value={ persistor }>
        <PersistGate loading={ null } persistor={ persistor }>
          {
            bootstrap => (bootstrap ? <Root /> : null)
          }

        </PersistGate>
      </PersistContext.Provider>
    </Provider>
  </>
);

registerRootComponent(App);
