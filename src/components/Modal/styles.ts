import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: perfectSize(10),
    borderRadius: 5,
    margin: perfectSize(10),
  },
  content: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: '80%',
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
