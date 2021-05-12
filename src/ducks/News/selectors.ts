import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getNews = (state: StoreTypes) => state.news;

export const isLoading = createSelector(getNews, news => news.loading);
export const newsItems = createSelector(getNews, news => news.newsItems);
export const newsItem = createSelector(getNews, news => news.newsItem);
export const newsMeta = createSelector(getNews, news => news.meta);
