import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: '100%',
    maxHeight: perfectSize(440),

    paddingTop: perfectSize(16),

    backgroundColor: '#ffffff',
  },
  titleBlock: {
    flexDirection: 'row',
    marginBottom: perfectSize(30),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: perfectSize(17),
    color: '#333333',
  },
  cardBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: perfectSize(16),
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: perfectSize(13),
    color: '#333',
  },
});
