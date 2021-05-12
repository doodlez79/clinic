import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  badge: {
    height: perfectSize(8),
    width: perfectSize(8),
    borderRadius: 100,
    position: 'absolute',
    top: 0,
    left: perfectSize(5),
  },
});
