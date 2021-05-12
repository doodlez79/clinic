import { eventChannel } from 'redux-saga';
import { ActionType } from 'deox';
import {
  fork,
  call,
  put,
  delay,
  putResolve,
  take,
  takeLatest,
  cancelled,
  getContext,
} from 'redux-saga/effects';

import ApiServices from 'services/Api/Api';
import { clearUserInformation, setUserName } from 'ducks/User/actions';

import {
  cancelAuth, reSend, signIn, signOut,
} from './actions';

function createAPIServiceAuthErrorEventChannel(apiService: ApiServices) {
  return eventChannel(emitter => {
    const unsubscribe = apiService.addErrorHandler((response: Response) => {
      emitter(response.status === 403);

      return Promise.reject();
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  });
}

function* apiServiceAuthErrorTask() {
  const apiService = yield getContext('api');
  const apiServiceAuthErrorEventChannel = yield call(
    createAPIServiceAuthErrorEventChannel,
    apiService,
  );

  try {
    while (true) {
      const is403 = yield take(apiServiceAuthErrorEventChannel);

      if (is403) {
        yield putResolve(signOut.successed());
      }
    }
  } finally {
    if (yield cancelled()) {
      apiServiceAuthErrorEventChannel.close();
    }
  }
}

function* authInitTask(action: ActionType<typeof signIn.authInit.request>) {
  const { resolve, reject } = action.meta;

  const authService = yield getContext('auth');

  try {
    const {
      session,
      clientExist,
      code,
      user: { name: userName },
    } = yield call([ authService, 'authInit' ], {
      phone: action.payload,
    });

    if (userName) {
      yield put(setUserName(userName));
    }

    yield put(
      signIn.authInit.successed({
        session,
        phone: action.payload,
        clientExist,
        renewAfter: code ? code.renewAfter : 60,
      }),
    );

    if (resolve) {
      resolve(clientExist);
    }
  } catch (err) {
    yield put(signIn.authInit.failed(null));

    if (reject) {
      reject(err.data.error);
    }
  }
}

function* getCodeTask(action: ActionType<typeof signIn.getCode.request>) {
  const authService = yield getContext('auth');
  const { tokenSession, name: userName } = action.payload;
  const { resolve, reject } = action.meta;

  try {
    const {
      code: { renewAfter },
    } = yield call([ authService, 'authSingUp' ], tokenSession, userName);

    if (userName) {
      yield put(setUserName(userName));
    }
    yield put(signIn.getCode.successed({ renewAfter }));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    const errMsg = err.message;
    yield put(signIn.getAccessToken.failed(errMsg));
    if (reject) {
      reject();
    }
  }
}

function* reSendCodeTask(action: ActionType<typeof reSend.request>) {
  const authService = yield getContext('auth');
  const { resolve } = action.meta;

  try {
    const {
      code: { renewAfter },
    } = yield call([ authService, 'resendCode' ], action.payload);
    yield put(reSend.successed({ renewAfter }));
    if (resolve) {
      resolve(renewAfter);
    }
  } catch (err) {
    const errMsg = err.message;
    yield put(reSend.failed(errMsg));
  }
}

function* cancelAuthTask(action: ActionType<typeof cancelAuth.request>) {
  const authService = yield getContext('auth');
  const { resolve, reject } = action.meta;

  try {
    yield call([ authService, 'cancelAuth' ], action.payload);

    yield put(cancelAuth.successed());
    yield put(setUserName(''));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    const errMsg = err.message;
    yield put(signIn.getAccessToken.failed(errMsg));
    if (reject) {
      reject();
    }
  }
}

function* signInGetAccessTokenTask(
  action: ActionType<typeof signIn.getAccessToken.request>,
) {
  const authService = yield getContext('auth');
  const apiService = yield getContext('api');

  const { uuid, code } = action.payload;

  const { resolve, reject } = action.meta;

  try {
    const { token: accessToken } = yield call(
      [ authService, 'getAccessToken' ],
      uuid,
      code,
    );
    yield call([ apiService, 'setAccessToken' ], accessToken);
    yield put(signIn.getAccessToken.successed({ accessToken }));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    const errMsg = err.data.type === 'errorText' ? err.data.error : 'Не верный код!';
    yield put(signIn.getAccessToken.failed(errMsg));
    if (reject) {
      reject();
    }
  }
}

function* signOutTask(action: ActionType<typeof signOut.request>) {
  const authService = yield getContext('auth');
  const apiService = yield getContext('api');
  const { resolve, reject } = action.meta;

  try {
    yield call([ authService, 'signOut' ]);
    yield call([ apiService, 'setAccessToken' ], '');
    if (resolve) {
      resolve();
    }
    yield delay(500);
    yield put(clearUserInformation());
    yield put(signOut.successed());
  } catch (err) {
    yield put(signOut.failed(err));
    if (reject) {
      reject();
    }
  }
}

export default function* () {
  yield fork(apiServiceAuthErrorTask);

  yield takeLatest(signIn.authInit.request, authInitTask);
  yield takeLatest(cancelAuth.request, cancelAuthTask);
  yield takeLatest(reSend.request, reSendCodeTask);
  yield takeLatest(signIn.getCode.request, getCodeTask);
  yield takeLatest(signIn.getAccessToken.request, signInGetAccessTokenTask);
  yield takeLatest(signOut.request, signOutTask);
}
