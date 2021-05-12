import React, { FC, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';

import { Typography } from 'components/Typography';
import { InputField } from 'components/InputField';
import { Btn } from 'components/Btn';
import { SizeBtn } from 'components/Btn/Btn.types';
import { LinkText } from 'components/LinkText';
import { ModalComponent } from 'components/Modal';
import { ModalSelect } from 'components/ModalSelect';

import { RecordModalContent } from 'components/RecordModalContent';
import { RecordSchema } from 'screens/Record/Record.config';
import { useSelector } from 'react-redux';
import { Selectors } from 'ducks';
import { perfectSize } from 'helpers/perfectSize';

import { LinkingURLService } from 'services';
import { RECORD_TYPE } from 'navigation/Navigation.types';
import { RecordAuthProps } from './RecordAuth.types';

const RecordAuth: FC<RecordAuthProps> = ({
  name,
  loading,
  city,
  submitRecord,
  servicesValue = '',
  optionServices,
  allOptionServices,
  cityOptionsPlace,
  clinicsOptions,
  clinicId,
  type,
}) => {
  const [ modalServices, setModalServices ] = useState(false);
  const [ modalPlace, setModalPlace ] = useState(false);
  const [ startStepForm, setStartStepForm ] = useState(0);
  const multiPhone = useSelector(Selectors.Misc.getMultiPhone);
  const isConnected = useSelector(Selectors.App.isConnection);

  useEffect(() => {
    if (city) {
      setStartStepForm(1);
    }
  }, [ city ]);

  const renderText = () => {
    let result: string | React.ReactNode = '';

    if (type === RECORD_TYPE.CLINIC) {
      const clinicInfo = clinicsOptions.find(el => el.id === clinicId)
        ? clinicsOptions.find(el => el.id === clinicId)!
        : '';
      // eslint-disable-next-line max-len
      const text = `${clinicInfo ? `г. ${clinicInfo.city!.shortCityName}` : ''}, ${clinicInfo ? clinicInfo.address : ''}`;

      result = (
        <Typography>
          <Typography fontSize={ 13 } color="#999999" regular text=" по адресу " />
          <Typography
            text={ text }
            fontSize={ 13 }
            color="#999999"
          />
        </Typography>
      );
    }

    if (type === RECORD_TYPE.SERVICE) {
      const servicesName = allOptionServices.find(el => el.id === servicesValue)
        ? allOptionServices.find(el => el.id === servicesValue)!.name
        : '';
      result = (
        <Typography>
          <Typography fontSize={ 13 } color="#999999" regular text=" на " />
          <Typography text={ `${servicesName}` } fontSize={ 13 } color="#999999" />
        </Typography>
      );
    }
    return result;
  };

  const serviceProduct = allOptionServices.find(el => el.isServiceProduct);

  return (
    <View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Typography
          fontSize={ 13 }
          color="#999999"
          regular
          align="center"
          mb={ 64 }
          style={{
            maxWidth: perfectSize(280),
          }}
        >
          {name && (
            <Typography fontSize={ 13 } color="#999999">
              {`${name}, `}
            </Typography>
          )}

          <Typography regular fontSize={ 13 } color="#999999">
            <Typography fontSize={ 13 } color="#999999" regular text="Вы можете записаться в клинику" />
            {renderText()}
            <Typography color="#999999" fontSize={ 13 } regular text=" через заказ обратного звонка" />
          </Typography>
        </Typography>
      </View>
      <View>
        <Formik
          validationSchema={ RecordSchema }
          initialValues={{
            services: clinicId ? serviceProduct!.id : servicesValue,
            place: city?.id,
            clinic: clinicId,
          }}
          enableReinitialize
          validateOnChange={ false }
          onSubmit={ values => {
            submitRecord(values);
          } }
        >
          {({
            setFieldValue, handleSubmit, values, errors,
          }) => {
            const newOptionServices = optionServices.filter(el => {
              if (clinicId && !el.isServiceProduct) {
                return el.clinics.includes(clinicId);
              }
              return true;
            }).map(item => ({
              label: item.name,
              value: item.id,
            }));
            let clinics;

            if (values.services) {
              // eslint-disable-next-line max-len
              clinics = clinicsOptions.filter(el => el.city && el.city.id === city?.id && el.products.includes(values.services));

              if (clinics.length === 1 && values.clinic !== clinics[0].id && city!.id === values.place) {
                setFieldValue('clinic', clinics[0].id);
              }
            }

            return (
              <>
                <View
                  style={{
                    marginBottom: 64,
                  }}
                >
                  {
                    (type === RECORD_TYPE.CLINIC || type === RECORD_TYPE.DEFAULT) && (
                      <InputField
                        error={ errors.services }
                        editFlagProps={ false }
                        label="Услуга"
                        value={ newOptionServices.find(el => el.value === values.services)
                          ? newOptionServices.find(
                            el => el.value === values.services,
                          )!.label
                          : '' }
                        placeholder="Не выбрано"
                        onClick={ () => setModalServices(true) }
                      />
                    )
                  }
                  {
                    (type === RECORD_TYPE.SERVICE || type === RECORD_TYPE.DEFAULT) && (
                      <InputField
                        error={ errors.clinic }
                        label="Клиника"
                        disable={ !values.services }
                        editFlagProps={ false }
                        value={ clinicsOptions.find(
                          el => el.id === values.clinic,
                        )
                          ? clinicsOptions.find(
                            el => el.id.toString() === values.clinic,
                          )!.address
                          : '' }
                        placeholder="Не выбрано"
                        onClick={ () => setModalPlace(true) }
                      />
                    )
                  }

                </View>
                <View
                  style={{
                    marginBottom: perfectSize(32),
                  }}
                >
                  <Btn
                    loading={ loading }
                    disabled={ Boolean(!values.clinic && !values.services) || !isConnected }
                    fullWight
                    Title="Заказать обратный звонок"
                    onClick={ () => {
                      handleSubmit();
                    } }
                    size={ SizeBtn.BIG }
                  />
                </View>

                <LinkText text="Позвонить" onClick={ () => LinkingURLService.callPhone(multiPhone) } />
                <ModalComponent
                  setModalVisible={ () => setModalPlace(false) }
                  modalVisible={ modalPlace }
                >
                  <RecordModalContent
                    allOptionServices={ allOptionServices }
                    optionServices={ optionServices }
                    cityOptionsPlace={ cityOptionsPlace }
                    clinicsOptions={ clinicsOptions }
                    currentStep={ startStepForm }
                    setModalPlace={ () => setModalPlace(false) }
                    values={ values }
                    setFieldValue={ setFieldValue }
                  />
                </ModalComponent>
                <ModalComponent
                  setModalVisible={ () => setModalServices(false) }
                  modalVisible={ modalServices }
                >
                  <ModalSelect
                    value={ values.services }
                    title="Выбор услуги"
                    options={ newOptionServices }
                    onClickItem={ value => {
                      setModalServices(false);
                      setFieldValue('services', value);
                      if (type !== RECORD_TYPE.CLINIC) {
                        setFieldValue('clinic', '');
                      }
                    } }
                  />
                </ModalComponent>
              </>
            );
          }}
        </Formik>
      </View>
    </View>
  );
};

export default RecordAuth;
