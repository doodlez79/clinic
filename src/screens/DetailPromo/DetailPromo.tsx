import { useFocusEffect } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text, TouchableOpacity,
  View,
} from 'react-native';

import { Container } from 'components/Container';
import Phone from 'Icons/Phone.svg';
import Clock from 'Icons/Clock.svg';
import { colors } from 'constants/colors';
import { Typography } from 'components/Typography';
import { alignTextConfig } from 'components/Typography/Typography.types';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';
import { getContentByMarkDown } from 'helpers/GetContentByMarkDown/getContentByMarkDown';
import { Block } from 'types/MarkDown';
import { IconByType } from 'components/Action/Action.config';

import { perfectSize } from 'helpers/perfectSize';
import { LinkingURLService } from 'services';
import { FORMAT } from 'constants/formatDate';
import { format, isValid } from 'date-fns';
import { styles } from './styles';
import { DetailPromoProps } from './DetailPromo.types';

const DetailPromo: FC<DetailPromoProps> = ({ route, navigation }) => {
  const { id, green } = route.params;
  const dispatch = useDispatch();
  const promoItem = useSelector(Selectors.Promo.getPromoItem);
  const currentUser = useSelector(Selectors.User.isProfile);
  const multiPhone = useSelector(Selectors.Misc.getMultiPhone);
  const loading = useSelector(Selectors.Promo.isLoading);

  const clinicsByPromos = useSelector(Selectors.Promo.getClinicsByPromo);

  const isGlobal = promoItem?.isGlobal;

  const getPromoItem = useCallback(() => {
    dispatch(Actions.Promo.getPromoItem.request(id, {
      resolve: () => {},
      reject: () => navigation.replace('Promo'),
    }));
  }, []);

  useFocusEffect(getPromoItem);
  useFocusEffect(useCallback(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={ () => LinkingURLService.openURL(`tel:${multiPhone}`) }
        >
          <Phone />
        </TouchableOpacity>
      ),
    });

    return () => dispatch(Actions.Promo.clearPromoItem());
  }, []));

  if (loading || !promoItem) {
    return (
      <View style={{ marginTop: perfectSize(20) }}>
        <ActivityIndicator size="large" color={ green ? colors.greenBtn : colors.green } />
      </View>
    );
  }

  const clinicsListRender = () => {
    if (!currentUser?.city) {
      return clinicsByPromos.clinicsWithThisPromoWithoutCity.map(item => (
        <View
          key={ item?.address }
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: perfectSize(10),
          }}
        >
          <Typography
            text={ `${item?.name}, ${item?.city}, ${item?.address}` }
            fontSize={ 14 }
            color="#999"
            align={ alignTextConfig.LEFT }
            style={{ marginBottom: perfectSize(5), marginRight: perfectSize(10) }}
          />
        </View>
      ));
    }
    return clinicsByPromos.clinicsWithThisPromoInCurrentCity.map(item => (
      <View
        key={ item?.address }
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginBottom: perfectSize(10),
        }}
      >
        <Typography
          text={ `${item.name}, ${item.address}` }
          fontSize={ 14 }
          color="#999"
          align={ alignTextConfig.LEFT }
          style={{ marginBottom: perfectSize(5), marginRight: perfectSize(10) }}
        />
      </View>
    ));
  };

  return (
    <ScrollView>
      <ScrollView
        contentContainerStyle={{ paddingBottom: perfectSize(30), marginBottom: perfectSize(20) }}
        refreshControl={ <RefreshControl refreshing={ loading } onRefresh={ getPromoItem } /> }
      >
        <Container paddingSize={ 8 }>
          <View
            style={{
              position: 'relative',
              marginBottom: 40,
            }}
          >
            <View style={ styles.circle } />
            <View style={ styles.icon }>
              {
                IconByType[promoItem.category](true, green ? colors.greenBtn : colors.green)
              }
            </View>
            <Typography
              text={ promoItem.title }
              fontSize={ 30 }
              style={{ maxWidth: 250, minHeight: 65 }}
              mb={ 20 }
              align={ alignTextConfig.LEFT }
            />
            {
              !promoItem.isInfinity && promoItem.endAt && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Clock strokeProps={ colors.green } />
                  <Text style={ styles.dataText }>
                    {`до ${promoItem.endAt && isValid(promoItem.endAt) ? format(promoItem.endAt, FORMAT) : ''}`}
                  </Text>
                </View>
              )
            }
          </View>
          {promoItem.markdown?.blocks
              && promoItem.markdown?.blocks.map((item: Block, index: number) => getContentByMarkDown(item, index))}
        </Container>
      </ScrollView>
      <Container paddingSize={ 8 }>
        <View style={{
          justifyContent: 'flex-start',
        }}
        >
          {!isGlobal ? (
            <>
              <Typography
                text={ currentUser.city === null ? 'Список клиник, в которых действует акция:'
                  : 'Список клиник Вашего города, в которых действует акция:' }
                color="#999"
                fontSize={ 16 }
                style={{ textAlign: 'left', marginBottom: perfectSize(20) }}
              />
              <View style={{
                paddingBottom: perfectSize(20),
              }}
              >
                {promoItem.clinics?.length !== 0 ? (
                  <>
                    {clinicsListRender()}
                  </>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Typography
                      text="Эта акция пока не действует ни в одной клинике"
                      fontSize={ 14 }
                      color="#999"
                      style={{ textAlign: 'left', marginBottom: perfectSize(10), marginRight: perfectSize(10) }}
                    />
                  </View>
                )}
              </View>
            </>
          ) : (
            <Typography
              text="Акция доступна для всех городов!"
              color="#999"
              fontSize={ 16 }
              style={{ textAlign: 'left', marginBottom: perfectSize(20) }}
            />
          )}

        </View>
      </Container>
    </ScrollView>
  );
};

export default DetailPromo;
