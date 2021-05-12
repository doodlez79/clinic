import React, { FC } from 'react';

import { View } from 'react-native';

import ProfileError from 'Icons/ProfileError.svg';
import { Typography } from 'components/Typography';
import { alignTextConfig } from 'components/Typography/Typography.types';
import { Btn } from 'components/Btn';
import { SizeBtn } from 'components/Btn/Btn.types';

import { perfectSize } from 'helpers/perfectSize';
import { IconResize } from 'components/IconResize';
import { ProfileContentNoAuthProps } from './ContentNoAuth.types';

const ContentNoAuth: FC<ProfileContentNoAuthProps> = ({
  onClick,
  text = 'Необходимо войти или зарегистрироваться по номеру телефона',
  textBtn = 'Войти по номеру',
  isConnected = true,
}) => (
  <View
    style={{
      alignItems: 'center',
    }}
  >
    <View
      style={{
        marginVertical: perfectSize(40),
        alignItems: 'center',
      }}
    >
      <IconResize size={ 48 }>
        <ProfileError />
      </IconResize>
      <Typography
        color="#999"
        text={ text }
        align={ alignTextConfig.CENTER }
        style={{
          maxWidth: 184,
        }}
        regular
        mt={ 10 }
        fontSize={ 13 }
      />
    </View>
    <Btn Title={ textBtn } onClick={ onClick } disabled={ !isConnected } size={ SizeBtn.SMALL } />
  </View>
);

export default ContentNoAuth;
