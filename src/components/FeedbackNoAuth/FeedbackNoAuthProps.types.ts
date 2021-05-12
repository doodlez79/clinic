import { FormikErrors, FormikValues } from 'formik/dist/types';

export interface FeedbackNoAuthProps {
  nameValue: string;
  emailValue: string;
  descriptionValue: string;
  themeValue: string;
  onChange: (value: string | number, nameField: string) => void;
  handlerSubmit: () => void;
  errors: FormikErrors<FormikValues>;
  isConnected: boolean
}
