import React, { FC } from 'react';
import { TouchableHighlight } from 'react-native';
import Close from 'Icons/Close.svg';

import { CloseBtnProps } from 'components/CloseBtn/CloseBtn.types';

import { IconResize } from 'components/IconResize';
import { styles } from './styles';

const CloseBtn: FC<CloseBtnProps> = ({ onClose, top = 20 }) => (
  <TouchableHighlight
    style={{ ...styles.closeBtn, top }}
    onPress={ onClose }
    underlayColor="#fff"
    activeOpacity={ 0.7 }
  >
    <IconResize size={ 52 }>
      <Close />
    </IconResize>

  </TouchableHighlight>
);

export default CloseBtn;
