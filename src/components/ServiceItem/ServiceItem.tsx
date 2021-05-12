import React from 'react';
import {
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { colors } from 'constants/colors';

import { Typography } from 'components/Typography';
import { alignTextConfig } from 'components/Typography/Typography.types';

import { perfectSize } from 'helpers/perfectSize';

import HeartIcon from 'Icons/HeartIcon.svg';

import { SvgWithCssUri } from 'react-native-svg';
import {
  ColorCardService,
  ServiceItemProps,
  TypeCardService,
} from './ServiceItem.types';

import { styles } from './styles';

const ServiceItem: React.FC<ServiceItemProps> = ({
  title,
  onClick,
  type,
  color,
  icon,
}) => {
  const { width: widthScreen } = useWindowDimensions();

  const getClassesForCard = () => {
    let result = {};
    if (type === TypeCardService.BIG) {
      result = {
        ...styles.bigCard,
        width: widthScreen / 3 - perfectSize(17),
      };
    }

    if (type === TypeCardService.MEDIUM) {
      result = {
        ...styles.mediumCard,
        width: widthScreen - perfectSize(30),
      };
    }

    if (type === TypeCardService.SMALL) {
      result = {
        width: widthScreen / 2 - perfectSize(20),
        ...styles.card,
      };
    }

    return result;
  };

  const fontSizeForItem = (text: string, type: TypeCardService) => {
    let result = {};
    if (text.length > 3) {
      result = {
        ...styles.textSm,
      };
    }
    if (type === TypeCardService.MEDIUM) {
      result = {
        ...styles.text,
      };
    }
    if (text.length <= 3 && type !== TypeCardService.MEDIUM) {
      result = {
        ...styles.text,
      };
    }
    return result;
  };

  const changeLargeText = (text: string) => {
    if (text.length > 15) {
      return text.slice(0, 15).concat('...');
    }
    return text;
  };
  const colorBlue = color === ColorCardService.BLUE;
  return (
    <TouchableOpacity
      activeOpacity={ 0.7 }
      onPress={ onClick }
      style={{
        ...getClassesForCard(),
        backgroundColor: colorBlue ? colors.green : colors.greenBtn,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      { type === TypeCardService.BIG && (
      <View>
        <HeartIcon style={ styles.icon } />
      </View>
      ) }
      <LinearGradient
        colors={ [ 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)' ] }
        style={ styles.linerBg }
        start={{ x: 1, y: 1.4 }}
      />

      {icon ? (
        <SvgWithCssUri
          style={{
            width: type === TypeCardService.BIG ? perfectSize(64) : perfectSize(48),
            height: type === TypeCardService.BIG ? perfectSize(64) : perfectSize(48),
          }}
          uri={ icon }
        />
      )
        : (
          <View style={{
            width: type === TypeCardService.BIG ? perfectSize(64) : perfectSize(48),
            height: type === TypeCardService.BIG ? perfectSize(64) : perfectSize(48),
          }}
          />
        )}
      <View style={{ padding: perfectSize(8) }}>
        <Typography
          align={ alignTextConfig.LEFT }
          text={ changeLargeText(title) }
          style={ fontSizeForItem(title, type) }
        />
      </View>
    </TouchableOpacity>
  );
};

export default ServiceItem;
