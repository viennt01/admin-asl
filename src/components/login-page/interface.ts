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
  'email' | 'phoneNumber' | 'address' | 'cityName' | 'roleName'
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
>;

export interface DataRole {
  roleID: string;
  refreshToken: string;
}
