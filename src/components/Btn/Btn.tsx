import React, { FC } from 'react';
import {
  ActivityIndicator,
  TouchableHighlight,
  View,
} from 'react-native';

import { colors } from 'constants/colors';

import { Typography } from 'components/Typography';
import { BtnProps, SizeBtn, TypeBtn } from './Btn.types';
import { styles } from './styles';

const Btn: FC<BtnProps> = ({
  onClick,
  Title,
  Icon,
  size,
  typeBtn = TypeBtn.CONTAINED,
  disabled = false,
  fullWight,
  style,
  loading = false,
}) => {
  const getClasses = () => {
    let result = {};
    if (size === SizeBtn.SMALL) {
      result = {
        ...result,
        ...styles.btnSizeSmall,
      };
    }

    if (size === SizeBtn.BIG) {
      result = {
        ...result,
        ...styles.btnSizeBig,
      };
    }
    if (typeBtn === TypeBtn.OUTLINE) {
      result = {
        ...result,
        ...styles.btnTypeOutline,
      };
    }
    if (disabled) {
      result = {
        ...result,
        backgroundColor: '#E0E0E0',
      };
    }
    if (fullWight) {
      result = {
        ...result,
        width: '100%',
      };
    }

    return {
      ...styles.btn,
      ...result,
      ...style,
    };
  };

  return (
    <TouchableHighlight
      activeOpacity={ 0.7 }
      underlayColor={ colors.touchColor }
      disabled={ disabled }
      onPress={ onClick }
      style={ getClasses() }
    >
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <>
          { typeof Title === 'string' ? (
            <Typography regular color="#fff" text={ Title } />
          ) : Title }

          <View style={ styles.icon }>{Icon}</View>
        </>
      )}
    </TouchableHighlight>
  );
};

export default Btn;
