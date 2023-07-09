import { API_AUTHENTICATE } from '@/fetcher/endpoint';
import { ResponseWithPayload, post } from '@/fetcherAxios';

export interface LoginData {
  username: string;
  password: string;
  ipAddress: string;
  deviceName: string;
}
export interface DataLogin {
  accessToken: string;
  refreshToken: string;
}

export const login = (data: LoginData) => {
  return post<LoginData, ResponseWithPayload<DataLogin>>({ data })(
    API_AUTHENTICATE.LOGIN
  );
};
