import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  icon: {
    height: perfectSize(60),
    width: perfectSize(60),
    position: 'absolute',
    bottom: perfectSize(-96),
    right: perfectSize(-24),
    opacity: 0.5,
  },
});
