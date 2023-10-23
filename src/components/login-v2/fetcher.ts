import { API_AUTHENTICATE } from '@/fetcherAxios/endpoint';
import { API_AUTHENTICATE as API_AUTHENTICATE_REGISTER } from '@/fetcher/endpoint';
import { ResponseWithPayload } from '@/fetcherAxios';
import {
  post,
  ResponseWithPayload as ResponseWithPayloadRegister,
} from '@/fetcher';
import {
  DataActiveAccount,
  DataLogin,
  HeadersLogin,
  LoginData,
} from './interface';

export const login = (data: LoginData, headers: HeadersLogin) => {
  return post<LoginData, ResponseWithPayload<DataLogin>>({
    data,
    headers: {
      deviceName: headers.deviceName,
      ipAddress: headers.ipAddress,
    },
  })(API_AUTHENTICATE.LOGIN);
};

export const activeAccount = (data: DataActiveAccount) => {
  return post<
    DataActiveAccount,
    ResponseWithPayloadRegister<DataActiveAccount>
  >({
    data,
  })(API_AUTHENTICATE_REGISTER.ACTIVE_ACCOUNT);
};
