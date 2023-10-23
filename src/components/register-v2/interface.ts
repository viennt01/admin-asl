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
