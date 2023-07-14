import { API_AUTHENTICATE } from '@/fetcherAxios/endpoint';
import { ResponseWithPayload, post } from '@/fetcherAxios';

export interface LogoutData {
  accessToken: string;
}
export interface DataLogout {
  accessToken: string;
  refreshToken: string;
}
export interface headersLogout {
  ipAddress: string;
  deviceName: string;
}
export const logout = (data: LogoutData, headers: headersLogout) => {
  return post<LogoutData, ResponseWithPayload<DataLogout>>({
    data,
    headers: {
      deviceName: headers.deviceName,
      ipAddress: headers.ipAddress,
    },
  })(API_AUTHENTICATE.LOGOUT);
};
