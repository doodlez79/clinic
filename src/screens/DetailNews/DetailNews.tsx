import React, { FC, useCallback } from 'react';
import {
  ActivityIndicator,
  RefreshControl, SafeAreaView, ScrollView, View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Typography } from 'components/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';

import { Container } from 'components/Container';
import Date from 'Icons/Date.svg';
import { alignTextConfig } from 'components/Typography/Typography.types';
import { colors } from 'constants/colors';
import { getContentByMarkDown } from 'helpers/GetContentByMarkDown/getContentByMarkDown';
import { DetailNewsScreenProps } from 'screens/DetailNews/DetailNews.types';
import { IconNewsByType } from 'components/NewsItem/News.config';
import { format } from 'date-fns';
import { IconResize } from 'components/IconResize';
import { perfectSize } from 'helpers/perfectSize';
import { FORMAT } from 'constants/formatDate';

import { styles } from './styles';

const DetailNewsScreen: FC<DetailNewsScreenProps> = ({ route }) => {
  const { id, green } = route.params;

  const dispatch = useDispatch();

  const getNewsItem = useCallback(() => {
    dispatch(Actions.News.getNewsItem.request({ id }));

    return () => dispatch(Actions.News.clearNewsItem());
  }, []);
  const newsItem = useSelector(
    Selectors.News.newsItem,
  );

  const isLoading = useSelector(
    Selectors.News.isLoading,
  );
  useFocusEffect(getNewsItem);

  if (isLoading || !newsItem) {
    return (
      <View style={{ marginTop: perfectSize(20) }}>
        <ActivityIndicator size="large" color={ !green ? colors.greenBtn : colors.green } />
      </View>
    );
  }

  const IconNewsCategory = () => IconNewsByType[newsItem.category](!green ? colors.greenBtn : colors.green);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        refreshControl={ <RefreshControl refreshing={ false } onRefresh={ getNewsItem } /> }
      >
        <Container paddingSize={ 16 } mb={ 34 }>
          <View style={ styles.circle } />
          <View style={ styles.icon }>
            <IconResize size={ 64 }>
              <IconNewsCategory />
            </IconResize>
          </View>
          <View
            style={{
              marginVertical: perfectSize(20),
            }}
          >
            <Typography
              text={ newsItem.title }
              style={{ maxWidth: perfectSize(200) }}
              fontSize={ 22 }
              align="left"
              color="#333333"
              mb={ 33 }
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Date strokeProps={ colors.green } />
              <Typography
                text={ newsItem.publicationDate ? format(newsItem.publicationDate, FORMAT) : '' }
                fontSize={ 13 }
                color="#999999"
                align={ alignTextConfig.LEFT }
                regular
                ml={ 8 }
              />
            </View>
          </View>
        </Container>

        <Container paddingSize={ 8 }>
          {newsItem.markdown?.blocks
            && newsItem.markdown?.blocks.map((item, index) => getContentByMarkDown(item, index))}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailNewsScreen;
