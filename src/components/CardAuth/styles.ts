import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    color: 'white',
    fontSize: perfectSize(17),
    marginLeft: perfectSize(6),
  },
  description: {
    fontFamily: 'OpenSans-Regular',
    color: 'white',
    fontSize: perfectSize(13),
    opacity: 0.6,
    textAlign: 'right',
  },
  guest: {
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: perfectSize(34),
    marginRight: perfectSize(10),
  },
  countRub: {
    color: 'white',
    opacity: 0.6,
    fontFamily: 'OpenSans-Regular',
    fontSize: perfectSize(20),
  },
  titleContainer: {
    height: '55%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: perfectSize(16),
    zIndex: 9999,
  },
  linerGradient: {
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
    width: '100%',
    height: '100%',
    top: 0,
  },
  buttonContainer: {
    height: '30%',
    overflow: 'hidden',
    zIndex: 9999,
    width: '100%',
    backgroundColor: '#fff',
    paddingRight: perfectSize(16),
    paddingLeft: perfectSize(16),
  },
  numberCard: {
    fontSize: perfectSize(13),
    marginTop: perfectSize(-10),
    fontFamily: 'OpenSans-Regular',
  },
  text: {
    textAlign: 'center',
  },
  infoCard: {
    height: '15%',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  infoCardText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: perfectSize(13),
    color: 'rgba( 51, 51, 51, 0.6)',
  },
});
