import * as Yup from 'yup';

export const FeedbackSchema = (auth: boolean) => Yup.object().shape({
  theme: Yup.string().required('Выберите тему'),
  name: Yup.string()[auth ? 'notRequired' : 'required'](auth ? '' : 'Введите имя'),
  email: Yup.string().email('Некорректная форма email').required('Заполните email'),
  description: Yup.string().required('Заполните описание'),
});
