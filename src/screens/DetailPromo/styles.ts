import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  dataText: {
    fontSize: 13,
    fontFamily: 'OpenSans-Regular',
    color: '#999',
    marginLeft: 10,
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 30,
    maxWidth: 250,
  },

  circle: {
    position: 'absolute',
    right: 0,
    bottom: -80,
    width: 128,
    borderRadius: 100,
    height: 128,
    backgroundColor: '#E1F6F6',
  },
  icon: {
    position: 'absolute',
    right: 40,
    width: 64,
    height: 64,
    bottom: 20,
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 17,
  },
});
