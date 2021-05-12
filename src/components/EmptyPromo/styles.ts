import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  container: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F9F9F9',
    borderRadius: perfectSize(12),
    borderWidth: 1,
    padding: perfectSize(35),
  },
});
