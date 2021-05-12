import { AxiosRequestConfig } from 'axios';

export enum REQUEST_METHODS {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface RequestTypes {
  method: REQUEST_METHODS;
  url: string;

  headers?: { [a: string]: string };
  token?: string;
  options?: AxiosRequestConfig;
}
