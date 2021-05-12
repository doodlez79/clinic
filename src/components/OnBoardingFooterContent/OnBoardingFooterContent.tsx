import React, { FC } from 'react';

import { View } from 'react-native';

import { Typography } from 'components/Typography';
import { OnBoardingFooterContentProps } from 'components/OnBoardingFooterContent/OnBoardingFooterContent.types';
import { Btn } from 'components/Btn';
import { perfectSize } from 'helpers/perfectSize';

const screenIndexs = [ 1, 2, 3 ];

const OnBoardingFooterContent: FC<OnBoardingFooterContentProps> = ({
  title,
  text,
  onPress,
  textBtn,
  currentScreen,
}) => (
  <View style={{ flex: 0.8 }}>
    <View
      style={{
        marginBottom: perfectSize(50),
      }}
    >
      <Typography
        text={ title }
        fontSize={ 22 }
        color="#333"
        mb={ 32 }
      />
      <Typography regular text={ text } fontSize={ 13 } color="#999" />
    </View>
    <View
      style={{
        marginBottom: perfectSize(32),
      }}
    >
      <Btn Title={ textBtn } onClick={ onPress } fullWight />
    </View>
    <View
      style={{
        marginBottom: perfectSize(34),
      }}
    />
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {screenIndexs.map(item => (
        <View
          key={ item }
          style={{
            width: perfectSize(7),
            height: perfectSize(7),
            borderRadius: 100,
            marginHorizontal: item === 2 ? perfectSize(10) : 0,
            backgroundColor: item === currentScreen ? '#1DBAB8' : '#E1F6F6',
          }}
        />
      ))}
    </View>
  </View>
);

export default OnBoardingFooterContent;
