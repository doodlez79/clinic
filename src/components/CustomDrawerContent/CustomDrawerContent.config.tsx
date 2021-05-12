import React from 'react';

import Profile from 'Icons/Profile.svg';
import MapMenu from 'Icons/MapMenu.svg';
import Promo from 'Icons/Promo.svg';
import Doc from 'Icons/Doc.svg';
import News from 'Icons/News.svg';
import Conversation from 'Icons/Conversation.svg';
import Category from 'Icons/Category.svg';

export const Screens = [
  {
    id: 1,
    title: 'Профиль',
    path: 'profile',
    icon: () => <Profile />,
  },
  {
    id: 2,
    title: 'Акции',
    path: 'Promo',
    icon: () => <Promo />,
  },
  {
    id: 4,
    title: 'Новости',
    path: 'News',
    icon: () => <News />,
  },
  {
    id: 9,
    title: 'Услуги',
    path: 'services',
    icon: () => <Category strokeProps="#333" />,
  },
  {
    id: 6,
    title: 'Уведомления',
    path: 'Notifications',
    icon: () => <Conversation />,
  },
  {
    id: 8,
    title: 'Записаться',
    path: 'Record',
    icon: () => <Doc strokeProps="#333333" />,
  },
  {
    id: 7,
    title: 'Карта',
    path: 'Map',
    icon: () => <MapMenu />,
  },
];
