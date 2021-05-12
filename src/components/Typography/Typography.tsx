import React, { FC } from 'react';
import { Text } from 'react-native';

import { perfectSize } from 'helpers/perfectSize';
import { alignTextConfig, TypographyProps } from './Typography.types';
import { styles } from './styles';

const Typography: FC<TypographyProps> = ({
  text,
  fontSize = 17,
  mb,
  ml,
  mt,
  mr,
  bold = false,
  color = '#000',
  style = {},
  regular = false,
  align = alignTextConfig.CENTER,
  onPress,
  numberOfLines = 0,
  ellipsizeMode = undefined,
  children,
}) => {
  const getStyles = () => {
    let result = styles.title;

    if (fontSize) {
      result = {
        ...result,
        fontSize: perfectSize(fontSize),
      };
    }
    if (regular) {
      result = {
        ...result,
        fontFamily: 'OpenSans-Regular',
      };
    }
    if (align) {
      result = {
        ...result,
        textAlign: align,
      };
    }
    if (color) {
      result = {
        ...result,
        color,
      };
    }
    if (bold) {
      result = {
        ...result,
        fontFamily: 'OpenSans-Bold',
      };
    }
    if (style) {
      result = {
        ...result,
        ...style,
      };
    }
    if (mb) {
      result = {
        ...result,
        marginBottom: perfectSize(mb),
      };
    }
    if (mr) {
      result = {
        ...result,
        marginRight: perfectSize(mr),
      };
    }
    if (mt) {
      result = {
        ...result,
        marginTop: perfectSize(mt),
      };
    }
    if (ml) {
      result = {
        ...result,
        marginLeft: perfectSize(ml),
      };
    }
    return result;
  };

  return (
    <Text
      onPress={ onPress }
      numberOfLines={ numberOfLines }
      ellipsizeMode={ ellipsizeMode }
      style={ getStyles() }
    >
      {text || children}
    </Text>
  );
};

export default Typography;
