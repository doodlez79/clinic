import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 2,
    padding: perfectSize(16),
    borderColor: '#F9F9F9',
    height: perfectSize(115),
    marginBottom: perfectSize(16),
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: perfectSize(17),
    marginBottom: 2,
  },
  description: {
    fontFamily: 'OpenSans-Regular',
    fontSize: perfectSize(13),
    marginBottom: perfectSize(14),
    maxWidth: perfectSize(200),
  },
});
