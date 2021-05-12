import { createReducer } from 'deox';
import produce from 'immer';

import { actionReset } from 'constants/resetAction';
import {
  checkVersion,
  getCities,
  getClinics,
  getDoctorsList,
  getFeedback, getModalBody,
  getServices, multiPhone,
  setLocations,
} from './actions';
import { MiscTypes } from './Misc.types';

const initialState: MiscTypes = {
  loading: false,
  services: {
    allServices: [],
    mainServices: [],
    recordServices: [],
  },
  location: null,
  multiPhone: '',
  clinics: [],
  themesFeedback: [],
  modalBody: [{
    id: '',
    title: '',
    markdown: {
      version: '',
      blocks: [],
      time: 0,
    },
  }],
  version: null,
  cities: [
    {
      id: '',
      name: '',
      center: { lat: 0, lng: 0 },
      radius: 0,
    },
  ],
  doctors: [],
};

const reducer = createReducer(initialState, handleAction => [
  handleAction(
    [
      getCities.request,
      checkVersion.request,
      getClinics.request,
      multiPhone.request,
      getServices.request,
      getModalBody.request,
      getDoctorsList.request,
    ],
    state => produce(state, next => {
      next.loading = true;
    }),
  ),
  handleAction(getCities.successed, (state, action) => produce(state, next => {
    next.loading = false;
    next.cities = action.payload;
  })),
  handleAction(getClinics.successed, (state, action) => produce(state, next => {
    next.loading = false;
    next.clinics = action.payload;
  })),

  handleAction(getServices.successed, (state, action) => produce(state, next => {
    next.loading = false;
    next.services = action.payload;
  })),

  handleAction(getModalBody.successed, (state, action) => produce(state, next => {
    next.loading = false;
    next.modalBody = action.payload;
  })),

  handleAction(getDoctorsList.successed, (state, action) => produce(state, next => {
    next.loading = false;
    next.doctors = action.payload;
  })),

  handleAction(checkVersion.successed, (state, action) => produce(state, next => {
    next.loading = false;
    next.version = action.payload.versions;
  })),

  handleAction(multiPhone.successed, (state, action) => produce(state, next => {
    next.loading = false;
    next.multiPhone = action.payload;
  })),

  handleAction(setLocations, (state, action) => produce(state, next => {
    next.location = action.payload;
  })),

  handleAction(getFeedback.successed, (state, action) => produce(state, next => {
    next.loading = false;
    next.themesFeedback = action.payload;
  })),

  handleAction(
    [
      getCities.failed,
      checkVersion.failed,
      multiPhone.request,
      getClinics.failed,
      getServices.failed,
      getModalBody.failed,
    ],
    state => produce(state, next => {
      next.loading = false;
    }),
  ),
  handleAction([ actionReset ], () => initialState),
]);

export default reducer;
