import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  label: {
    fontFamily: 'OpenSans-Regular',
    fontSize: perfectSize(13),
    color: '#E0E0E0',
    marginBottom: 8,
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: perfectSize(17),
    color: '#333333',
  },
});
