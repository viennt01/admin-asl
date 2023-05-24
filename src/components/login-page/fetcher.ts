import { postLogin, ResponseWithPayload } from '@/fetcher';
import { API_AUTHENTICATE } from '@/fetcher/endpoint';

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
  return postLogin<LoginData, ResponseWithPayload<DataLogin>>({ data })(
    API_AUTHENTICATE.LOGIN
  );
};
