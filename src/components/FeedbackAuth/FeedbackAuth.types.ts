import { FormikErrors, FormikValues } from 'formik/dist/types';

export interface FeedbackAuthProps {
  value: string;
  themeValue: string;
  emailValue: string;
  isConnected: boolean;
  handlerSubmit: () => void;
  errors: FormikErrors<FormikValues>;
  onChange: (value: string | number, email: string) => void;

  name?: string;
}
