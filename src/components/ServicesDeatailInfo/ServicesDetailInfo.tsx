import React, { FC } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  View, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { Selectors } from 'ducks';
import { Container } from 'components/Container';
import { colors } from 'constants/colors';
import { Typography } from 'components/Typography';
import { getContentByMarkDown } from 'helpers/GetContentByMarkDown/getContentByMarkDown';
import { Btn } from 'components/Btn';

import { perfectSize } from 'helpers/perfectSize';

import { RECORD_TYPE } from 'navigation/Navigation.types';

type Props = {
  id: string,
}

const ServicesDetailInfo : FC <Props> = ({
  id, navigation,
}) => {
  const safeAreaInsets = useSafeAreaInsets();

  const allServices = useSelector(Selectors.Misc.allServices);
  const profile = useSelector(Selectors.User.isProfile);
  const clinics = useSelector(Selectors.Misc.getClinics);

  let isHaveClinics: boolean | null = null;
  let isHaveClinicInCity = [];

  const currentItem = allServices.find(el => el.id === id)!;

  if (profile.city && profile.city.id) {
    const clinicsByIdCity = clinics.filter(el => el.city && el.city.id === profile.city!.id) || [];

    isHaveClinicInCity = currentItem.clinics.filter(el => clinicsByIdCity.map(el => el.id).includes(el));
    isHaveClinics = isHaveClinicInCity.length > 0;
  }
  const countClinicsInCity = isHaveClinicInCity.length;
  const textByClinicsInCity = () => {
    if (isHaveClinics) {
      return `Доступно в ${countClinicsInCity} клиник${countClinicsInCity === 1 ? 'е' : 'ах'} вашего города`;
    }
    return 'Недоступно в вашем городе';
  };

  let paddingBottom = Math.max(perfectSize(16), safeAreaInsets.bottom);

  if (isHaveClinics) {
    paddingBottom += perfectSize(16) + perfectSize(50);
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: perfectSize(8), paddingBottom,
        }}
        scrollEventThrottle={ 16 }
      >
        <Container paddingSize={ 8 }>
          { profile.city && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: perfectSize(10),
              }}
            >
              <MaterialIcons
                name="error-outline"
                color={ isHaveClinics ? colors.greenBtn : '#999999' }
                size={ 18 }
              />
              <Typography
                ml={ 5 }
                regular
                fontSize={ 13 }
                text={ textByClinicsInCity() }
                color={ isHaveClinics ? colors.greenBtn : '#999999' }
              />
            </View>
          )}
          { currentItem?.markdown?.blocks.map((item, index) => getContentByMarkDown(item, index)) }
        </Container>
      </ScrollView>
      { isHaveClinics && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            paddingHorizontal: perfectSize(16),
            bottom: Math.max(perfectSize(16), safeAreaInsets.bottom),
          }}
        >
          <Btn
            Title="Записаться"
            onClick={ () => navigation.navigate('Record', { servicesId: id, type: RECORD_TYPE.SERVICE }) }
          />
        </View>
      ) }
    </View>
  );
};

export default ServicesDetailInfo;
