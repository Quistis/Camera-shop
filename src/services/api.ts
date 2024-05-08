import axios, {AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';

const BACKEND_URL = 'https://camera-shop.accelerator.htmlacademy.pro/';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: true,
};

type ErrorMessageType = {
  type: string;
  message: string;
}

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const errorMessage = (error.response.data);
        toast.warn(errorMessage.message);
      }

      throw error;
    }
  );

  return api;
};
