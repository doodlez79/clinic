import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  label: {
    fontSize: perfectSize(13),
    fontFamily: 'OpenSans-Regular',
    marginBottom: 5,
    color: '#e0e0e0',
  },
  success: {
    borderColor: colors.greenBtn,
  },
  error: {
    borderColor: colors.red,
  },
  edit: {
    borderColor: colors.green,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    maxWidth: perfectSize(250),
    width: '100%',
    fontSize: perfectSize(17),
    paddingHorizontal: perfectSize(10),
    paddingRight: perfectSize(16),
    fontFamily: 'OpenSans-Regular',
  },
  input: {
    height: perfectSize(50),
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: perfectSize(10),
    paddingRight: perfectSize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#F5F7FA',
    fontFamily: 'OpenSans-Regular',
    color: '#333',
    fontSize: perfectSize(17),
  },
});
