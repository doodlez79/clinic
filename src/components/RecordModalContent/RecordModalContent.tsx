import React, { FC, useState } from 'react';

import { ModalSelect } from 'components/ModalSelect';
import { NoCityModalContent } from 'components/NoCityModalContent';
import * as Animatable from 'react-native-animatable';

import { RecordModalContentProps } from './RecordModalContent.types';

const RecordModalContent: FC<RecordModalContentProps> = ({
  values,
  setFieldValue,
  cityOptionsPlace,
  clinicsOptions,
  setModalPlace,
  currentStep, allOptionServices,
}) => {
  let refView: any;
  const [ stepForm, setStepForm ] = useState(currentStep);
  let isServiceProduct = false;
  if (values.services) {
    isServiceProduct = allOptionServices.find(el => el.id === values.services)!.isServiceProduct;
  }

  const fadeInRight = (step: number) => {
    setStepForm(step);
    refView.bounceInRight(1200).then((endState: { finished: boolean; }) => (endState.finished ? '' : ''));
  };

  if (stepForm === 0) {
    const cityOptionsPlaceByProduct = clinicsOptions
      .filter(el => el.products.includes(values.services))
      .map(el => el.city && el.city.id);

    const _cityOptions = cityOptionsPlace.map(el => {
      if (!cityOptionsPlaceByProduct.includes(el.value)) {
        return {
          ...el,
          disable: !isServiceProduct,
        };
      }
      return el;
    }).sort(a => {
      if (a?.disable) {
        return 1;
      }
      return -1;
    });
    return (
      <Animatable.View ref={ ref => refView = ref }>
        <ModalSelect
          value={ values.place }
          title="Выбор города"
          options={ _cityOptions }
          onClickItem={ value => {
            fadeInRight(1);
            setFieldValue('place', value);
          } }
        />
      </Animatable.View>

    );
  }
  if (stepForm === 1) {
    const newClinicOptions = clinicsOptions.reduce((acc, item) => {
      if (item.city && item.city.id.toString() === values.place) {
        acc = [
          ...acc,
          {
            value: item.id,
            label: item.address,
            disable: Boolean(
              values.services && !item.products.includes(values.services) && !isServiceProduct,
            ),
          },
        ];
      }
      return acc;
    }, [] as { value: string; label: string; disable: boolean }[]);
    if (newClinicOptions.length === 0) {
      setStepForm(2);
    } else if (newClinicOptions.filter(el => !el.disable).length === 0) {
      setStepForm(2);
    }
    return (
      <Animatable.View
        ref={ ref => refView = ref }
      >
        <ModalSelect
          value={ values.clinic }
          title={ cityOptionsPlace.find(el => el.value === values.place)!.label || '' }
          options={ newClinicOptions }
          linkText="Выбрать город"
          linkPress={ () => fadeInRight(0) }
          onClickItem={ value => {
            setModalPlace();
            setFieldValue('clinic', value);
          } }
        />
      </Animatable.View>
    );
  }
  if (stepForm === 2) {
    return (
      <Animatable.View ref={ ref => refView = ref }>
        <NoCityModalContent linkClick={ () => fadeInRight(0) } />
      </Animatable.View>
    );
  }

  return null;
};

export default RecordModalContent;
