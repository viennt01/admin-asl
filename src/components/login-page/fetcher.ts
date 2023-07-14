import { API_AUTHENTICATE } from '@/fetcherAxios/endpoint';
import { ResponseWithPayload, post } from '@/fetcherAxios';

export interface LoginData {
  email: string;
  password: string;
}
export interface DataLogin {
  accessToken: string;
  refreshToken: string;
}
export interface headersLogin {
  ipAddress: string;
  deviceName: string;
}

export const login = (data: LoginData, headers: headersLogin) => {
  return post<LoginData, ResponseWithPayload<DataLogin>>({
    data,
    headers: {
      deviceName: headers.deviceName,
      ipAddress: headers.ipAddress,
    },
  })(API_AUTHENTICATE.LOGIN);
};
