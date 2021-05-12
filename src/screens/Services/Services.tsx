import React, {
  FC, useEffect, useState,
} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from 'components/Container';
import { colors } from 'constants/colors';
import LeftArrow from 'Icons/LeftArrow.svg';
import { Typography } from 'components/Typography';
import { ServicesItemHead } from 'components/ServicesItemHead';
import { Actions, Selectors } from 'ducks';
import { Service } from 'ducks/Misc/Misc.types';

import { perfectSize } from 'helpers/perfectSize';
import Locationerror from 'Icons/Locationerror.svg';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalComponent } from 'components/Modal';

import { ModalSelect } from 'components/ModalSelect';
import { bySelectedType } from 'helpers/BySelectedType/BySelectedType';
import { ServicesDetailInfo } from 'components/ServicesDeatailInfo';
import { Btn } from 'components/Btn';
import { currentClinikInCity } from 'helpers/CurrentClinikInCity';
import { filterByChildrenClinicCity } from 'helpers/FilterByCityClinic';
import { ServicesScreenProps } from './Services.types';

const ServicesScreen: FC<ServicesScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const products = useSelector(Selectors.Misc.getMainServices);
  const isAuthorized = useSelector(Selectors.Auth.isAuthorized);
  const profile = useSelector(Selectors.User.isProfile);
  const cityOptions = bySelectedType(useSelector(Selectors.Misc.getCities));
  const currentCity = useSelector(Selectors.User.currentCity);
  const cliniks = useSelector(Selectors.Misc.getClinics);

  const [ mainServicesWithRightCode, setMainServices ] = useState([] as Service[]);

  const [ currentIndexService, setCurrentIndexService ] = useState(0);
  const [ selectedValue, setSelectedValue ] = useState(
    profile.city ? profile.city.id : null,
  );

  React.useEffect(() => {
    const currentClinics = currentClinikInCity(cliniks, currentCity);

    setMainServices(filterByChildrenClinicCity(products, currentClinics));
  }, [
    currentCity, products,
  ]);

  useEffect(() => {
    if (selectedValue && isAuthorized) {
      dispatch(
        Actions.User.patchUser.request(
          {
            ...profile,
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

  const [ modalState, setModalState ] = useState(false);

  let refHeaderFlatList: FlatList<Service> | null;
  const goIndex = (index: number) => {
    if (refHeaderFlatList) {
      refHeaderFlatList.scrollToIndex({ animated: true, index, viewOffset: perfectSize(16) });
      setCurrentIndexService(index);
    }
  };

  useEffect(() => {
    if (route.params) {
      const idRoutParam = route.params!.id;
      const objById = mainServicesWithRightCode.reduce(
        (acc, el, index) => {
          if (el?.id === idRoutParam) {
            return {
              children: el.children,
              index,
            };
          }
          return acc;
        },
        { } as {
          index: number;
          children: Service['children'];
        },
      );
      goIndex(objById.index);
    }
  }, [ route ]);
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <>
      {
        mainServicesWithRightCode.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
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
              text="К сожалению, в вашем городе не оказывается ни одна услуга. Выберите другой город"
            />
            <Btn Title="Выбрать другой" onClick={ () => setModalState(true) } />
          </View>

        )
          : (
            <View style={{
              flex: 1,
              marginTop: safeAreaInsets.top,
              overflow: 'hidden',
            }}
            >
              <View style={{ paddingHorizontal: 8, zIndex: 100 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: perfectSize(44),
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    overflow: 'hidden',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <TouchableOpacity
                    style={{ flexBasis: '25%' }}
                    onPress={ () => navigation.goBack() }
                  >
                    <LeftArrow strokeProps={ colors.green } />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexBasis: '50%',
                    }}
                  >
                    <Typography color="#333333" text="Наши услуги" fontSize={ 17 } />
                  </View>
                </View>
              </View>
              <View
                style={{
                  overflow: 'hidden',
                  zIndex: -20,
                }}
              >
                <FlatList
                  horizontal
                  style={{ overflow: 'hidden', zIndex: -20 }}
                  contentContainerStyle={{
                    paddingVertical: perfectSize(16), overflow: 'hidden', zIndex: -20,
                  }}
                  showsHorizontalScrollIndicator={ false }
                  initialScrollIndex={ 0 }
                  onScrollToIndexFailed={ () => {} }
                  initialNumToRender={ 60 }
                  data={ mainServicesWithRightCode }
                  ref={ ref => (refHeaderFlatList = ref) }
                  keyExtractor={ (item, index) => `${index}-${item.id}` }
                  onEndReachedThreshold={ Platform.OS === 'ios' ? 0 : 0.5 }
                  renderItem={ ({ item, index }) => (
                    <ServicesItemHead
                      style={{
                        marginLeft: index === 0 ? perfectSize(32) : 0,
                        overflow: 'hidden',
                        zIndex: -20,
                      }}
                      green={ index % 2 === 0 }
                      selected={ index === currentIndexService }
                      name={ item.name }
                      inactiveIcon={ item.inactiveIcon }
                      icon={ item.activeIcon }
                      onPress={ () => goIndex(index) }
                    />
                  ) }
                />
              </View>
              <Container flex={ 1 } paddingSize={ 8 }>
                {
             mainServicesWithRightCode[currentIndexService]?.children?.length === 0 ? (
               <View
                 style={{
                   flex: 1,
                   zIndex: -99999,
                 }}
               >
                 <ServicesDetailInfo
                   navigation={ navigation }
                   id={ mainServicesWithRightCode[currentIndexService]?.id }
                 />
               </View>

             )
               : (
                 <FlatList
                   contentContainerStyle={{ paddingVertical: perfectSize(16) }}
                   showsVerticalScrollIndicator={ false }
                   style={{ width: '100%' }}
                   data={ mainServicesWithRightCode[currentIndexService]?.children || [] }
                   keyExtractor={ (item, index) => `${index}-${item.id}` }
                   onEndReachedThreshold={ Platform.OS === 'ios' ? 0 : 0.5 }
                   renderItem={ ({ item }) => (
                     <TouchableOpacity
                       onPress={ () => navigation.navigate('Detail/Services', {
                         id: item.id,
                         isVisit: mainServicesWithRightCode[currentIndexService]?.isVisit,
                       }) }
                       style={{
                         padding: 16,
                         borderBottomWidth: 1,
                         borderColor: '#F9F9F9',
                       }}
                     >
                       <Typography
                         align="left"
                         color="#333"
                         regular
                         text={ item.name }
                         fontSize={ 17 }
                       />
                     </TouchableOpacity>
                   ) }
                 />
               )
          }

              </Container>
            </View>
          )
      }

      <ModalComponent
        setModalVisible={ () => setModalState(false) }
        modalVisible={ modalState }
      >
        <ModalSelect
          value={ (profile.city && profile.city.id) || '' }
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

export default React.memo(ServicesScreen);
