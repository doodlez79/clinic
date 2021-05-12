import { StyleSheet } from 'react-native';
import { alignTextConfig } from 'components/Typography/Typography.types';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: perfectSize(17),
    textAlign: alignTextConfig.CENTER,
    marginBottom: 0,
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
  },
});
