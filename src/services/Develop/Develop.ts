import { REQUEST_METHODS } from 'helpers/Request/request.types';
import axios from 'axios';

export default class Develop {
  checkUrl(url: string, data: {test: string}) {
    return axios(
      {
        url: `${url}/health-check`,
        method: REQUEST_METHODS.POST,
        data,

      },

    ).then(res => res.data.test === data.test);
  }
}
