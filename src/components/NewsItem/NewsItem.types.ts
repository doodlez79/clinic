import { ICON_NEWS_CATEGORY } from 'ducks/News/News.types';

export interface NewsItemProps {
  id: number;
  title: string;
  description: string;
  date: string;
  green: boolean;
  category: ICON_NEWS_CATEGORY
}
