import * as Yup from 'yup';

export const ProfileSchema = Yup.object().shape({
  email: Yup.string().email('Неверно заполнен email').nullable(),
});
