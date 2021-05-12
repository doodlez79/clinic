import { ApiServices } from 'services/Api';
import { UserStoreTypes } from 'ducks/User/User.types';
import { parseISO } from 'date-fns';

export default class User {
  APIService: ApiServices;

  constructor(APIService: ApiServices) {
    this.APIService = APIService;
  }

  getUser() {
    return this.APIService.get('/me').then(res => this.mapEntity(res));
  }

  patchUser(newProfile: any) {
    return this.APIService.patch('/me', newProfile).then(res => this.mapEntity(res));
  }

  patchUserCity(param: {id: string}) {
    return this.APIService.patch('/me/city', { city: param });
  }

  mapEntity(user: Omit<UserStoreTypes['profile'], 'birthDate'>&{birthDate: string | null}) {
    return {
      ...user,
      birthDate: user.birthDate ? parseISO(user.birthDate) : null,
    };
  }

  getWalletLinkId(platform: string) {
    return this.APIService.post('/wallet', { platform });
  }
}
