import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: perfectSize(8),
  },
  btn: {
    marginVertical: perfectSize(16),
    marginHorizontal: perfectSize(8),
    paddingHorizontal: perfectSize(32),
    paddingVertical: perfectSize(12),
    borderRadius: 12,
    borderColor: '#F9F9F9',
  },
});
