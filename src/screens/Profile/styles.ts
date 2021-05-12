import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  name: {
    marginTop: perfectSize(10),

    fontFamily: 'OpenSans-SemiBold',
    fontSize: perfectSize(17),

    color: colors.green,

    textAlign: 'left',
  },
  logoutButton: {
    borderTopWidth: 1,
    padding: perfectSize(18),
    borderColor: '#f9f9f9',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
