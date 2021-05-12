import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    paddingVertical: perfectSize(14),
    paddingHorizontal: perfectSize(16),
    maxHeight: perfectSize(132),

    borderRadius: 12,
    height: '100%',
    fontFamily: 'OpenSans-Regular',
    fontSize: 17,
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: perfectSize(64),
    width: '100%',
  },
});
