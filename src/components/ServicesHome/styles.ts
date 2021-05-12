import { StyleSheet } from 'react-native';

import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  container: {
    marginBottom: perfectSize(16),
  },
  header: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: perfectSize(16),
  },
});
