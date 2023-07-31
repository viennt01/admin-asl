import { API_AUTHENTICATE } from '@/fetcherAxios/endpoint';
import { ResponseWithPayload, post } from '@/fetcherAxios';

export interface LogoutData {
  accessToken: string;
  deviceName: string;
  ipAddress: string;
}
export interface DataLogout {
  accessToken: string;
  refreshToken: string;
}
export const logout = (data: LogoutData) => {
  return post<LogoutData, ResponseWithPayload<DataLogout>>({
    data,
  })(API_AUTHENTICATE.LOGOUT);
};
