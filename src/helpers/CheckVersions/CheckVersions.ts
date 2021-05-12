import { MiscTypesVersions, Version } from 'ducks/Misc/Misc.types';
import { Actions } from 'ducks';
import { Dispatch } from 'redux';

export const checkVersionFunc = (newVersion: Version, oldVersion:Version, dispatch: Dispatch) => {
  const miscRequestTypes = {
    [MiscTypesVersions.CITIES]: () => dispatch(Actions.Misc.getCities.request()),
    [MiscTypesVersions.CLINICS]: () => dispatch(Actions.Misc.getClinics.request()),
    [MiscTypesVersions.PRODUCTS]: () => dispatch(Actions.Misc.getServices.request()),
    [MiscTypesVersions.FEEDBACK_SUBJECTS]: () => dispatch(Actions.Misc.getFeedback.request()),
    [MiscTypesVersions.MULTI_PHONE]: () => dispatch(Actions.Misc.multiPhone.request()),
    [MiscTypesVersions.MODAL_BODIES]: () => dispatch(Actions.Misc.getModalBody.request()),
    [MiscTypesVersions.DOCTORS]: () => dispatch(Actions.Misc.getDoctorsList.request()),
  };

  (Object.keys(newVersion) as MiscTypesVersions[]).forEach(key => {
    if (newVersion[key] !== oldVersion[key]) {
      miscRequestTypes[key]();
    }
  });
};
