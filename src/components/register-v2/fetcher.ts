import {
  get,
  post,
  ResponseWithPayload as ResponseWithPayloadRegister,
} from '@/fetcher';
import {
  DataRole,
  RegisterForm,
  RequestCheckTaxCode,
  RequireCheckTaxCode,
} from './interface';
import {
  API_COMMON,
  API_AUTHENTICATE as API_AUTHENTICATE_REGISTER,
} from '@/fetcher/endpoint';

export const listRole = () => {
  return get<undefined, ResponseWithPayloadRegister<DataRole[]>>({})(
    API_COMMON.GET_ROLE
  );
};

export const checkTaxCode = (data: RequestCheckTaxCode) => {
  return post<
    RequestCheckTaxCode,
    ResponseWithPayloadRegister<RequireCheckTaxCode>
  >({
    data,
  })(API_AUTHENTICATE_REGISTER.CHECK_TAX_CODE);
};

export const register = (data: RegisterForm) => {
  return post<RegisterForm, ResponseWithPayloadRegister<RegisterForm>>({
    data,
  })(API_AUTHENTICATE_REGISTER.REGISTER);
};
