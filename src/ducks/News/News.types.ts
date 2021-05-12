import { MarkDownTypes } from 'types/MarkDown';

export interface NewsTypes {
  loading: boolean;
  newsItems: NewsItemType[];
  newsItem: NewsItemType | null;
  meta: NewsItemsMeta;

  error?: string;
}

export interface NewsItemType {
  id: number;
  title: string;
  description: string;
  publicationDate: Date | null;
  category: ICON_NEWS_CATEGORY;
  markdown?: MarkDownTypes;
}

export interface NewsItemsMeta {
  page: number;
  pagesCount: number;
  pageSize: number;
  objectsCount: number;
}

export enum ICON_NEWS_CATEGORY {
  CELEBRATION='CELEBRATION',
  ATTENTION = 'ATTENTION',
  NEWS='NEWS',
  PAGES='PAGES'
}
