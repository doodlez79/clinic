import { UserStoreTypes } from 'ducks/User/User.types';
import { FormikValues } from 'formik';
import { FormikErrors } from 'formik/dist/types';

export interface ProfileContentAuthProps {
  initialValues: UserStoreTypes['profile'];
  submit: (values: FormikValues) => void;
  clearErrors: () => void

  errors: FormikErrors<UserStoreTypes['profile']>
}
