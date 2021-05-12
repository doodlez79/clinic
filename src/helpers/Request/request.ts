import axios from 'axios';
import { RequestTypes } from './request.types';

const request = ({
  method,
  url,
  token = '',
  options = { headers: {}, data: null, params: null },
}: RequestTypes): Promise<any> => {
  const { headers, params, data } = options;

  let headersRequest: { [a: string]: string } = {
    ...headers,
    'Content-Type': 'application/json',
  };
  if (token) {
    headersRequest = {
      ...headersRequest,
      authorization: `Bearer ${token}`,
    };
  }
  return axios({
    url,
    method,
    data,
    params,
    headers: headersRequest,
  })
    .then(res => res.data.payload)
    .catch(error => {
      throw error.response;
    });
};

export default request;
