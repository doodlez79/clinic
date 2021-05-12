import React from 'react';

import { View, TouchableOpacity, FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import { colors } from 'constants/colors';

import { Typography } from 'components/Typography';

import { styles } from './styles';

type Props = {
  navigationState: { routes: { key: string; title: string }[]; index: number };
  position: Animated.Adaptable<number>;
  setIndex: (i: number) => void;
}

export const CustomTabs: React.FC<Props> = ({ navigationState, setIndex }) => {
  const listRef = React.useRef<FlatList>(null);

  const scrollListToIndex = React.useCallback((index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true, viewOffset: styles.btn.marginHorizontal });
  }, [ listRef.current ]);

  return (
    <View>
      <FlatList
        horizontal
        contentContainerStyle={ styles.container }
        showsHorizontalScrollIndicator={ false }
        ref={ listRef }
        initialNumToRender={ navigationState.routes.length }
        initialScrollIndex={ 0 }
        onScrollToIndexFailed={ () => {} }
        keyExtractor={ (_, index) => `${index}` }
        data={ navigationState.routes }
        renderItem={ ({ item, index }) => (
          <TouchableOpacity
            key={ item.key }
            style={{
              borderWidth: navigationState.index === index ? 0 : 1,
              backgroundColor: navigationState.index === index ? colors.greenBtn : '#fff',
              ...styles.btn,
            }}
            onPress={ () => { setIndex(index); scrollListToIndex(index); } }
          >
            <Typography
              regular
              fontSize={ 14 }
              text={ item.title }
              color={ navigationState.index === index ? '#fff' : '#000' }
            />
          </TouchableOpacity>
        ) }
      />
    </View>
  );
};
