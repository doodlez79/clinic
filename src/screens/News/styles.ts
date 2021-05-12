import { StyleSheet } from 'react-native';

import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  container: {
    paddingTop: perfectSize(16),
  },
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
  headerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    bottom: 20,
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 17,
  },
});
