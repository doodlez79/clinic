import React from 'react';

import { View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { Typography } from 'components/Typography';

import { perfectSize } from 'helpers/perfectSize';
import { StatusBarHeight } from 'helpers/GetHeighStatusBar/GetHeighStatusBar';

import { colors } from 'constants/colors';

import Error from 'Icons/Error.svg';

type Props = {
  isConnection: boolean
}

const ErrorState: React.FC<Props> = ({ isConnection }) => {
  if (isConnection) {
    return null;
  }

  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object */}
      { !isConnection && <StatusBar style="light" /> }
      <View
        style={{
          width: '100%',
          backgroundColor: colors.red,
          borderBottomLeftRadius: perfectSize(16),
          borderBottomRightRadius: perfectSize(16),
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: StatusBarHeight,
          paddingBottom: perfectSize(8),
        }}
      >
        <View style={{
          marginRight: perfectSize(8),
        }}
        >
          <Error fill="none" strokeProps="#fff" />
        </View>
        <View>
          <Typography
            align="center"
            color="#fff"
            fontSize={ 13 }
            regular
            text="Отсутствует подключение к интернету"
          />
          <Typography
            align="center"
            color="#fff"
            fontSize={ 13 }
            regular
            text="Часть функций может быть недоступна"
          />
        </View>
      </View>
    </>
  );
};

export default ErrorState;
