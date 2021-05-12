/*
  THIS IS THE FINAL VERSION OF THIS FILE
  DO NOT CHANGE OR YOU WILL BE FIRED
*/

import React from 'react';

import {
  View,
  Image,
  Modal,
  TouchableOpacity, ActivityIndicator,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';

import { StatusBar } from 'expo-status-bar';

import { Stub } from 'components/Stub';

import ClearIcon from 'Icons/Clear.svg';
import { perfectSize } from 'helpers/perfectSize';
import { colors } from 'constants/colors';
import { styles } from './styles';

type Props = {
  url: string;
}

export const ImageMarkDown: React.FC<Props> = ({ url }) => {
  const [ showModal, setShowModal ] = React.useState(false);
  const [ loading, setLoading ] = React.useState(true);

  const openModal = React.useCallback(() => setShowModal(true), [ setShowModal ]);
  const closeModal = React.useCallback(() => setShowModal(false), [ setShowModal ]);

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <>
      <TouchableOpacity
        onPress={ openModal }
        style={{
          marginVertical: 10,
        }}
      >
        <View style={{
          height: perfectSize(200),
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',

        }}
        >
          <Image
            style={{
              ...styles.image,
            }}
            resizeMethod="resize"
            onLoadEnd={ () => {
              setLoading(false);
            } }
            source={{
              uri: url,
            }}
          />
          {loading && (
            <View style={{
              position: 'absolute',
            }}
            >
              <ActivityIndicator size="small" color={ colors.greenBtn } />
            </View>

          ) }
        </View>

      </TouchableOpacity>
      <Modal
        transparent
        visible={ showModal }
        onRequestClose={ closeModal }
      >
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="light" />
        <ImageViewer
          useNativeDriver
          enableSwipeDown
          backgroundColor="rgba(0, 0, 0, 0.9)"
          imageUrls={ [{ url, freeHeight: true }] }
          renderHeader={ () => (
            <View
              style={ [ styles.imageModalHeader, { top: safeAreaInsets.top }] }
            >
              <TouchableOpacity
                style={ styles.closeButton }
                onPress={ closeModal }
              >
                <ClearIcon strokeProps="white" />
              </TouchableOpacity>
            </View>
          ) }
          renderIndicator={ () => <Stub /> }
          onSwipeDown={ closeModal }
          onCancel={ closeModal }
        />
      </Modal>
    </>
  );
};
