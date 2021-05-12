import React from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  View,
} from 'react-native';

import Constants from 'expo-constants';

import { Typography } from 'components/Typography';
import { perfectSize } from 'helpers/perfectSize';

import { AboutProps } from './About.types';

const appIconSize = perfectSize(80);

type Props = AboutProps & {};

const AboutScreen: React.FC<Props> = ({ navigation }) => {
  const [ versionLastPressTime, setVersionLastPressTime ] = React.useState(Date.now());
  const [ versionCountPress, setVersionCountPress ] = React.useState(0);

  React.useEffect(() => {
    if (versionCountPress >= 10) {
      setVersionCountPress(0);

      navigation.navigate('Develop');
    }
  }, [ versionCountPress ]);

  const onVersionPress = React.useCallback(() => {
    const currentTime = Date.now();
    const delta = currentTime - versionLastPressTime;

    setVersionLastPressTime(currentTime);
    setVersionCountPress(delta < 300 ? versionCountPress + 1 : 0);
  }, [ versionLastPressTime, versionCountPress, setVersionLastPressTime, setVersionCountPress ]);

  const appVersion = Constants?.manifest?.extra?.version?.name;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{
            height: appIconSize,
            aspectRatio: 1,
            borderWidth: perfectSize(2),
            borderColor: '#f5f7fa',
            borderRadius: appIconSize * 0.175,
            marginBottom: perfectSize(16),
          }}
          resizeMethod="resize"
          resizeMode="contain"
          source={ require('../../../assets/app-icon.png') }
        />
        <Typography
          style={{ }}
          align="center"
          text="Клиника-Сити"
          color="#333"
          fontSize={ 22 }
          regular
        />
        { appVersion && (
          <TouchableWithoutFeedback onPress={ onVersionPress }>
            <View>
              <Typography
                style={{ paddingHorizontal: perfectSize(16), paddingVertical: perfectSize(8) }}
                align="center"
                text={ `Версия приложения: ${appVersion}` }
                color="#999"
                fontSize={ 14 }
                regular
              />
            </View>
          </TouchableWithoutFeedback>
        ) }
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;
