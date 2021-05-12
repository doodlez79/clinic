import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: perfectSize(20),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: perfectSize(439),
    height: '100%',
    width: '100%',
  },
  titleBlock: {
    flexDirection: 'row',
    marginBottom: perfectSize(57),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: perfectSize(16),
  },
});
