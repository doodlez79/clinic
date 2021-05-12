import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  container: {
    height: perfectSize(114),
    paddingTop: perfectSize(16),
    paddingBottom: perfectSize(8),
    marginBottom: perfectSize(16),
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: perfectSize(16),
    borderColor: '#f9f9f9',
    flexDirection: 'row',
  },
});
