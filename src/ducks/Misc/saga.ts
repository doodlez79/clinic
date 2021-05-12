import {
  call, put, takeLatest, getContext,
} from 'redux-saga/effects';

import { filterServicesProducts } from 'helpers/filterServicesProducts/filterServicesProducts';
import { ActionType } from 'deox';
import {
  checkVersion,
  getCities,
  getClinics,
  getDoctorsList,
  getFeedback,
  getMiscAll, getModalBody,
  getServices,
  multiPhone,
} from './actions';

function* getCitiesTask() {
  const miscServices = yield getContext('misc');

  try {
    const result = yield call([ miscServices, 'getCities' ]);

    yield put(getCities.successed(result));
  } catch (err) {
    const errMsg = err.message[0];

    yield put(getCities.failed(errMsg));
  }
}

function* getClinicsTask() {
  const miscServices = yield getContext('misc');

  try {
    const result = yield call([ miscServices, 'getClinics' ]);

    yield put(getClinics.successed(result));
  } catch (err) {
    const errMsg = err.message[0];

    yield put(getClinics.failed(errMsg));
  }
}

function* getDoctorsListTask() {
  const miscServices = yield getContext('misc');
  try {
    const result = yield call([ miscServices, 'getDoctorsList' ]);
    yield put(getDoctorsList.successed(result));
  } catch (err) {
    yield put(getDoctorsList.failed(err));
  }
}

function* getMultiPhoneTask() {
  const miscServices = yield getContext('misc');

  try {
    const { multichannelPhone } = yield call([ miscServices, 'getMultiPhone' ]);

    yield put(multiPhone.successed(multichannelPhone));
  } catch (err) {
    const errMsg = err.message[0];

    yield put(multiPhone.failed(errMsg));
  }
}

function* getFeedbackTask() {
  const miscServices = yield getContext('misc');

  try {
    const result = yield call([ miscServices, 'getFeedbackThemes' ]);

    yield put(getFeedback.successed(result));
  } catch (err) {
    const errMsg = err.message[0];

    yield put(getFeedback.failed(errMsg));
  }
}

function* getModalBodyTask() {
  const miscServices = yield getContext('misc');

  try {
    const result = yield call([ miscServices, 'getModalBody' ]);

    yield put(getModalBody.successed(result));
  } catch (err) {
    const errMsg = err.message[0];

    yield put(getModalBody.failed(errMsg));
  }
}

function* getServicesTask() {
  const miscServices = yield getContext('misc');

  try {
    const result = yield call([ miscServices, 'getServices' ]);
    const dataTest = filterServicesProducts(result);
    yield put(
      getServices.successed(
        dataTest || {
          allServices: [],
          mainServices: [],
          recordServices: [],
        },
      ),
    );
  } catch (err) {
    const errMsg = err.message[0];
    yield put(getServices.failed(errMsg));
  }
}

function* checkVersionTask(action: ActionType<typeof checkVersion.request>) {
  const miscServices = yield getContext('misc');

  const { resolve, reject } = action.payload;

  try {
    const result = yield call([ miscServices, 'checkVersion' ]);

    yield put(checkVersion.successed(result));

    if (resolve) {
      resolve(result);
    }
  } catch (err) {
    if (reject) {
      reject();
    }
    const errMsg = err.message[0];

    yield put(getServices.failed(errMsg));
  }
}

function* getMiscTask() {
  yield call(getCitiesTask);
  yield call(getClinicsTask);
  yield call(getFeedbackTask);
  yield call(getServicesTask);
  yield call(getDoctorsListTask);
  yield call(getMultiPhoneTask);
  yield call(getModalBodyTask);
}

export default function* () {
  yield takeLatest(getCities.request, getCitiesTask);
  yield takeLatest(getClinics.request, getClinicsTask);
  yield takeLatest(checkVersion.request, checkVersionTask);
  yield takeLatest(getFeedback.request, getFeedbackTask);
  yield takeLatest(getServices.request, getServicesTask);
  yield takeLatest(getDoctorsList.request, getDoctorsListTask);
  yield takeLatest(getMiscAll, getMiscTask);
  yield takeLatest(getModalBody.request, getModalBodyTask);
  yield takeLatest(multiPhone.request, getMultiPhoneTask);
}
