import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  DrawerItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
    padding: perfectSize(9),
  },
  DrawerLabel: {
    fontSize: perfectSize(17),
    paddingLeft: 17,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
  },
  labelStyle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 17,
    color: colors.greenBtn,
  },
  text: {
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 17,
  },
});
