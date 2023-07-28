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
  DateOfBirth: string;
  phoneNumber: string;
  genderID: string;
  roleID: string;
  companyName: string;
  taxCodeCompany: string;
  emailCompany: string;
  phoneNumberCompany: string;
  addressCompany: string;
}

export type InformationForm = Pick<
  RegisterForm,
  'firstName' | 'lastName' | 'DateOfBirth' | 'genderID'
>;

export type ContactForm = Pick<
  RegisterForm,
  'email' | 'phoneNumber' | 'address' | 'roleID'
>;

export type PasswordForm = Pick<RegisterForm, 'password' | 'passwordConfirm'>;

export type CompanyForm = Pick<
  RegisterForm,
  | 'companyName'
  | 'phoneNumberCompany'
  | 'emailCompany'
  | 'addressCompany'
  | 'taxCodeCompany'
>;

export interface DataRole {
  roleID: string;
  name: string;
}

export interface DataGender {
  genderID: string;
  name: string;
}

export interface DataActiveAccount {
  email: string;
}
