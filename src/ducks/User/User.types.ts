import { SEX_TYPE } from 'screens/Profile/Profile.types';
import { City } from 'ducks/Misc/Misc.types';

export interface UserStoreTypes {
  loading: boolean;
  error: string;
  profile: {
    id: string;
    phone: string;
    name: string;
    surname: string;
    patronymic: string;
    city: City | null;
    cardNumber: string | null;
    email: string | null;
    sex: SEX_TYPE | '';
    isEmailConfirmed: boolean;
    avatar: string;
    isBlocked: boolean;
    birthDate: Date | null
    settings: {
      id: string;
      smsNotifications: boolean;
      emailNotifications: boolean;
      pushNotifications: boolean;
    };
    isProfileCompleted: boolean;
    emailAwaitingConfirmation: null | string;
  };
  walletLinkId: string
}
