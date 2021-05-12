import React, { FC } from 'react';
import {
  Dimensions, Text, TouchableOpacity, View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import { colors } from 'constants/colors';
import Clock from 'Icons/Clock.svg';
import { Typography } from 'components/Typography';
import { alignTextConfig } from 'components/Typography/Typography.types';

import { IconByType } from 'components/Action/Action.config';

import { perfectSize } from 'helpers/perfectSize';
import { IconResize } from 'components/IconResize';
import { styles } from './styles';
import { ActionsProps } from './Action.types';

const { width } = Dimensions.get('window');

const Action: FC<ActionsProps> = ({
  title,
  description,
  date,
  id,
  disable = false,
  fullWidth,
  green = false,
  style,
  category,
  isInfinity = false,
}) => {
  const navigation = useNavigation();
  const IconCategory = () => IconByType[category](!disable, !green ? colors.green : colors.greenBtn);

  return (
    <TouchableOpacity
      activeOpacity={ disable ? 1 : 0.5 }
      onPress={ () => {
        if (!disable) {
          navigation.navigate('Promo/Detail', { id, green });
        }
      } }
      style={{
        width: fullWidth ? '100%' : width - perfectSize(48),
        marginHorizontal: fullWidth ? 0 : perfectSize(16),
        ...styles.container,
        ...style,
      }}
    >
      <Svg
        width="100"
        height="50"
        style={{
          position: 'absolute',
          right: perfectSize(12),
          bottom: 0,
        }}
      >
        <Path d="M0,50 a1,1 1 1,1 100,0" fill={ disable ? '#F9F9F9' : '#E1F6F6' } />
      </Svg>
      <View
        style={{
          position: 'absolute',
          right: perfectSize(30),
          bottom: perfectSize(20),
          zIndex: 9999,
          width: perfectSize(60),
          height: perfectSize(60),
        }}
      >
        <IconResize size={ 64 }>
          <IconCategory />
        </IconResize>

      </View>
      <View>
        <Typography
          text={ title }
          align={ alignTextConfig.LEFT }
          style={{ maxWidth: perfectSize(200) }}
          numberOfLines={ 1 }
          fontSize={ 17 }
          mb={ 2 }
          color={ disable ? 'gray' : '#000' }
        />
        <Text
          style={ disable
            ? { ...styles.description, color: 'gray' }
            : styles.description }
        >
          {description}
        </Text>
        {
          !isInfinity && date && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Clock strokeProps={ disable ? 'gray' : colors.green } />

              <Typography text={ `До ${date}` } fontSize={ 13 } regular color="#999" ml={ 5 } />
            </View>
          )
        }

      </View>
    </TouchableOpacity>
  );
};

export default Action;
