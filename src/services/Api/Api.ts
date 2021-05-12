import { request } from 'helpers/Request';
import { REQUEST_METHODS } from 'helpers/Request/request.types';

class ApiServices {
  _accessToken: string;

  connectionNetwork: boolean

  baseUrl: string | null;

  errorHandlers: any[];

  constructor() {
    this._accessToken = '';
    this.baseUrl = null;
    this.errorHandlers = [];
    this.connectionNetwork = true;
  }

  setAccessToken(Token: string) {
    this._accessToken = Token;
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  hasNetworkConnection(isConnect: boolean) {
    this.connectionNetwork = isConnect;
  }

  addErrorHandler(handler: any) {
    this.errorHandlers.push(handler);

    return () => {
      this.errorHandlers = this.errorHandlers.filter(
        _handler => _handler !== handler,
      );
    };
  }

  _invokeErrorHandlers(error: any) {
    return Promise.all(
      this.errorHandlers.map(handler => handler(error)),
    ).then(() => Promise.resolve(error));
  }

  post(url: string, data: any) {
    return request({
      method: REQUEST_METHODS.POST,
      url: `${this.baseUrl}${url}`,
      token: this._accessToken,
      options: {
        data,
      },
    });
  }

  get(url: string, params: any = {}) {
    return request({
      method: REQUEST_METHODS.GET,
      url: `${this.baseUrl}${url}`,
      token: this._accessToken,
      options: {
        params,
      },
    }).catch(e => this._invokeErrorHandlers(e).then(err => err.body));
  }

  delete(url: string, params: any = {}) {
    return request({
      method: REQUEST_METHODS.GET,
      url: `${this.baseUrl}${url}`,
      token: this._accessToken,
      options: {
        params,
      },
    }).catch(e => this._invokeErrorHandlers(e).then(err => err.body));
  }

  patch(url: string, data: any = {}) {
    return request({
      method: REQUEST_METHODS.PATCH,
      url: `${this.baseUrl}${url}`,
      token: this._accessToken,
      options: {
        data,
      },
    });
  }
}

export default ApiServices;
