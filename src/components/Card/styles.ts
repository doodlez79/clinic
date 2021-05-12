import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  container: {
    marginBottom: perfectSize(48),
    shadowColor: '#3bc6c3',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    borderRadius: 20,
    elevation: 20,
    position: 'relative',
  },
  card: {
    width: '100%',
    aspectRatio: 1.59,
    backgroundColor: 'transparent',
    borderRadius: 20,
    zIndex: 102,
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
  title: {
    fontFamily: 'OpenSans-SemiBold',
    color: 'white',
    fontSize: perfectSize(17),
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
    marginTop: perfectSize(15),
  },
  walletBtn: {
    // marginHorizontal: perfectSize(39),
    // height: perfectSize(48),
    width: perfectSize(265),
    height: perfectSize(48),
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

});
