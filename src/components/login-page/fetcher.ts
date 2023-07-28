import { API_AUTHENTICATE } from '@/fetcherAxios/endpoint';
import {
  API_AUTHENTICATE as API_AUTHENTICATE_REGISTER,
  API_COMMON,
} from '@/fetcher/endpoint';
import { ResponseWithPayload } from '@/fetcherAxios';
import {
  get,
  post,
  ResponseWithPayload as ResponseWithPayloadRegister,
} from '@/fetcher';
import {
  DataActiveAccount,
  DataGender,
  DataLogin,
  DataRole,
  HeadersLogin,
  LoginData,
  RegisterForm,
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

export const register = (data: RegisterForm) => {
  return post<RegisterForm, ResponseWithPayloadRegister<RegisterForm>>({
    data,
  })(API_AUTHENTICATE_REGISTER.REGISTER);
};

export const listRole = () => {
  return get<undefined, ResponseWithPayloadRegister<DataRole[]>>({})(
    API_COMMON.GET_ROLE
  );
};

export const listGender = () => {
  return get<undefined, ResponseWithPayloadRegister<DataGender[]>>({})(
    API_COMMON.GET_GENDER
  );
};

export const activeAccount = (data: DataActiveAccount) => {
  return post<
    DataActiveAccount,
    ResponseWithPayloadRegister<DataActiveAccount>
  >({
    data,
  })(API_AUTHENTICATE_REGISTER.ACTIVE_ACCOUNT);
};
