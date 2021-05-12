import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import Barcode from 'react-native-barcode-builder';
import {
  View, Dimensions, TouchableOpacity, Platform, Linking, Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FlipCard from 'react-native-flip-card';

import * as Brightness from 'expo-brightness';

import CardNoAuth from 'components/CardNoAuth/CardNoAuth';
import { CardAuth } from 'components/CardAuth';
import CardSvg from 'Icons/Card.svg';
import AppleWalletIcon from 'Icons/walletIcon.svg';
import { ModalComponent } from 'components/Modal';
import { ModalContent } from 'components/ModalContent';
import { Actions, Selectors } from 'ducks';
import { POSITION_TYPE } from 'components/Modal/Modal.types';
import { Typography } from 'components/Typography';

import { getContentByMarkDown } from 'helpers/GetContentByMarkDown/getContentByMarkDown';

import { perfectSize } from 'helpers/perfectSize';
import { useCountUp } from 'use-count-up';
import { styles } from './styles';
import { CardProps } from './Card.types';

const screenWidth = Dimensions.get('window').width;

const Card: FC<CardProps> = ({
  openAuthRout, openHistoryBalanceRout, totalBonuses, cardNumber, availableBonuses,
}) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(Selectors.Auth.isAuthorized);
  const [ modalStateInfo, setModalStateInfo ] = useState(false);
  const [ modalCard, setModalCard ] = useState(false);
  const [ light, setLight ] = useState(0);
  const modalBody = useSelector(Selectors.Misc.getModalBody);
  const isConnected = useSelector(Selectors.App.isConnection);
  const walletLink = useSelector(Selectors.User.walletLink);

  const contentBody = modalBody.find(el => el.id === 'bonus');

  const handleWalletLinkPress = useCallback(async () => {
    // eslint-disable-next-line max-len
    dispatch(Actions.User.getWalletLinkId.request({ platform: Platform.OS.toUpperCase() }, { resolve: () => { } }));
    const supported = await Linking.canOpenURL(walletLink);
    if (supported) {
      await Linking.openURL(walletLink);
      dispatch(Actions.User.clearWalletLinkId());
    } else {
      Alert.alert(`Don't know how to open this URL: ${walletLink}`);
    }
  }, [ walletLink ]);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.getBrightnessAsync().then(res => setLight(res));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (modalCard) {
        if (status === 'granted') {
          Brightness.setSystemBrightnessAsync(1);
        }
      } else if (status === 'granted' && Number(light)) {
        Brightness.setSystemBrightnessAsync(Number(light));
      }
    })();
  }, [ modalCard ]);
  const [ startCountUp, setStartCouting ] = useState(false);

  useEffect(() => {
    if (totalBonuses) {
      setStartCouting(true);
    }
  }, [ totalBonuses ]);

  const { value } = useCountUp({
    isCounting: startCountUp,
    end: totalBonuses,
    start: 0,
    duration: 2,
    easing: 'easeOutCubic',
  });

  return (
    <View style={ styles.container }>
      <FlipCard
        friction={ 60 }
        flip={ isAuth }
        perspective={ 900 }
        style={ styles.card }
        flipHorizontal
        flipVertical={ false }
        useNativeDriver
        clickable={ false }
      >
        <CardNoAuth
          isConnected={ isConnected }
          openAuthRout={ openAuthRout }
          onOpenModal={ () => setModalStateInfo(true) }
        />
        <CardAuth
          onPressHistory={ openHistoryBalanceRout }
          onShowCard={ () => setModalCard(true) }
          countBall={ value as number }
          availableBonuses={ availableBonuses as number }
          numberCard={ cardNumber }
          onOpenModal={ () => setModalStateInfo(true) }
        />
      </FlipCard>

      <ModalComponent
        modalVisible={ modalStateInfo }
        setModalVisible={ () => setModalStateInfo(false) }
      >
        <ModalContent
          icon={ () => (
            isAuth ? (
              <TouchableOpacity style={ styles.walletBtn } onPress={ () => handleWalletLinkPress() }>
                <AppleWalletIcon width={ 32 } height={ 24 } />
                <Typography
                  text="Добавить в Apple Wallet"
                  color="white"
                  fontSize={ 13 }
                  style={{ marginLeft: perfectSize(5) }}
                />
              </TouchableOpacity>
            ) : (
              <CardSvg />
            )

          ) }
          title="Бонусная карта"
          style={{ width: screenWidth }}
        >
          { (contentBody?.markdown?.blocks || []).map((item, index) => getContentByMarkDown(item, index)) }
        </ModalContent>
      </ModalComponent>
      <ModalComponent
        width="95%"
        mb={ 200 }
        position={ POSITION_TYPE.CENTER }
        modalVisible={ modalCard }
        setModalVisible={ () => setModalCard(false) }
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingVertical: perfectSize(32),
          }}
        >
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {
              Boolean(cardNumber) && (
                <>
                  <Barcode
                    value={ typeof cardNumber === 'string' ? cardNumber : '' }
                    format="CODE128"
                    width={ perfectSize(2) }
                    height={ perfectSize(50) }
                    textColor="#333"
                    lineColor="#000"
                    flat
                    background="transparent"
                  />
                  <Typography regular text={ typeof cardNumber === 'string' ? cardNumber : '' } />
                </>
              )
            }
          </View>
        </View>
      </ModalComponent>
    </View>
  );
};

export default Card;
