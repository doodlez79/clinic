import { AuthTypes } from 'ducks/Auth/Auth.types';
import { AppTypes } from 'ducks/App/App.types';
import { UserStoreTypes } from 'ducks/User/User.types';
import { PromoTypes } from 'ducks/Promo/Promo.types';
import { NewsTypes } from 'ducks/News/News.types';
import { NotificationStateType } from 'ducks/Notifications/Notifications.types';
import { MiscTypes } from 'ducks/Misc/Misc.types';
import { RecordFeedbackTypes } from 'ducks/RecordFeedback/reducer';
import { BonusesStateType } from 'ducks/Bonuses/Bonuses.types';
import { DevelopTypes } from 'ducks/Develop/Develop.types';

export interface StoreTypes {
  auth: AuthTypes;
  app: AppTypes;
  user: UserStoreTypes;
  promo: PromoTypes;
  news: NewsTypes;
  notification: NotificationStateType;
  misc: MiscTypes;
  recordFeedback: RecordFeedbackTypes;
  bonuses: BonusesStateType;
  develop: DevelopTypes;
  firstVisit: {firstVisit: boolean}
}
