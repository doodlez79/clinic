import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 2,
    padding: perfectSize(16),
    borderColor: '#F9F9F9',
    marginBottom: perfectSize(20),
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: perfectSize(17),
    marginBottom: 2,
  },
  description: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    marginBottom: 14,
    maxWidth: perfectSize(200),
  },
  date: {
    fontFamily: 'OpenSans-Regular',
    fontSize: perfectSize(13),
    color: '#999',
    marginLeft: perfectSize(5),
  },
});
