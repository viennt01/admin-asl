import { ERROR_CODE } from '@/constant/error-code';
import { headers as configHeaders } from './utils';

export interface ResponseWithPayload<R> {
  error_code: ERROR_CODE;
  message: string;
  payload: R;
}

export interface ResponseWithoutPayload {
  error_code: ERROR_CODE;
  message: string;
}

interface CRUDProps<T> {
  data?: T;
  options?: RequestInit;
  headers?: HeadersInit;
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
  promise: Promise<Response>,
  ms = MS_TIMEOUT
): Promise<Response> => {
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

const fetchResolver = async (promise: Promise<Response>) => {
  return await promise
    .then(async (res) => {
      if (res.ok) return res.json();
      const error = await res.json();
      throw new Error(JSON.stringify(error) || 'Request failed');
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export const get =
  <T, R>({ options, headers, gw, timeout }: CRUDProps<T>) =>
  (url: string): Promise<R> => {
    const fetchPromise = requestWithTimeout(
      fetch(`${getGateway(gw)}${url}`, {
        headers: { ...configHeaders.headers, ...headers },
        ...options,
      }),
      timeout
    );
    return fetchResolver(fetchPromise);
  };

export const post =
  <T, R>({ data, options, headers, gw, timeout }: CRUDProps<T>) =>
  (url: string): Promise<R> => {
    const fetchPromise = requestWithTimeout(
      fetch(`${getGateway(gw)}${url}`, {
        headers: { ...configHeaders.headers, ...headers },
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      }),
      timeout
    );
    return fetchResolver(fetchPromise);
  };

export const put =
  <T, R>({ data, options, headers, gw, timeout }: CRUDProps<T>) =>
  (url: string): Promise<R> => {
    const fetchPromise = requestWithTimeout(
      fetch(`${getGateway(gw)}${url}`, {
        headers: { ...configHeaders.headers, ...headers },
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      }),
      timeout
    );
    return fetchResolver(fetchPromise);
  };

export const download =
  <T>({ options, headers, gw, timeout }: CRUDProps<T>) =>
  (url: string) => {
    const fetchPromise = requestWithTimeout(
      fetch(`${getGateway(gw)}${url}`, {
        headers: { ...configHeaders.headers, ...headers },
        ...options,
      }),
      timeout
    );
    return fetchResolver(fetchPromise);
  };

export const patch =
  <T>({ data, options, headers, gw, timeout }: CRUDProps<T>) =>
  (url: string) => {
    const fetchPromise = requestWithTimeout(
      fetch(`${getGateway(gw)}${url}`, {
        headers: { ...configHeaders.headers, ...headers },
        ...options,
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
      timeout
    );
    return fetchResolver(fetchPromise);
  };

export const deleteGW =
  <T>({ data, options, headers, gw, timeout }: CRUDProps<T>) =>
  (url: string): Promise<ResponseWithoutPayload> => {
    const fetchPromise = requestWithTimeout(
      fetch(`${getGateway(gw)}${url}`, {
        headers: { ...configHeaders.headers, ...headers },
        ...options,
        method: 'DELETE',
        body: JSON.stringify(data),
      }),
      timeout
    );
    return fetchResolver(fetchPromise);
  };

export const uploadFile =
  ({ data, headers, gw, timeout }: CRUDProps<FormData>) =>
  (url: string) => {
    const fetchPromise = requestWithTimeout(
      fetch(`${getGateway(gw)}${url}`, {
        headers: {
          ...headers,
        },
        method: 'POST',
        body: data,
      }),
      timeout
    );
    return fetchResolver(fetchPromise);
  };
