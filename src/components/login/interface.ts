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
  firstName: string;
  lastName: string;
  fullName: string;
  roleID: string;

  email: string;
  workingBranch: string;
  nationality: string;
  visa: string;
  citizenIdentification: string;

  password: string;
  passwordConfirm: string;

  taxCode: string;
  companyName: string;
  address: string;
  emailCompany: string;
  phoneNumberCompany: string;
  websiteCompany: string;
  abbreviationsCompany: string;
}

export type InformationForm = Pick<
  RegisterForm,
  'firstName' | 'lastName' | 'roleID'
>;

export type ContactForm = Pick<
  RegisterForm,
  'email' | 'workingBranch' | 'nationality' | 'visa' | 'citizenIdentification'
>;

export type PasswordForm = Pick<RegisterForm, 'password' | 'passwordConfirm'>;

export type CompanyForm = Pick<
  RegisterForm,
  | 'address'
  | 'websiteCompany'
  | 'companyName'
  | 'taxCode'
  | 'emailCompany'
  | 'phoneNumberCompany'
  | 'abbreviationsCompany'
>;

export interface DataRole {
  roleID: string;
  name: string;
}

export interface DataActiveAccount {
  email: string;
}

export interface RequestCheckTaxCode {
  taxCode: string;
}
export interface RequireCheckTaxCode {
  companyName: string;
  address: string;
}
