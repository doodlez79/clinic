import { generateAsyncActions } from 'helpers/Redux/Redux';
import { createActionCreator } from 'deox';

import {
  City, Clinic, Doctor, FeedBack, MiscTypes, Service, Version,
} from './Misc.types';

const rootPrefix = '@Misc';

/** getCity */
const prefixGetCity = `${rootPrefix}/GET_CITY`;
const getCityActionTypes = generateAsyncActions(prefixGetCity);

export interface GetCityAction {
  type: typeof getCityActionTypes.REQUEST;
}

export interface GetCitySuccessedAction {
  type: typeof getCityActionTypes.SUCCESSED;
  payload: City[];
}

export interface GetCityFailedAction {
  type: typeof getCityActionTypes.FAILED;
  payload: string;
}

const getCities = {
  request: createActionCreator(getCityActionTypes.REQUEST),
  successed: createActionCreator(
    getCityActionTypes.SUCCESSED,
    resolve => (payload: GetCitySuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getCityActionTypes.FAILED,
    resolve => (errorMessage: GetCityFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** getClinics */
const prefixGetClinics = `${rootPrefix}/GET_CLINICS`;
const getClinicsActionTypes = generateAsyncActions(prefixGetClinics);

export interface GetClinics {
  type: typeof getClinicsActionTypes.REQUEST;
}

export interface GetClinicsSuccessedAction {
  type: typeof getClinicsActionTypes.SUCCESSED;
  payload: Clinic[];
}

export interface GetClinicsFailedAction {
  type: typeof getClinicsActionTypes.FAILED;
  payload: string;
}

const getClinics = {
  request: createActionCreator(getClinicsActionTypes.REQUEST),
  successed: createActionCreator(
    getClinicsActionTypes.SUCCESSED,
    resolve => (payload: GetClinicsSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getClinicsActionTypes.FAILED,
    resolve => (errorMessage: GetClinicsFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** getFeedback */
const prefixGetFeedback = `${rootPrefix}/GET_FEEDBACKS`;
const getFeedbackActionTypes = generateAsyncActions(prefixGetFeedback);

export interface GetFeedbackTheme {
  type: typeof getFeedbackActionTypes.REQUEST;
}

export interface GetFeedbackThemeSuccessedAction {
  type: typeof getFeedbackActionTypes.SUCCESSED;
  payload: FeedBack[];
}

export interface GetFeedbackThemeFailedAction {
  type: typeof getFeedbackActionTypes.FAILED;
  payload: string;
}

const getFeedback = {
  request: createActionCreator(getFeedbackActionTypes.REQUEST),
  successed: createActionCreator(
    getFeedbackActionTypes.SUCCESSED,
    resolve => (payload: GetFeedbackThemeSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getFeedbackActionTypes.FAILED,
    resolve => (errorMessage: GetFeedbackThemeFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** getServices */
const prefixGetServices = `${rootPrefix}/GET_SERVICES`;
const getServicesActionTypes = generateAsyncActions(prefixGetServices);

export interface GetServices {
  type: typeof getServicesActionTypes.REQUEST;
}

export interface GetServicesSuccessedAction {
  type: typeof getServicesActionTypes.SUCCESSED;
  payload: {
    mainServices: Service[];
    allServices: Service[];
    recordServices: Service[];
  };
}

export interface GetServicesFailedAction {
  type: typeof getServicesActionTypes.FAILED;
  payload: string;
}

const getServices = {
  request: createActionCreator(getServicesActionTypes.REQUEST),
  successed: createActionCreator(
    getServicesActionTypes.SUCCESSED,
    resolve => (payload: GetServicesSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getServicesActionTypes.FAILED,
    resolve => (errorMessage: GetServicesFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** checkVersion */
const prefixCheckVersion = `${rootPrefix}/CHECK_VERSION`;
const getCheckVersionTypes = generateAsyncActions(prefixCheckVersion);

export interface CheckVersion {
  type: typeof getCheckVersionTypes.REQUEST;
  meta?: {
    resolve: (result: {
      versions : Version
    }) => void;
    reject: () => void;
  };
}

export interface CheckVersionSuccessedAction {
  type: typeof getCheckVersionTypes.SUCCESSED;
  payload: {versions : Version};
}

export interface CheckVersionFailedAction {
  type: typeof getCheckVersionTypes.FAILED;
  payload: string;
}

const checkVersion = {
  request: createActionCreator(getCheckVersionTypes.REQUEST, resolve => (meta: CheckVersion['meta']) => resolve(meta)),
  successed: createActionCreator(
    getCheckVersionTypes.SUCCESSED,
    resolve => (payload: CheckVersionSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getCheckVersionTypes.FAILED,
    resolve => (errorMessage: CheckVersionFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** multiPhone */
const prefixMultiPhone = `${rootPrefix}/MULTI_PHONE`;
const getMultiPhoneTypes = generateAsyncActions(prefixMultiPhone);

export interface MultiPhone {
  type: typeof getMultiPhoneTypes.REQUEST;
}

export interface MultiPhoneSuccessedAction {
  type: typeof getMultiPhoneTypes.SUCCESSED;
  payload: string;
}

export interface MultiPhoneFailedAction {
  type: typeof getMultiPhoneTypes.FAILED;
  payload: string;
}

const multiPhone = {
  request: createActionCreator(getMultiPhoneTypes.REQUEST),
  successed: createActionCreator(
    getMultiPhoneTypes.SUCCESSED,
    resolve => (payload: MultiPhoneSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getMultiPhoneTypes.FAILED,
    resolve => (errorMessage: MultiPhoneFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** modalBody */
const prefixModalBody = `${rootPrefix}/MODAL_BODY`;
const getModalBodyTypes = generateAsyncActions(prefixModalBody);

export interface ModalBody {
  type: typeof getModalBodyTypes.REQUEST;
}

export interface ModalBodySuccessedAction {
  type: typeof getModalBodyTypes.SUCCESSED;
  payload: MiscTypes['modalBody'];
}

export interface ModalBodyFailedAction {
  type: typeof getModalBodyTypes.FAILED;
  payload: string;
}

const getModalBody = {
  request: createActionCreator(getModalBodyTypes.REQUEST),
  successed: createActionCreator(
    getModalBodyTypes.SUCCESSED,
    resolve => (payload: ModalBodySuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getModalBodyTypes.FAILED,
    resolve => (errorMessage: ModalBodyFailedAction['payload']) => resolve(errorMessage),
  ),
};

/** getMiscAll */
const prefixGetMiscAll = `${rootPrefix}/GET_MISC_ALL`;
const getMickAllActionTypes = generateAsyncActions(prefixGetMiscAll);

const getMiscAll = createActionCreator(getMickAllActionTypes.REQUEST);

/** ClearErrors */
const setLocationsType = `${rootPrefix}/SET_LOCATIONS`;
export interface SetLocation {
  type: typeof getServicesActionTypes.REQUEST;
  payload: MiscTypes['location'];
}
const setLocations = createActionCreator(
  setLocationsType,
  resolve => (payload: SetLocation['payload']) => resolve(payload),
);

/** getDoctors */
const prefixGetDoctorsList = `${rootPrefix}/GET_DOCTORS`;
const getDoctorsListActionTypes = generateAsyncActions(prefixGetDoctorsList);

export interface GetDoctorsList {
  type: typeof getDoctorsListActionTypes.REQUEST;
}

export interface GetDoctorsListSuccessedAction {
  type: typeof getDoctorsListActionTypes.SUCCESSED;
  payload: Doctor[]
}

export interface GetDoctorsListFailedAction {
  type: typeof getDoctorsListActionTypes.FAILED;
  payload: string;
}

const getDoctorsList = {
  request: createActionCreator(getDoctorsListActionTypes.REQUEST),
  successed: createActionCreator(
    getDoctorsListActionTypes.SUCCESSED,
    resolve => (payload: GetDoctorsListSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    getDoctorsListActionTypes.FAILED,
    resolve => (errorMessage: GetDoctorsListFailedAction['payload']) => resolve(errorMessage),
  ),
};

export {
  getCities,
  getClinics,
  getFeedback,
  getServices,
  setLocations,
  getMiscAll,
  checkVersion,
  multiPhone,
  getModalBody,
  getDoctorsList,
};
