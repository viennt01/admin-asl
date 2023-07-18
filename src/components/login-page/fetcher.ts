import { API_AUTHENTICATE } from '@/fetcherAxios/endpoint';
import { API_AUTHENTICATE as API_AUTHENTICATE_REGISTER } from '@/fetcher/endpoint';
import { ResponseWithPayload } from '@/fetcherAxios';
import {
  post,
  ResponseWithPayload as ResponseWithPayloadRegister,
} from '@/fetcher';

export interface LoginData {
  email: string;
  password: string;
}
export interface DataLogin {
  accessToken: string;
  refreshToken: string;
}
export interface HeadersLogin {
  ipAddress: string;
  deviceName: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  fullName: string;
  address: string;
  birthDay: string;
  phoneNumber: string;
  genderName: string;
  cityName: string;
  roleName: string;
  companyName: string;
  taxCodeCompany: string;
  emailCompany: string;
  phoneNumberCompany: string;
  addressCompany: string;
  cityCompany: string;
}

export type InformationForm = Pick<
  RegisterForm,
  'firstName' | 'lastName' | 'birthDay' | 'genderName'
>;

export type ContactForm = Pick<
  RegisterForm,
  'email' | 'phoneNumber' | 'address' | 'cityName'
>;

export type PasswordForm = Pick<RegisterForm, 'password' | 'passwordConfirm'>;

export type CompanyForm = Pick<
  RegisterForm,
  | 'companyName'
  | 'phoneNumberCompany'
  | 'emailCompany'
  | 'addressCompany'
  | 'cityCompany'
  | 'taxCodeCompany'
  | 'roleName'
>;

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
  return post<RegisterForm, ResponseWithPayloadRegister<DataLogin>>({
    data,
  })(API_AUTHENTICATE_REGISTER.REGISTER);
};
