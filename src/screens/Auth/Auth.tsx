import React, { FC, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from 'components/Container';
import { CloseBtn } from 'components/CloseBtn';
import { clearErrors } from 'ducks/Auth/actions';
import { colors } from 'constants/colors';
import { Btn } from 'components/Btn';
import { SizeBtn } from 'components/Btn/Btn.types';
import { Actions, Selectors } from 'ducks';
import RightArrow from 'Icons/RightArrow.svg';
import { Typography } from 'components/Typography';

import { KeyboardAvoidingView } from 'components/KeyboardAvoidingView';
import { ErrorField } from 'components/ErrorField';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik, FormikHelpers } from 'formik';
import { FormikValues } from 'formik/dist/types';
import { ErrorsHandler } from 'helpers/ErrorsHandler/ErrorsHandler';
import { styles } from './styles';
import { AuthScreenProps } from './Auth.types';

const AuthScreen: FC<AuthScreenProps> = ({ navigation }) => {
  const [ focusInput, setFocusInput ] = useState<boolean>(false);

  const dispatch = useDispatch();

  const errMessage = useSelector(Selectors.Auth.isError);
  const loading = useSelector(Selectors.Auth.isLoading);

  const submitPhone = (values:FormikValues, helpers: FormikHelpers<any>) => {
    dispatch(
      Actions.Auth.signIn.authInit.request(values.phone, {
        resolve: clientExist => {
          if (clientExist) {
            navigation.navigate('AuthCode');
          } else {
            navigation.navigate('AuthName');
          }
        },
        reject: err => {
          helpers.setErrors({ phone: err });
        },
      }),
    );
  };

  const closeAuthRout = () => {
    navigation.replace('Main');
  };

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: safeAreaInsets.top }}>
      <KeyboardAvoidingView>
        <Container paddingSize={ 16 }>
          <CloseBtn onClose={ closeAuthRout } />
          <View style={ styles.container }>
            <Typography text="Войти по номеру" fontSize={ 28 } mb={ 32 } />
            <Typography
              text="Чтобы войти или зарегистрироваться введите номер телефона."
              fontSize={ 13 }
              color="#999999"
              regular
              mb={ 32 }
            />
            <Formik
              initialValues={{
                phone: '',
              }}
              onSubmit={ submitPhone }
            >
              {
                ({
                  values, handleSubmit, errors, setErrors, setFieldValue,
                }) => (
                  <>
                    <View style={{
                      marginBottom: 62,
                      width: '100%',
                    }}
                    >
                      <View
                        style={ [
                          focusInput
                            ? {
                              borderColor: colors.green,

                              ...styles.input,
                            }
                            : styles.input,
                          errors.phone
                            ? {
                              borderColor: colors.red,
                            }
                            : null,
                        ] }
                      >
                        <TextInputMask
                          style={{
                            width: '100%',
                            textAlign: 'center',
                          }}
                          autoFocus
                          onFocus={ () => setFocusInput(true) }
                          type="cel-phone"
                          placeholder="+7 (xxx) xxx-xx-xx "
                          options={{
                            dddMask: '+7 (999) 999 99 99 ',
                          }}
                          value={ values.phone }
                          onChangeText={ text => {
                            if (text && errMessage) {
                              dispatch(clearErrors());
                            }
                            setErrors({});

                            if (text.replace(/\D+/g, '').length <= 11) {
                              setFieldValue('phone', `+${text.replace(/\D+/g, '')}`);
                            }
                          } }
                        />
                      </View>
                      {Boolean(errors.phone) && (
                      <>
                        <ErrorField text={ ErrorsHandler(errors.phone as string) } />
                      </>
                      )}

                    </View>
                    <Btn
                      loading={ loading }
                      fullWight
                      disabled={ values.phone.length <= 11 }
                      Title="Далее"
                      onClick={ handleSubmit }
                      size={ SizeBtn.BIG }
                      Icon={ <RightArrow strokeProps="white" /> }
                    />
                  </>
                )

              }
            </Formik>
          </View>

        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;
