import { ApiServices } from 'services/Api';

export default class AuthService {
  APIService: ApiServices;

  constructor(APIService: ApiServices) {
    this.APIService = APIService;
  }

  authInit(phone: string) {
    return this.APIService.post('/auth/init', phone);
  }

  authSingUp(sessionToken: string, name: string) {
    return this.APIService.post('/auth/sign-up', {
      session: sessionToken,
      name,
    });
  }

  getAccessToken(sessionToken: string, code: string | number) {
    return this.APIService.post('/auth/sign-in', {
      session: sessionToken,
      code,
    });
  }

  resendCode(sessionToken: string) {
    return this.APIService.post('/auth/resend-code', {
      session: sessionToken,
    });
  }

  cancelAuth(sessionToken: string) {
    return this.APIService.post('/auth/cancel', {
      session: sessionToken,
    });
  }

  signOut() {
    return this.APIService.post('/auth/sign-out', {})
      .then(response => response.data)
      .catch(e => {
        throw e;
      });
  }
}
