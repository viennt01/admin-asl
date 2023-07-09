import axios, { AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
import { STATUS_CODE } from '@/constant/error-code';
import { headers as configHeaders } from './utils';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import router from 'next/router';
import { ROUTERS } from '@/constant/router';

export interface ResponseWithPayload<R> {
  status: STATUS_CODE;
  message: string;
  data: R;
}

export interface ResponseWithoutPayload {
  error_code: STATUS_CODE;
  message: string;
}

interface CRUDProps<T> {
  data?: T;
  options?: AxiosRequestConfig;
  headers?: AxiosHeaders;
  gw?: string;
  timeout?: number;
}

const MS_TIMEOUT = 10000;
const API_MAIN_GW = process.env.API_MAIN_GW;

export const GATEWAY = {
  API_MAIN_GW: 'API_MAIN_GW',
};

const getGateway = (gw?: string) => {
  switch (gw) {
    case GATEWAY.API_MAIN_GW: {
      return API_MAIN_GW;
    }
    default: {
      return API_MAIN_GW;
    }
  }
};

const requestWithTimeout = (
  promise: Promise<AxiosResponse>,
  ms = MS_TIMEOUT
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
};

const axiosResolver = async (promise: Promise<AxiosResponse>) => {
  return await promise
    .then((res) => {
      if (res.status === 200) return res.data;
      throw new Error(JSON.stringify(res.data) || 'Request failed');
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
  const accessToken = appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN);
  if (accessToken) {
    config.headers.Accesstoken = `${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN)
    ) {
      originalRequest._retry = true;
      try {
        const response = await apiClient.post(`${getGateway()}/refresh-token`, {
          refresh_token: appLocalStorage.get(LOCAL_STORAGE_KEYS.REFRESH_TOKEN),
        });

        const newAccessToken = response.data.access_token;
        configHeaders.setToken(newAccessToken);

        originalRequest.headers.Accesstoken = `${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
        router.replace(ROUTERS.LOGIN);
      }
    }

    return Promise.reject(error);
  }
);

export const get =
  <R>({ options, headers, gw, timeout }: CRUDProps<undefined>) =>
  (url: string): Promise<R> => {
    const axiosPromise = requestWithTimeout(
      apiClient.get(`${getGateway(gw)}${url}`, {
        headers: Object.assign({}, configHeaders.headers, headers),
        ...options,
      }),
      timeout
    );

    return axiosResolver(axiosPromise);
  };

export const post =
  <T, R>({ data, options, headers, gw, timeout }: CRUDProps<T>) =>
  (url: string): Promise<R> => {
    const axiosPromise = requestWithTimeout(
      apiClient.post(`${getGateway(gw)}${url}`, data, {
        headers: Object.assign({}, configHeaders.headers, headers),
        ...options,
      }),
      timeout
    );

    return axiosResolver(axiosPromise);
  };

export const put =
  <T, R>({ data, options, headers, gw, timeout }: CRUDProps<T>) =>
  (url: string): Promise<R> => {
    const axiosPromise = requestWithTimeout(
      apiClient.put(`${getGateway(gw)}${url}`, data, {
        headers: Object.assign({}, configHeaders.headers, headers),
        ...options,
      }),
      timeout
    );

    return axiosResolver(axiosPromise);
  };

export const deleteGW =
  <R>({ options, headers, gw, timeout }: CRUDProps<undefined>) =>
  (url: string): Promise<R> => {
    const axiosPromise = requestWithTimeout(
      apiClient.delete(`${getGateway(gw)}${url}`, {
        headers: Object.assign({}, configHeaders.headers, headers),
        ...options,
      }),
      timeout
    );

    return axiosResolver(axiosPromise);
  };
