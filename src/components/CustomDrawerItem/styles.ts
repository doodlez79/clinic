import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  DrawerItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
    padding: perfectSize(9),
  },
  icon: {
    width: perfectSize(36),
    height: perfectSize(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
