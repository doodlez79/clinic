import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  card: {
    height: perfectSize(215),
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
    color: '#fff',
    fontSize: perfectSize(13),
    opacity: 0.6,
    textAlign: 'right',
  },
  linerGradient: {
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    top: 0,
  },
  guest: {
    color: '#fff',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: perfectSize(34),
    marginTop: perfectSize(15),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '55%',
    padding: perfectSize(16),
    zIndex: 9999,
  },
  buttonContainer: {
    width: '100%',
    height: '30%',
    padding: perfectSize(8),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  text: {
    textAlign: 'center',
  },
  infoCard: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: 9999,
  },
  infoCardText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: perfectSize(13),
    color: 'rgba( 51, 51, 51, 0.6)',
  },
});
