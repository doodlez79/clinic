import { ViewStyle } from 'react-native';

export interface ServicesItemHeadProps {
  onPress: () => void;
  name: string;
  selected: boolean;
  icon: string,
  inactiveIcon: string,
  green: boolean

  style?: ViewStyle
}
