import { Dimensions } from 'react-native';

export const defaultDelta = {
  latitudeDelta: 0.00522,
  longitudeDelta:
    (Dimensions.get('window').width / Dimensions.get('window').height)
    * 0.00522,
};
