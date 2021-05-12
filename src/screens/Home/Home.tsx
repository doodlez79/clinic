import React, { useCallback, useState } from 'react';
import {
  RefreshControl, ScrollView, View, TouchableOpacity, Modal, Linking, Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { isPointWithinRadius } from 'geolib';
import { LinearGradient } from 'expo-linear-gradient';

import { HeaderHome } from 'components/HeaderHome';
import { Container } from 'components/Container';
import { Card } from 'components/Card';
import { HomeActions } from 'components/HomeActions';
import { ServicesHome } from 'components/ServicesHome';
import { Btn } from 'components/Btn';
import { Typography } from 'components/Typography';

import { Actions, Selectors } from 'ducks';
import { checkVersionFunc } from 'helpers/CheckVersions/CheckVersions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DocIcon from 'Icons/Doc.svg';

import { currentClinikInCity } from 'helpers/CurrentClinikInCity';
import { filterByChildrenClinicCity } from 'helpers/FilterByCityClinic';
import { Service } from 'ducks/Misc/Misc.types';

import AppleWalletIcon from 'Icons/walletIcon.svg';
import { perfectSize } from 'helpers/perfectSize';
import { styles } from './styles';

type Props = {} & DrawerContentComponentProps;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const isAuthorized = useSelector(Selectors.Auth.isAuthorized);
  const isShowWalletModal = useSelector(Selectors.App.isShowWalletModal);
  const profile = useSelector(Selectors.User.isProfile);
  const location = useSelector(Selectors.Misc.getLocation);
  const isConnection = useSelector(Selectors.App.isConnection);
  const cities = useSelector(Selectors.Misc.getCities);
  const versionsMisc = useSelector(Selectors.Misc.getVersions);
  const mainServices = useSelector(Selectors.Misc.getMainServices);
  const availableBonuses = useSelector(Selectors.Bonuses.getAvailable);
  const currentCity = useSelector(Selectors.User.currentCity);
  const cliniks = useSelector(Selectors.Misc.getClinics);
  const mainUrl = useSelector(Selectors.Develop.getMainUrl);

  const [ mainServicesWithRightCode, setMainServices ] = useState([] as Service[]);
  const [ walletBtnModalVisible, setWalletBtnModalVisible ] = useState(false);

  const walletLinkPress = useCallback(() => {
    dispatch(Actions.User.getWalletLinkId.request({ platform: Platform.OS.toUpperCase() }, {
      resolve: res => {
        if (res) {
          const url = `${mainUrl.url}/wallet/${res}`;
          Linking.canOpenURL(url).then(res => {
            if (res) {
              Linking.openURL(url).then();
            }
          });
        }
      },
    }));
  }, []);

  const walletBtnModalRender = () => (
    <Modal
      animationType="slide"
      transparent
      visible={ walletBtnModalVisible }
      onRequestClose={ () => setWalletBtnModalVisible(false) }
    >
      <View style={ styles.modalContainer }>
        <View style={ styles.modalContent }>
          <Typography
            text="Добавить бонусную карту в Apple Wallet"
            style={{ color: 'black' }}
            fontSize={ 17 }
          />
          <Typography
            // eslint-disable-next-line max-len
            text='Вы можете добавить бонусную карту Клиника-Сити в Apple Wallet сейчас или потом в разделе "Подробнее о карте"'
            color="black"
            fontSize={ 13 }
          />
          <TouchableOpacity style={ styles.walletBtn } onPress={ () => walletLinkPress() }>
            <AppleWalletIcon width={ 32 } height={ 24 } />
            <Typography
              text="Добавить в Apple Wallet"
              color="white"
              fontSize={ 13 }
              style={{ marginLeft: perfectSize(5) }}
            />
          </TouchableOpacity>
          <Typography
            text='Потом в "Подробнее о карте"'
            style={{ color: '#1DBAB8', textDecorationLine: 'underline' }}
            fontSize={ 13 }
            onPress={ () => setWalletBtnModalVisible(false) }
          />
        </View>
      </View>

    </Modal>
  );

  React.useEffect(() => {
    if (isAuthorized) {
      dispatch(Actions.User.clearWalletLinkId());
      setWalletBtnModalVisible(true);
      dispatch(Actions.App.showWalletModal());
    }
  }, [ isAuthorized, isShowWalletModal ]);

  React.useEffect(() => {
    if (location && cities.length) {
      const { latitude, longitude } = location.coords;

      const city = cities.find(el => {
        const { lat, lng } = el.center!;
        if (el.radius) {
          return isPointWithinRadius(
            { latitude, longitude },
            { latitude: lat, longitude: lng },
            el.radius * 1000,
          );
        }
        return false;
      });

      if (city && !profile.city) {
        if (isAuthorized) {
          dispatch(
            Actions.User.patchUser.request(
              { city },
              {
                resolve: () => {},
              },
            ),
          );
        } else {
          dispatch(Actions.User.setUserCity({ id: city.id }));
        }
      }
    }
  }, [ location, cities.length ]);

  React.useEffect(() => {
    const currentClinics = currentClinikInCity(cliniks, currentCity);

    setMainServices(filterByChildrenClinicCity(mainServices, currentClinics));
  }, [
    currentCity, mainServices,
  ]);

  const onRefresh = React.useCallback((oldVersions = versionsMisc) => {
    dispatch(Actions.Misc.checkVersion.request({
      resolve: res => {
        if (versionsMisc) {
          checkVersionFunc(res.versions, oldVersions, dispatch);
        } else {
          dispatch(Actions.Misc.getMiscAll());
        }
      },
      reject: () => {},
    }));
    if (isAuthorized) {
      dispatch(Actions.User.getUser.request());
      dispatch(Actions.Bonuses.checkBonuses.request(1));
    }

    dispatch(Actions.Promo.getPromo.request());
  }, [ JSON.stringify(versionsMisc) ]);

  useFocusEffect(onRefresh);

  const openProfileScreen = React.useCallback(() => navigation.navigate('profile'), [ navigation ]);
  const openAuthScreen = React.useCallback(() => navigation.navigate('Auth'), [ navigation ]);

  const safeAreaInsets = useSafeAreaInsets();
  return (
    <>
      <View style={{ paddingTop: safeAreaInsets.top }}>
        <ScrollView
          style={{
            height: '100%',
          }}
          showsVerticalScrollIndicator={ false }
          refreshControl={ <RefreshControl refreshing={ false } onRefresh={ () => onRefresh(versionsMisc) } /> }
        >
          <Container paddingSize={ 8 }>
            <HeaderHome
              isConnection={ isConnection }
              style={ styles.greeting }
              openProfilePage={ openProfileScreen }
              profile={ isAuthorized ? profile : null }
            />
          </Container>
          <Container paddingSize={ 8 }>
            <Card
              cardNumber={ profile.cardNumber }
              totalBonuses={ availableBonuses }
              availableBonuses={ availableBonuses }
              openAuthRout={ openAuthScreen }
              openHistoryBalanceRout={ () => navigation.navigate('Balance') }
            />
          </Container>
          <HomeActions />
          <Container paddingSize={ 8 }>
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ () => navigation.navigate('Record') }
            >
              <Btn
                style={ styles.recordBtn }
                Title={ (
                  <View style={ styles.recordBtnContent }>
                    <View style={ styles.recordBtnIcon }>
                      <DocIcon strokeProps="#ffffff" />
                    </View>
                    <Typography
                      text="Записаться на прием"
                      color="#ffffff"
                    />
                  </View>
              ) }
                onClick={ () => {} }
              />
              <LinearGradient
                colors={ [ 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 1)' ] }
                style={ styles.linearGradient }
                start={{ x: 0.8, y: 0.5 }}
              />
            </TouchableOpacity>
          </Container>
          {
          mainServicesWithRightCode.length !== 0
          && (
          <Container paddingSize={ 8 }>
            <ServicesHome mainServices={ mainServicesWithRightCode } />
          </Container>
          )
        }

        </ScrollView>
      </View>
      {(isAuthorized && walletBtnModalVisible) && (
        walletBtnModalRender()
      )}
    </>
  );
};

export default React.memo(HomeScreen);
