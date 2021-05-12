import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  btn: {
    height: perfectSize(50),
    padding: perfectSize(14),
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.greenBtn,
    borderRadius: perfectSize(12),
    position: 'relative',
  },
  btnSizeBig: {
    width: '100%',

    textAlign: 'center',
  },
  btnSizeSmall: {
    maxWidth: perfectSize(184),
    width: '100%',
  },
  btnTypeOutline: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
  },
  icon: {
    position: 'absolute',
    right: perfectSize(20),
  },
});
