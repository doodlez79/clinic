import React, { FC, useCallback, useState } from 'react';

import { FlatList, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';

import NewsItem from 'components/NewsItem/NewsItem';
import { Container } from 'components/Container';
import { FooterSpinner } from 'components/FooterSpinner';

import { Actions, Selectors } from 'ducks';
import { defaultPageMeta } from 'ducks/News/News.config';

import { FORMAT } from 'constants/formatDate';
import { format, isValid } from 'date-fns';
import { NewsScreenProps } from './News.types';
import { styles } from './styles';

const NewsScreen: FC<NewsScreenProps> = () => {
  const meta = useSelector(Selectors.News.newsMeta);
  const newsItems = useSelector(Selectors.News.newsItems);
  const loading = useSelector(Selectors.News.isLoading);
  const [ isScroll, setIsScroll ] = useState(true);
  const dispatch = useDispatch();

  const getNews = (newMeta = meta, replace = true) => {
    dispatch(
      Actions.News.getNews.request(
        { meta: newMeta, replace },
        {
          resolve: isStopScrollGetData => setIsScroll(isStopScrollGetData),
        },
      ),
    );
  };

  useFocusEffect(useCallback(() => getNews(defaultPageMeta), []));

  return (
    <FlatList
      contentContainerStyle={ styles.container }
      data={ newsItems }
      ListFooterComponent={ () => <FooterSpinner loading={ loading } /> }
      onRefresh={ () => getNews(defaultPageMeta) }
      refreshing={ loading && !isScroll }
      onEndReached={ () => {
        if (isScroll && newsItems.length < meta.objectsCount) {
          getNews(
            {
              ...meta,
              page: meta.page + 1,
            },
            false,
          );
        }
      } }
      initialNumToRender={ 10 }
      keyExtractor={ (item, index) => `${index}-${item.id}` }
      onEndReachedThreshold={ Platform.OS === 'ios' ? 0 : 0.5 }
      renderItem={ ({ item, index }) => (
        <Container paddingSize={ 8 }>
          <NewsItem
            category={ item.category }
            key={ item.id }
            id={ item.id }
            green={ index % 2 === 0 }
            title={ item.title }
            description={ item.description }
            date={ item.publicationDate && isValid(item.publicationDate) ? format(item.publicationDate, FORMAT) : '' }
          />
        </Container>

      ) }
    />
  );
};

export default NewsScreen;
