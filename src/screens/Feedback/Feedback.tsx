import React, { FC } from 'react';
import { Formik, FormikValues } from 'formik';
import { View, SafeAreaView } from 'react-native';

import { Container } from 'components/Container';
import { KeyboardAvoidingView } from 'components/KeyboardAvoidingView';
import { Title } from 'components/Title';
import { CloseBtn } from 'components/CloseBtn';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';
import { FeedbackAuth } from 'components/FeedbackAuth';
import { FeedbackNoAuth } from 'components/FeedbackNoAuth';

import { FeedbackSchema } from 'screens/Feedback/Feedback.config';
import { FeedbackProps } from './Feedback.types';

const FeedbackScreen: FC<FeedbackProps> = ({ navigation }) => {
  const isAuth = useSelector(Selectors.Auth.isAuthorized);
  const profile = useSelector(Selectors.User.isProfile);
  const isConnected = useSelector(Selectors.App.isConnection);
  const dispatch = useDispatch();

  const onSubmitForm = (values: FormikValues) => {
    dispatch(
      Actions.RecordFeedback.sendFeedBack.request(
        {
          description: values.description,
          email: values.email || profile.email,
          name: values.name || profile.name,
          subjectId: values.theme,
        },
        {
          resolve: () => {
            navigation.navigate('FeedbackSuccess');
          },
          reject: () => {},
        },
      ),
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 24 }}>
      <KeyboardAvoidingView>
        <Container paddingSize={ 8 }>
          <CloseBtn onClose={ () => navigation.goBack() } />
          <View
            style={{
              marginTop: 24,
            }}
          >
            <Title title="Обратная связь" />
          </View>
          <View>
            <Formik
              validationSchema={ FeedbackSchema(isAuth) }
              initialValues={{
                name: profile.name || '',
                description: '',
                email: profile.email || '',
                theme: '',
              }}
              validateOnChange={ false }
              onSubmit={ onSubmitForm }
            >
              {({
                handleSubmit, values, setFieldValue, errors,
              }) => (
                <Container paddingSize={ 8 }>
                  {isAuth ? (
                    <FeedbackAuth
                      isConnected={ isConnected }
                      errors={ errors }
                      themeValue={ values.theme }
                      emailValue={ values.email }
                      handlerSubmit={ handleSubmit }
                      onChange={ (value, field) => setFieldValue(field, value) }
                      name={ profile.name }
                      value={ values.description }
                    />
                  ) : (
                    <FeedbackNoAuth
                      isConnected={ isConnected }
                      errors={ errors }
                      handlerSubmit={ handleSubmit }
                      themeValue={ values.theme }
                      nameValue={ values.name }
                      descriptionValue={ values.description }
                      emailValue={ values.email }
                      onChange={ (value, nameField) => setFieldValue(nameField, value) }
                    />
                  )}
                </Container>
              )}
            </Formik>
          </View>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FeedbackScreen;
