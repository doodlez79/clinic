import React, { FC, useEffect, useState } from 'react';
import {
  View, Dimensions, FlatList, Platform,
} from 'react-native';

import { ModalSelect } from 'components/ModalSelect';
import { NoCityModalContent } from 'components/NoCityModalContent';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { MapListClinics } from 'components/MapListClinics';

import { perfectSize } from 'helpers/perfectSize';
import { ContentMapModalProps } from './ContentMapModal.types';

const ContentMapModal:FC<ContentMapModalProps> = ({
  setModalList,
  clinicsByCity,
  clinics,
  city,
  cityOptionsPlace,
  moveCameraToLocation,
  cities,
  selectedHandlerCity,
  currentStep,
}) => {
  const [ stepForm, setStepForm ] = useState(currentStep);
  const [ selectedCity, setSelectedCity ] = useState(city?.id || '');

  let newClinicsData = clinicsByCity;

  useEffect(() => {
    newClinicsData = clinics.filter(el => el.city && el.city.id === selectedCity);
    setStepForm(newClinicsData.length > 0 ? 1 : 2);
  }, [ selectedCity as string ]);

  if (stepForm === 0) {
    return (
      <View style={{
        height: Dimensions.get('window').height / 2,
      }}
      >
        <ModalSelect
          value={ selectedCity }
          title="Выбор города"
          options={ cityOptionsPlace }
          onClickItem={ value => {
            setSelectedCity(value);
            selectedHandlerCity(value);
          } }
        />
      </View>
    );
  }
  if (stepForm === 1) {
    return (
      <View
        style={{
          paddingVertical: perfectSize(20),
          maxHeight: Dimensions.get('window').height - perfectSize(180),
          width: Dimensions.get('window').width - perfectSize(20),
        }}
      >
        <Container paddingSize={ 8 }>
          <Typography
            mb={ 20 }
            text="Список клиник"
            align="left"
            color="#333"
          />
          <FlatList
            contentContainerStyle={{
              marginBottom: 20,
            }}
            showsHorizontalScrollIndicator={ false }
            style={{ width: '100%' }}
            data={ clinics.filter(el => el.city && el.city.id === selectedCity) }
            keyExtractor={ (item, index) => `${index}-${item.id}` }
            onEndReachedThreshold={ Platform.OS === 'ios' ? 0 : 0.5 }
            renderItem={ ({ item }) => (
              <MapListClinics
                moveCameraToLocation={ () => moveCameraToLocation(
                  item.coords.lat,
                  item.coords.lng,
                  item.id,
                ) }
                setModalList={ () => setModalList() }
                id={ item.city ? item.city.id : '' }
                address={ item.address }
                cities={ cities }
              />
            ) }
          />
        </Container>
      </View>
    );
  }
  if (stepForm === 2) {
    return (
      <NoCityModalContent
        text="К сожалению, в вашем городе нет ни одной клиники. Выберите другой город"
        linkClick={ () => setStepForm(0) }
      />
    );
  }
  return null;
};

export default ContentMapModal;
