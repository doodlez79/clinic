import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    right: perfectSize(20),
    top: perfectSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    borderRadius: 100,
  },
});
