import { post, ResponseWithPayload } from '@/fetcher';
import { API_AUTHENTICATE } from '@/fetcher/endpoint';

export interface LoginData {
  username: string;
  password: string;
}

export const login = (data: LoginData) => {
  return post<LoginData, ResponseWithPayload<string>>({ data })(
    API_AUTHENTICATE.LOGIN
  );
};
