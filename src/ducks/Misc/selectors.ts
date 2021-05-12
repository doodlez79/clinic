import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getMisc = (state: StoreTypes) => state.misc;

export const isLoading = createSelector(getMisc, misc => misc.loading);
export const getDoctorsList = createSelector(getMisc, misc => misc.doctors);
export const getCities = createSelector(getMisc, city => city.cities);
export const getClinics = createSelector(getMisc, city => city.clinics);
export const getLocation = createSelector(getMisc, city => city.location);
export const getVersions = createSelector(getMisc, city => city.version);
export const getModalBody = createSelector(getMisc, city => city.modalBody);
export const getMultiPhone = createSelector(getMisc, city => city.multiPhone);
export const getMainServices = createSelector(
  getMisc,
  misc => misc.services.mainServices,
);

export const allServices = createSelector(
  getMisc,
  misc => misc.services.allServices,
);
export const getRecordServices = createSelector(
  getMisc,
  misc => misc.services.recordServices,
);
export const getFeedBackThemes = createSelector(
  getMisc,
  misc => misc.themesFeedback,
);

export const getDoctors = createSelector((state: StoreTypes) => state, (state: StoreTypes) => {
  const { doctors } = state.misc;
  const currentCity = state.user.profile;

  const doctorsByCity = doctors?.filter(el => el.city.id === currentCity?.city?.id);

  return doctorsByCity;
});
