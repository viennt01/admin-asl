export interface RegisterForm {
  roleID: string;
  email: string;
  fullName: string;

  taxCode: string;
  companyName: string;
  address: string;
  emailCompany: string;
  phoneNumberCompany: string;

  password: string;
  passwordConfirm: string;
}

export interface DataRole {
  roleID: string;
  name: string;
}

export interface RequestCheckTaxCode {
  taxCode: string;
}
export interface RequireCheckTaxCode {
  companyName: string;
  address: string;
}
