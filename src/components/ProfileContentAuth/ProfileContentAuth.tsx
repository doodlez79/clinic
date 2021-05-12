import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { Formik } from 'formik';
import {
  AppState, Dimensions, Linking, Platform, View,
} from 'react-native';
import { useSelector } from 'react-redux';

import { TextField } from 'components/TextField';
import { InputField } from 'components/InputField';
import { Typography } from 'components/Typography';
import { alignTextConfig } from 'components/Typography/Typography.types';
import { CustomCheckbox } from 'components/CustomCheckbox';
import { Btn } from 'components/Btn';
import ProfileError from 'Icons/ProfileError.svg';
import Error from 'Icons/Error.svg';
import { ModalComponent } from 'components/Modal';
import { ModalSelect } from 'components/ModalSelect';
import { Selectors } from 'ducks';
import { bySelectedType } from 'helpers/BySelectedType/BySelectedType';
import { SEX_TYPE } from 'screens/Profile/Profile.types';

import { ProfileSchema } from 'components/ProfileContentAuth/ProfileContentAuth.config';
import { perfectSize } from 'helpers/perfectSize';
import { useFocusEffect } from '@react-navigation/native';
import { PushNotificationService } from 'services';
import { ContentNoAuth } from 'components/ContentNoAuth';
import { FORMAT } from 'constants/formatDate';
import { format } from 'date-fns';
import { ErrorsHandler } from 'helpers/ErrorsHandler/ErrorsHandler';
import { ProfileContentAuthProps } from './ProfileContentAuth.types';

const valueByTypeSex = {
  [SEX_TYPE.MALE]: 'Мужской',
  [SEX_TYPE.FEMALE]: 'Женский',
};
const { width } = Dimensions.get('window');

const ProfileContentAuth: FC<ProfileContentAuthProps> = ({
  initialValues,
  submit,
  errors: errorsFrom,
  clearErrors,
}) => {
  const [ modalCity, setModalCity ] = useState(false);
  const cities = useSelector(Selectors.Misc.getCities);
  const loading = useSelector(Selectors.User.isLoading);
  const isConnected = useSelector(Selectors.App.isConnection);
  const [ statusNotifications, setStatusNotifications ] = useState('');
  const [ settingModal, setSettingModal ] = useState(false);

  const handlerStatusNotification = async () => {
    const status = await PushNotificationService.getPermissionNotifications();
    setStatusNotifications(status);
  };

  useFocusEffect(useCallback(() => {
    (async () => {
      handlerStatusNotification();
    })();
  }, []));

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      // console.log(NativeModules, "NativeModules")
      // RNAndroidOpenSettings();
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', () => {
      handlerStatusNotification();
    });

    return AppState.removeEventListener('change', () => {
      handlerStatusNotification();
    });
  }, []);

  return (
    <>
      <Formik
        validationSchema={ ProfileSchema }
        initialValues={ initialValues }
        enableReinitialize
        onSubmit={ values => {
          submit(values);
        } }
      >
        {({
          setFieldValue, handleSubmit, values, dirty, setErrors,
        }) => (
          <>
            {Boolean(values.phone) && (
            <TextField label="Номер телефона" text={ values.phone } />
            )}
            <InputField
              status={ values.emailAwaitingConfirmation ? 'warning' : '' }
              label="E-mail"
              error={ errorsFrom && Array.isArray(errorsFrom.email) ? ErrorsHandler(errorsFrom.email[0]) : '' }
              value={ values.email || '' }
              placeholder="E-mail"
              autoCompleteType="email"
              setError={ () => setErrors({}) }
              onChange={ e => {
                clearErrors();
                setFieldValue('email', e || '');
              } }
            />
            {values.emailAwaitingConfirmation && (
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Error strokeProps="#FFBA00" />
              <Typography
                ml={ 5 }
                color="#FFBA00"
                regular
                fontSize={ 13 }
                text={ `${values.emailAwaitingConfirmation} ожидает подверждения` }
              />
            </View>
            )}
            <InputField
              disableEdit
              editFlagProps={ false }
              label="Город"
              value={ values.city && cities.find(el => el.id === values.city!.id)
                ? cities.find(el => el.id === values.city!.id)!.name
                : '' }
              placeholder="Не выбрано"
              onClick={ () => setModalCity(true) }
            />
            {Boolean(values.surname) && (
            <TextField label="Фамилия" text={ values.surname } />
            )}
            {Boolean(values.name) && (
            <TextField label="Имя" text={ values.name } />
            )}
            {Boolean(values.patronymic) && (
            <TextField label="Отчество" text={ values.patronymic } />
            )}
            {Boolean(values.sex) && values.sex && (
            <TextField label="Пол" text={ valueByTypeSex[values.sex] } />
            )}
            {Boolean(values.birthDate) && (
            <TextField
              label="Дата рождения"
              text={ values.birthDate ? format(values.birthDate, FORMAT) : '' }
            />
            )}

            {!values.isProfileCompleted && (
            <View
              style={{
                marginVertical: 40,
                alignItems: 'center',
              }}
            >
              <ProfileError />
              <Typography
                color="#999"
                text="Мы заполним за Вас данные во время первого визита в клинику"
                align={ alignTextConfig.CENTER }
                style={{
                  maxWidth: perfectSize(190),
                }}
                regular
                mt={ 10 }
                fontSize={ 13 }
              />
            </View>
            )}
            <View style={{ marginBottom: 20 }}>
              <Typography
                text="Настройка уведомлений:"
                color="#999999"
                ml={ 8 }
                mb={ 16 }
                regular
                fontSize={ 13 }
                align="left"
              />
              <CustomCheckbox
                value={ values.settings.smsNotifications }
                text="Получать SMS-уведомления"
                onChange={ () => setFieldValue(
                  'settings.smsNotifications',
                  !values.settings.smsNotifications,
                ) }
              />
              <CustomCheckbox
                value={ values.settings.emailNotifications }
                disabled={ Boolean(!initialValues.email) }
                text="Получать уведомления на электронную почту"
                onChange={ () => setFieldValue(
                  'settings.emailNotifications',
                  !values.settings.emailNotifications,
                ) }
              />
              <CustomCheckbox
                value={ values.settings.pushNotifications }
                text="Получать Push-уведомления"
                onChange={ () => {
                  if (statusNotifications !== 'granted') {
                    setSettingModal(true);
                  } else {
                    setFieldValue(
                      'settings.pushNotifications',
                      !values.settings.pushNotifications,
                    );
                  }
                } }
              />
            </View>
            {dirty && (
            <View style={{ width: '100%' }}>
              <Btn
                loading={ loading }
                fullWight
                disabled={ !isConnected }
                Title="Сохранить"
                onClick={ handleSubmit }
              />
            </View>
            )}
            <ModalComponent
              setModalVisible={ () => setModalCity(false) }
              modalVisible={ modalCity }
            >
              <ModalSelect
                value={ values.city ? values.city.id : '' }
                title="Выбор города"
                options={ bySelectedType(cities) }
                onClickItem={ value => {
                  setModalCity(false);
                  setFieldValue('city', { id: value });
                } }
              />
            </ModalComponent>
            <ModalComponent
              width={ width }
              setModalVisible={ () => setSettingModal(false) }
              modalVisible={ settingModal }
            >
              <View style={{
                marginBottom: 30,
              }}
              >
                <ContentNoAuth
                  textBtn="Настройки"
                  onClick={ () => {
                    setSettingModal(false);
                    openAppSettings();
                  } }
                  text="Необходимо пройти в настройки, чтобы начать получать уведомления"
                />
              </View>

            </ModalComponent>
          </>
        )}
      </Formik>
    </>
  );
};

export default ProfileContentAuth;
