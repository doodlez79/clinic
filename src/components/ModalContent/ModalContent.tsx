import React from 'react';

import {
  View,
  Text,
  ScrollView, ViewStyle, Dimensions,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LinkText } from 'components/LinkText';
import { Container } from 'components/Container';

import { perfectSize } from 'helpers/perfectSize';
import { styles } from './styles';

type Props = {
  title: string;

  text?: string;
  icon?: () => React.ReactNode;
  style?: ViewStyle
  linkText?: string;
  linkPress?: () => void;
}

const ModalContent: React.FC<Props> = ({
  text,
  title,
  linkText = 'Отправить повторно',
  linkPress,
  icon,
  children,
  style,
}) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={ [ styles.container, style, { width: Dimensions.get('window').width }] }>
      <Container paddingSize={ 8 }>
        <View style={ styles.titleBlock }>
          <Text style={ styles.title }>{title}</Text>
          {linkText && linkPress && (
          <LinkText onClick={ linkPress } text={ linkText } />
          )}
        </View>
      </Container>
      <ScrollView contentContainerStyle={{ paddingHorizontal: perfectSize(16), paddingBottom: safeAreaInsets.bottom }}>
        <View onStartShouldSetResponder={ () => true }>
          <View style={ styles.cardBlock }>{icon && icon()}</View>
          <Text style={ styles.text }>{text}</Text>
          { children }
        </View>
      </ScrollView>
    </View>
  );
};

export default ModalContent;
