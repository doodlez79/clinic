import Attention from 'Icons/CategoryNews/Attention.svg';
import Celebration from 'Icons/CategoryNews/Celebration.svg';
import NewsIcon from 'Icons/CategoryNews/News.svg';
import Pages from 'Icons/CategoryNews/Pages.svg';

import React from 'react';
import { ICON_NEWS_CATEGORY } from 'ducks/News/News.types';

export const IconNewsByType = {
  /* eslint-disable */
  [ICON_NEWS_CATEGORY.ATTENTION]: (color: string) =>  <Attention fill={ color } />,
  [ICON_NEWS_CATEGORY.PAGES]: (color: string) => <Pages fill={ color } />,
  [ICON_NEWS_CATEGORY.CELEBRATION]: (color: string) => <Celebration fill={ color } />,
  [ICON_NEWS_CATEGORY.NEWS]: (color: string) => <NewsIcon fill={ color } />,
};

