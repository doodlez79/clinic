import { ERRORS_CONFIG } from 'constants/errorsConfig';

export const ErrorsHandler = (value: string) => {
  if (ERRORS_CONFIG[value]) {
    return ERRORS_CONFIG[value];
  }
  return ERRORS_CONFIG.defaultError;
};
