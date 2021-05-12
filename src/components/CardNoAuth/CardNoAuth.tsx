import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Btn } from 'components/Btn';

import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from 'components/Typography';
import ClinicHeartIcon from 'Icons/Heart-2.svg';
import { CardNoAuthProps } from './CardNoAuth.types';
import { styles } from './styles';
import { IconResize } from '../IconResize';

const CardNoAuth: FC<CardNoAuthProps> = ({ openAuthRout, onOpenModal, isConnected }) => (
  <View style={{
    flex: 1, zIndex: 99, position: 'relative', elevation: 1,
  }}
  >
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
      <View style={{ flexDirection: 'row' }}>
        <Typography mb={ 15 } fontSize={ 34 } color="#fff" text="Гость" />
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
    <View style={ styles.buttonContainer }>
      <Btn
        disabled={ !isConnected }
        style={{
          height: '100%',
        }}
        Title="Войти по номеру"
        onClick={ openAuthRout }
      />
    </View>
    <TouchableOpacity style={ styles.infoCard } onPress={ onOpenModal }>
      <Text style={ styles.infoCardText }>Подробнее о карте</Text>
    </TouchableOpacity>
  </View>
);

export default CardNoAuth;
