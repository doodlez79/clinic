import React, {
  FC, useCallback, useRef,
} from 'react';
import Barcode from 'react-native-barcode-builder';
import {
  View,
  Text,
  TouchableOpacity,
  Animated, Dimensions,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import { perfectSize } from 'helpers/perfectSize';

import History from 'Icons/History.svg';
import HeartCard from 'Icons/HeartCard.svg';
import Zoom from 'Icons/Zoom.svg';
import ClinicHeartIcon from 'Icons/Heart-2.svg';

import { Typography } from 'components/Typography';
import { IconResize } from 'components/IconResize';
import { useSelector } from 'react-redux';
import { Selectors } from 'ducks';
import { styles } from './styles';
import { CardAuthProps } from './CardAuth.types';

const { width } = Dimensions.get('window');

const heightWhiteBlock = (((width - 32) / 1.59) * 0.3);

const CardAuth: FC<CardAuthProps> = ({
  countBall,
  availableBonuses,
  numberCard,
  onOpenModal,
  onShowCard,
  onPressHistory,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const totalBonuses = useSelector(Selectors.Bonuses.getTotalBonuses);
  const availableCount = totalBonuses - availableBonuses;
  useFocusEffect(
    useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, []),
  );

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      <LinearGradient
        colors={ [ '#3BC6C3', '#00BAB8' ] }
        style={ styles.linerGradient }
      />
      <LinearGradient
        colors={ [ 'rgba(255,255,255,1)', 'rgba(255,255,255,0)' ] }
        style={{
          ...styles.linerGradient,
          zIndex: 101,
          opacity: 0.58,
        }}
        start={ [ 0.0, 0.0 ] }
        end={ [ 1.0, 1.0 ] }
      />
      <View style={ styles.titleContainer }>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={ styles.guest }>{countBall}</Text>
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
            >
              <IconResize size={ 27 }>
                <HeartCard />
              </IconResize>
            </Animatable.View>
            <Typography />
          </View>
          <View style={{ minWidth: 57 }}>
            <Text style={ styles.countRub }>{`≈ ${countBall}₽`}</Text>
          </View>
          {
            Boolean(availableCount) && (
              <Text style={ styles.countRub }>
                {
                  `ожидает начисления ${availableCount}`
                }

              </Text>
            )
          }
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <View style={{ top: '-2%' }}>
              <IconResize size={ 27 }>
                <ClinicHeartIcon />
              </IconResize>
            </View>
            <Typography
              text="Клиника-Cити"
              style={ styles.title }
            />
          </View>
          <Typography
            text="Бонусная карта"
            style={ styles.description }
          />
        </View>
      </View>

      <View
        style={ styles.buttonContainer }
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              alignItems: 'center',
            }}
          >
            {
              Boolean(numberCard) && (
                <View style={{
                  height: '100%',
                  justifyContent: 'center',
                }}
                >
                  <View style={{
                    height: heightWhiteBlock * 0.6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    marginTop: perfectSize(6),
                  }}
                  >
                    <Barcode
                      value={ typeof numberCard === 'string' ? numberCard : '' }
                      format="CODE128"
                      width={ perfectSize(1.5) }
                      textColor="#333"
                      lineColor="#000"
                      flat
                      background="transparent"
                    />

                  </View>
                  <View style={{
                    marginVertical: perfectSize(4),
                    justifyContent: 'center',
                  }}
                  >
                    <Typography
                      regular
                      fontSize={ 13 }
                      text={ typeof numberCard === 'string' ? numberCard : '' }
                    />
                  </View>
                </View>
              )
            }
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          >
            <TouchableOpacity
              onPress={ onPressHistory }
              style={{
                width: perfectSize(36),
                height: perfectSize(36),
              }}
            >
              <History />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ onShowCard }
              style={{
                marginLeft: perfectSize(16),
                width: perfectSize(36),
                height: perfectSize(36),
                alignItems: 'center',
              }}
            >
              <Zoom />

            </TouchableOpacity>
          </View>

        </View>
      </View>
      <TouchableOpacity style={ styles.infoCard } onPress={ onOpenModal }>
        <Text style={ styles.infoCardText }>Подробнее о карте</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardAuth;
