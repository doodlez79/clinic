import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: perfectSize(20),
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: perfectSize(13),
    color: '#333',
  },
  checkbox: {
    alignItems: 'center',
    height: perfectSize(18),
    width: perfectSize(18),
    borderWidth: 2,
    borderColor: '#F5F7FA',
    borderRadius: 4,
    justifyContent: 'center',
    marginRight: perfectSize(10),
  },
  circle: {
    width: perfectSize(10),
    height: perfectSize(10),
    borderRadius: 100,
    backgroundColor: colors.green,
  },
});
