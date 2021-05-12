import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    backgroundColor: 'white',
  },
  nextBtn: {
    backgroundColor: '#618F2C',
    width: '100%',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 10,
  },
  nextBtnPressIn: {
    backgroundColor: '#567e2a',
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  input: {
    marginBottom: 62,
    width: '100%',
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
  },
  containerText: {
    maxWidth: 280,
    color: 'rgb(153, 153,153)',
    textAlign: 'center',
    marginBottom: 24,
  },
});
