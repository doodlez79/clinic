import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  bigCard: {
    alignItems: 'center',
    flexDirection: 'column-reverse',
    justifyContent: 'space-around',
    aspectRatio: 0.78,
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    aspectRatio: 2.62,
    borderRadius: 12,
  },
  text: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: perfectSize(17),
    color: 'white',
  },
  textSm: {
    fontFamily: 'OpenSans-Regular',
    fontSize: perfectSize(13),
    color: 'white',
  },
  icon: {
    height: perfectSize(64),
    width: perfectSize(64),
    position: 'absolute',
    bottom: perfectSize(-16),
    right: perfectSize(-64),
    opacity: 0.5,
  },
  linerBg: {
    borderRadius: perfectSize(12),
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    opacity: 0.27,
    height: '100%',
    top: 0,
  },
  mediumCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    aspectRatio: 5 / 1,
    borderRadius: 12,
  },
});
