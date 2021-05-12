import React, { useEffect, useState } from 'react';

import {
  ScrollView,
  RefreshControl,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';

import Action from 'components/Action/Action';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';

import { Actions, Selectors } from 'ducks';
import { PromoType } from 'ducks/Promo/Promo.types';

import { getActionsByType } from 'helpers/GetActionsByType/getActionsByType';

import { STATUS_PROMO } from 'screens/Promo/Promo.types';

import { FORMAT } from 'constants/formatDate';
import { format, isValid } from 'date-fns';
import Locationerror from 'Icons/Locationerror.svg';
import { perfectSize } from 'helpers/perfectSize';
import { bySelectedType } from 'helpers/BySelectedType/BySelectedType';
import {
  ActionsContentProps,
  TYPE_ACTION_CONTENT,
} from './ActionsContent.types';
import { Btn } from '../Btn';
import { ModalComponent } from '../Modal';
import { ModalSelect } from '../ModalSelect';

export const ActionsContent: React.FC<ActionsContentProps> = ({
  type,
  update,
  loading,
}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const promosData = useSelector(Selectors.Promo.getAllPromo);
  const isAuthorized = useSelector(Selectors.Auth.isAuthorized);
  const currentUser = useSelector(Selectors.User.isProfile);
  const cityOptions = bySelectedType(useSelector(Selectors.Misc.getCities));

  const promos = useSelector(Selectors.Promo.getPromos);

  const [ modalState, setModalState ] = useState(false);
  const [ selectedValue, setSelectedValue ] = useState(
    currentUser.city ? currentUser.city.id : null,
  );

  const [ refreshLoading, setRefreshLoading ] = useState(false);
  let promosByType;
  if (currentUser?.city) {
    promosByType = getActionsByType(promos, type);
  } else {
    promosByType = getActionsByType(promosData, type);
  }
  const { active, finished } = promosByType;

  const onRefresh = React.useCallback(() => {
    setRefreshLoading(true);
    update();
  }, [ update ]);

  useEffect(() => {
    if (selectedValue && isAuthorized) {
      dispatch(
        Actions.User.patchUser.request(
          {
            ...currentUser,
            city: {
              id: selectedValue,
            },
          },
          {
            resolve: () => {},
          },
        ),
      );
    } else if (selectedValue) {
      dispatch(Actions.User.setUserCity({ id: selectedValue }));
    }
  }, [ selectedValue ]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: safeAreaInsets.bottom }}
        refreshControl={ <RefreshControl refreshing={ loading && refreshLoading } onRefresh={ onRefresh } /> }
      >
        {(promos.length === 0 && currentUser?.city !== null) && (
        <View
          style={{
            alignItems: 'center',
            paddingVertical: '40%',
          }}
        >
          <Locationerror />
          <Typography
            mb={ 30 }
            mt={ 15 }
            regular
            fontSize={ 13 }
            color="#999"
            style={{
              maxWidth: perfectSize(206),
            }}
            text="К сожалению, в Вашем городе пока не действует ни одна акция. Выберите другой город"
          />
          <Btn Title="Выбрать другой" onClick={ () => setModalState(true) } />
        </View>
        )}
        { active.map((item, index) => (
          <Container key={ item.id } paddingSize={ 8 }>
            <Action
              category={ item.category }
              fullWidth
              green={ index % 2 === 0 }
              disable={ item.lifecycle !== STATUS_PROMO.ACTIVE }
              id={ item.id }
              isInfinity={ item.isInfinity }
              title={ item.title }
              description={ item.description }
              date={ item.endAt && isValid(item.endAt) ? format(item.endAt, FORMAT) : null }
            />
          </Container>
        )) }
        { Boolean(finished?.length) && type !== TYPE_ACTION_CONTENT.ARCHIVE && (
        <Container paddingSize={ 8 }>
          <Typography fontSize={ 17 } mt={ 20 } mb={ 20 } text="Завершенные" />
        </Container>
        ) }
        { finished?.map((item: PromoType, index) => (
          <Container
            paddingSize={ 8 }
            key={ item.id }
          >
            <Action
              category={ item.category }
              fullWidth
              green={ index % 2 === 0 }
              disable
              id={ item.id }
              isInfinity={ item.isInfinity }
              title={ item.title }
              description={ item.description }
              date={ item.endAt ? format(item.endAt, FORMAT) : null }
            />
          </Container>
        )) }
      </ScrollView>
      <ModalComponent
        setModalVisible={ () => setModalState(false) }
        modalVisible={ modalState }
      >
        <ModalSelect
          value={ (currentUser.city && currentUser.city.id) || '' }
          title="Выбор города"
          options={ cityOptions }
          onClickItem={ value => {
            setModalState(false);
            setSelectedValue(value);
          } }
        />
      </ModalComponent>
    </>
  );
};

export default React.memo(ActionsContent);
