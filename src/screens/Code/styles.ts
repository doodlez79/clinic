import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';

export const styles = StyleSheet.create({
  text: {
    marginBottom: 24,
  },
  codeContainerStyleError: {
    borderWidth: 2,
    height: 60,
    width: 50,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 10,
    borderColor: colors.red,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  backBtn: {
    position: 'absolute',
    left: 20,
    top: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgb(249,249,249)',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeContainerStyle: {
    borderWidth: 2,
    height: 60,
    width: 50,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 10,
    borderColor: '#989898',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  codeContainerCaretStyle: {
    height: 60,
    width: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3AC6C4',
  },
  link: {
    marginTop: 24,
    textAlign: 'center',
  },
});
