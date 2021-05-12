import React from 'react';

import {
  View,
  Text,
  ScrollView, ViewStyle,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Container } from 'components/Container';
import { LinkText } from 'components/LinkText';

import { styles } from './styles';

type Props = {
  title: string;

  text?: string;
  icon?: () => React.ReactNode;
  linkText?: string;
  linkPress?: () => void;
  style?: ViewStyle
}

export const ModalContent: React.FC<Props> = ({
  text,
  title,
  linkText = 'Отправить повторно!',
  linkPress,
  icon,
  children,
  style,
}) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={ [ styles.container, style ] }>
      <Container paddingSize={ 8 }>
        <View style={ styles.titleBlock }>
          <Text style={ styles.title }>{title}</Text>
          {linkText && linkPress && (
          <LinkText onClick={ linkPress } text={ linkText } />
          )}
        </View>
      </Container>
      <ScrollView
        indicatorStyle="black"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: Math.max(safeAreaInsets.bottom, 16) }}
      >
        <View onStartShouldSetResponder={ () => true }>
          <View style={ styles.cardBlock }>{icon && icon()}</View>
          <Text style={ styles.text }>{text}</Text>
          { children }
        </View>
      </ScrollView>
    </View>
  );
};
