import { FormikErrors } from 'formik/dist/types';

export interface AuthTypes {
  loading: boolean;
  isAuthorized: boolean;
  accessToken: string | undefined;
  token: string | undefined;
  clientExist: boolean;

  renewAfter?: number;
  error?: FormikErrors<any> | null | string;
  phone?: string;
}
