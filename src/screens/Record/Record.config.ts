import * as Yup from 'yup';

export const RecordSchema = Yup.object().shape({
  services: Yup.string(),
  clinic: Yup.string(),
});
