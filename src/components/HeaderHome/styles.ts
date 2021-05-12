import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  greeting: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: perfectSize(28),

    color: '#000',

    textAlign: 'left',
  },
  name: {
    marginTop: perfectSize(10),

    fontFamily: 'OpenSans-SemiBold',
    fontSize: perfectSize(17),

    color: colors.green,

    textAlign: 'left',
  },
  openProfileButton: {
  },
});
