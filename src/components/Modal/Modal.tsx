import React, { FC } from 'react';

import { View } from 'react-native';
import Modal from 'react-native-modal';
import { perfectSize } from 'helpers/perfectSize';
import { ModalComponentProps, POSITION_TYPE } from './Modal.types';

const ModalComponent: FC<ModalComponentProps> = ({
  modalVisible,
  setModalVisible,
  children,
  position = POSITION_TYPE.END,
  width,
  mb = 0,
  backdropColor,
}) => (
  <Modal
    onBackdropPress={ setModalVisible }
    isVisible={ modalVisible }
    swipeDirection={ [ 'down' ] }
    onSwipeComplete={ setModalVisible }
    propagateSwipe
    backdropColor={ backdropColor || 'rgba(0,0,0,0.5)' }
    style={{
      justifyContent: position,
      margin: 0,
      alignItems: 'center',
    }}
  >
    <View
      style={{
        borderBottomLeftRadius: position === POSITION_TYPE.CENTER ? 10 : 0,
        borderBottomRightRadius: position === POSITION_TYPE.CENTER ? 10 : 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: width || 'auto',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: mb,
      }}
    >
      {position !== POSITION_TYPE.CENTER && (
      <View
        style={{
          height: perfectSize(5),
          width: perfectSize(48),
          marginTop: perfectSize(10),
          borderRadius: 2.5,
          backgroundColor: '#F5F7FA',
        }}
      />
      )}

      {children}
    </View>
  </Modal>
);

export default ModalComponent;
