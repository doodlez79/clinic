import React, { FC, useCallback } from 'react';

import { ScrollView, View } from 'react-native';

import { CloseBtn } from 'components/CloseBtn';
import { Title } from 'components/Title';
import { Container } from 'components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';
import { RecordAuth } from 'components/RecordAuth';
import { ContentNoAuth } from 'components/ContentNoAuth';
import { bySelectedType } from 'helpers/BySelectedType/BySelectedType';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RECORD_TYPE } from 'navigation/Navigation.types';
import { RecordScreenProps } from './Record.types';

const RecordScreen: FC<RecordScreenProps> = ({
  navigation,
  route,
}) => {
  const servicesId = route.params ? route.params.servicesId : '';
  const clinicId = route.params ? route.params.clinicId : '';
  const typeScreen = route.params ? route.params.type : RECORD_TYPE.DEFAULT;
  const recordServices = useSelector(Selectors.Misc.getRecordServices);
  const allServices = useSelector(Selectors.Misc.allServices);
  const cities = useSelector(Selectors.Misc.getCities);
  const clinics = useSelector(Selectors.Misc.getClinics);
  const profile = useSelector(Selectors.User.isProfile);
  const loading = useSelector(Selectors.RecordFeedback.isLoading);
  const cityOptionsPlace = bySelectedType(cities);

  let cityCurrent;
  let parentIdServices;

  if (servicesId) {
    const parentIdArray = allServices.find(el => el.id === servicesId);
    parentIdServices = parentIdArray ? parentIdArray.parentId : '';
  }

  if (profile.city) {
    cityCurrent = cities.find(el => el.id === profile.city!.id);
  }

  const dispatch = useDispatch();

  const submitRecord = useCallback(values => {
    if (!profile.city) {
      dispatch(Actions.User.patchUserCity.request({
        id: values.place,
      }));
    }

    dispatch(
      Actions.RecordFeedback.sendRecord.request(
        {
          clinicId: values.clinic,
          productId: values.services,
        },
        {
          resolve: () => {
            navigation.replace('RecordSuccess');
          },
          reject: () => {},
        },
      ),
    );
  }, []);

  const isAuthorized = useSelector(Selectors.Auth.isAuthorized);
  const isConnected = useSelector(Selectors.App.isConnection);

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: safeAreaInsets.top, flex: 1 }}>
      <ScrollView
        style={{
          marginBottom: 20,
        }}
      >
        <Container paddingSize={ 8 }>
          <CloseBtn onClose={ () => navigation.navigate('Home') } />
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginTop: 24,
              marginBottom: 95,
            }}
          >
            <Title title="Записаться" />
          </View>

          {isAuthorized ? (
            <RecordAuth
              allOptionServices={ allServices }
              type={ typeScreen }
              loading={ loading }
              clinicId={ clinicId || '' }
              cityValue={ cityCurrent }
              cityOptionsPlace={ cityOptionsPlace }
              clinicsOptions={ clinics }
              servicesValue={ servicesId || (parentIdServices || '') }
              name={ profile.name }
              city={ cityCurrent }
              submitRecord={ submitRecord }
              optionServices={ recordServices }
            />
          ) : (
            <ContentNoAuth isConnected={ isConnected } onClick={ () => navigation.navigate('Auth') } />
          )}
        </Container>
      </ScrollView>
    </View>
  );
};

export default RecordScreen;
