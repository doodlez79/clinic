import React, { FC } from 'react';

import { View, Dimensions } from 'react-native';

import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { LinkText } from 'components/LinkText';
import Locationerror from 'Icons/Locationerror.svg';
import { Btn } from 'components/Btn';
import { perfectSize } from 'helpers/perfectSize';

interface NoCityModalContentProps {
  linkClick: () => void;
  text?: string
}

const { width } = Dimensions.get('window');

const NoCityModalContent: FC<NoCityModalContentProps> = ({
  linkClick,
  text = 'К сожалению, в вашем городе нет выбранной услуги. Выберите другой город',
}) => (
  <View
    style={{
      width,
      maxHeight: perfectSize(459),
      marginBottom: perfectSize(80),
    }}
  >
    <Container paddingSize={ 8 }>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: perfectSize(57),
          marginTop: perfectSize(20),
        }}
      >
        <Typography text="Адрес клиники" />
        <LinkText text="Выбрать город" onClick={ linkClick } />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
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
          text={ text }
        />
        <Btn Title="Выбрать другой" onClick={ linkClick } />
      </View>
    </Container>
  </View>
);

export default NoCityModalContent;
