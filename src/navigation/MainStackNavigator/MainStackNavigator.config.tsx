import { BottomTabNavigator } from 'navigation/BottomTabNavigator';
import { ProfileScreen } from 'screens/Profile';
import { PromoScreen } from 'screens/Promo';
import { DetailPromo } from 'screens/DetailPromo';
import { MapScreen } from 'screens/Map';
import { NewsScreen } from 'screens/News';
import { DetailScreen } from 'screens/DetailNews';
import { NotificationsScreen } from 'screens/Notifications';
import { AboutScreen } from 'screens/About';
import { FeedbackScreen } from 'screens/Feedback';
import { RecordScreen } from 'screens/Record';
import { DetailServicesScreen } from 'screens/DetailServices';
import { FeedbackSuccessScreen } from 'screens/FeedbackSuccess';
import { RecordSuccessScreen } from 'screens/RecordSuccess';
import { HistoryBalanceScreen } from 'screens/HistoryBalance';
import { DevelopScreen } from 'screens/Develop';

export const MainStackNavigationConfig = [
  {
    id: 1,
    name: 'Home',
    component: BottomTabNavigator,
  },
  {
    id: 2,
    name: 'profile',
    component: ProfileScreen,
  },
  {
    id: 4,
    name: 'Promo',
    component: PromoScreen,
    title: 'Промо-акции',
    header: true,
  },
  {
    id: 5,
    name: 'Promo/Detail',
    component: DetailPromo,
    title: 'Акция',
    header: true,
  },
  {
    id: 6,
    name: 'News',
    component: NewsScreen,
    header: true,
    title: 'Статьи',
  },
  {
    id: 7,
    name: 'Map',
    component: MapScreen,
  },
  {
    id: 8,
    name: 'News/Detail',
    component: DetailScreen,
    header: true,
    title: 'Статья',
  },
  {
    id: 9,
    name: 'Feedback',
    component: FeedbackScreen,
  },
  {
    id: 10,
    name: 'Record',
    component: RecordScreen,
  },
  {
    id: 11,
    name: 'Notifications',
    component: NotificationsScreen,
  },
  {
    id: 12,
    name: 'About',
    component: AboutScreen,
    header: true,
    title: 'О приложении',
  },
  {
    id: 13,
    name: 'Detail/Services',
    component: DetailServicesScreen,
    header: true,
  },
  {
    id: 14,
    name: 'FeedbackSuccess',
    component: FeedbackSuccessScreen,
  },
  {
    id: 15,
    name: 'RecordSuccess',
    component: RecordSuccessScreen,
  },
  {
    id: 16,
    name: 'Balance',
    component: HistoryBalanceScreen,
    header: true,
    title: 'Операции по карте',
  },
  {
    id: 17,
    name: 'Develop',
    component: DevelopScreen,
    header: true,
    title: 'Экран разработчика',
  },
];
