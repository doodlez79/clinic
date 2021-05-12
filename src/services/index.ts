import LocationServices from 'services/Location';
import NetworkService from 'services/Network';
import Develop from './Develop';
import PushNotifications from './PushNotifications';
import MiscService from './Misc';
import { ApiServices } from './Api';

import Auth from './Auth';
import User from './User';
import Promo from './Promo';
import News from './News';
import Bonuses from './Bonuses';
import Notifications from './Notifications';
import LinkingService from './Linking';
import RecordFeedbackService from './RecordFeedback';

const API = new ApiServices();

const AuthService = new Auth(API);
const UserService = new User(API);
const DevelopService = new Develop();
const PromoService = new Promo(API);
const NewsService = new News(API);
const NotificationsService = new Notifications(API);
const MiscServices = new MiscService(API);
const RecordFeedbackServices = new RecordFeedbackService(API);
const PushNotificationService = new PushNotifications();
const GeoLocationService = new LocationServices();
const BonusesServices = new Bonuses(API);
const LinkingURLService = new LinkingService();
const NetworkStateService = new NetworkService();

export {
  LinkingURLService,
  NetworkStateService,
  AuthService,
  BonusesServices,
  PushNotificationService,
  API,
  DevelopService,
  UserService,
  PromoService,
  NewsService,
  NotificationsService,
  MiscServices,
  RecordFeedbackServices,
  GeoLocationService,
};
