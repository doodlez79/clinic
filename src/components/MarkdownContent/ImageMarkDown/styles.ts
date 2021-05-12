/*
  THIS IS THE FINAL VERSION OF THIS FILE
  DO NOT CHANGE OR YOU WILL BE FIRED
*/

import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',

    resizeMode: 'contain',
  },
  imageModalHeader: {
    position: 'absolute',

    width: '100%',
    top: 0,

    alignItems: 'flex-end',
  },
  closeButton: {
    padding: perfectSize(20),
  },
});
