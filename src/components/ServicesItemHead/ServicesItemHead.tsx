import React, { FC, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Typography } from 'components/Typography';
import { colors } from 'constants/colors';

import { perfectSize } from 'helpers/perfectSize';
import HeartIcon from 'Icons/HeartIcon.svg';
import { SvgWithCssUri } from 'react-native-svg';
import { ServicesItemHeadProps } from './ServicesItemHead.types';

import { styles } from './styles';

const ServicesItemHead: FC<ServicesItemHeadProps> = ({
  onPress,
  name,
  icon,
  selected,
  green,
  inactiveIcon,
  style,
}) => {
  const renderColorBg = useCallback(() => {
    let color = colors.greenBtn;
    if (green) {
      color = colors.green;
    }
    if (!selected) {
      color = 'white';
    }
    return color;
  }, [ selected ]);

  const renderColorText = useCallback(() => {
    let color = 'white';
    if (!selected) {
      color = '#333';
    }
    return color;
  }, [ selected ]);

  const changeLargeText = (text: string) => {
    if (text.length > 13) {
      return text.slice(0, 13).concat('...');
    }
    return text;
  };

  return (
    <TouchableOpacity
      style={{
        ...style,
        marginRight: perfectSize(16),
      }}
      onPress={ onPress }
    >
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            padding: perfectSize(15),
            borderRadius: perfectSize(20),
            justifyContent: 'space-between',
            backgroundColor: renderColorBg(),
            width: perfectSize(96),
            height: perfectSize(139),
            overflow: 'hidden',
            borderWidth: !selected ? 1 : 0,
            borderColor: !selected ? '#f9f9f9' : '',
          }}
        >
          <Typography
            style={{
              maxWidth: perfectSize(100),
            }}
            text={ changeLargeText(name) }
            fontSize={ name.length > 3 ? 13 : 17 }
            color={ renderColorText() }
          />
          {
            selected && (
              <View>
                <HeartIcon style={ styles.icon } />
              </View>
            )
          }
          {
            (icon || inactiveIcon)
              ? (
                <SvgWithCssUri
                  style={{
                    width: perfectSize(64),
                    height: perfectSize(64),
                    zIndex: 99,
                  }}
                  uri={ selected ? icon : inactiveIcon }
                />
              )
              : (
                <View style={{
                  height: perfectSize(64),
                  width: perfectSize(64),
                }}
                />
              )
          }

        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServicesItemHead;
