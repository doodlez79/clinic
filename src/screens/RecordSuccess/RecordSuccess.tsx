import React, { FC } from 'react';

import { SafeAreaView, View } from 'react-native';
import { Typography } from 'components/Typography';
import { Btn } from 'components/Btn';
import Done from 'Icons/Done.svg';
import { StackScreenProps } from '@react-navigation/stack';
import { CloseBtn } from 'components/CloseBtn';
import { Title } from 'components/Title';
import { Container } from 'components/Container';
import { MainStackParamList } from 'navigation/Navigation.types';

export interface RecordSuccessProps extends StackScreenProps<MainStackParamList, 'RecordSuccess'>{}

const RecordSuccessScreen: FC<RecordSuccessProps> = ({ navigation }) => (
  <SafeAreaView style={{ marginTop: 24 }}>
    <Container paddingSize={ 8 }>
      <CloseBtn onClose={ () => navigation.navigate('Home') } />
      <View
        style={{
          marginTop: 24,
        }}
      >
        <Title title="Записаться" />
      </View>
      <View
        style={{
          width: '100%',
          height: '80%',
          alignItems: 'center',
          paddingVertical: 32,
          justifyContent: 'center',
        }}
      >
        <Done />
        <Typography
          style={{
            maxWidth: 190,
          }}
          text="Вы успешно записались на услугу!"
          color="#999999"
          ml={ 8 }
          mb={ 16 }
          regular
          fontSize={ 13 }
          align="center"
        />
        <View
          style={{
            width: 200,
          }}
        >
          <Btn Title="Понятно" onClick={ () => navigation.replace('Home') } />
        </View>
      </View>
    </Container>
  </SafeAreaView>
);

export default RecordSuccessScreen;
