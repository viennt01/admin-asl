import { IPagination } from '@/components/commons/table/table-default';
import { Dayjs } from 'dayjs';

export interface IPartner {
  userID: string;
  languageID: string;
  languageName: string;
  genderID: string;
  genderName: string;
  roleID: string;
  roleName: string;
  cityID: string;
  cityName: string;
  aslPersonalContactID: string;
  aslSalesMan: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  companyName: string;
  abbreviations: string;
  emailCompany: string;
  phoneNumber: string;
  taxCode: string;
  address: string;
  birthdated: string;
  workingBranch: string;
  nationality: string;
  visa: string;
  citizenIdentification: string;
  website: string;
  note: string;
  avatar: string;
  colorAvatar: string;
  defaultAvatar: string;
  lastUserLogin: string;
  lastUserLoginFailed: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  statusUser: string;
}

export interface IPartnerTable extends Omit<IPartner, 'userID'> {
  key: string;
  searchAll: string;
}

export interface IPartnerRequire extends IPagination {
  data: IPartner[];
}
//
export interface IQueryInputParamType {
  searchAll: string;
}
export interface IQuerySelectParamType {
  status: string[];
}

export interface IRequestPartnerType
  extends IQueryInputParamType,
    IQuerySelectParamType {
  paginateRequest: IPagination;
}

export type ISelectSearch = {
  [key in keyof IQueryInputParamType]: {
    label: string;
    value: string;
  };
};

export interface IPartnerDetailDataBody {
  id: string;
}

export interface IFormValues {
  userID: string;
  languageID: string;
  genderID: string;
  roleID: string;
  cityID: string;
  aslPersonalContactID: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  companyNameEN: string;
  companyNameVN: string;
  abbreviations: string;
  emailCompany: string;
  phoneNumber: string;
  taxCode: string;
  addressEN: string;
  addressVN: string;
  birthdated: Dayjs;
  workingBranch: string;
  nationality: string;
  visa: string;
  citizenIdentification: string;
  website: string;
  note: string;
  avatar: string;
  statusUser: string;
}

export interface IPartnerDetailType extends IFormValues {
  languageName: string;
  genderName: string;
  roleName: string;
  cityName: string;
  aslSalesMan: string;
  colorAvatar: string;
  defaultAvatar: string;
  lastUserLogin: string;
  lastUserLoginFailed: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export type IPartnerCreate = Omit<IFormValues, 'userID' | 'birthdated'> & {
  birthday: number;
};

export type IPartnerEdit = Omit<IFormValues, 'birthdated'> & {
  birthday: number;
};

export type IPartnerDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  searchAll: string;
}
export interface QuerySelectDraft {
  status: string[];
}
export interface RequestUnitTableDraft
  extends QueryInputDraft,
    QuerySelectDraft {
  paginateRequest: IPagination;
}

export type SelectDratSearch = {
  [key in keyof QueryInputDraft]: {
    label: string;
    value: string;
  };
};

//----------------------------------------------------------------

export interface UpdateStatusUnit {
  id: React.Key[];
  status: string;
}

export interface QueryInputRequest {
  searchAll: string;
}
export interface RequestUnitTableRequest extends QueryInputRequest {
  paginateRequest: IPagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
export interface ITypeUnit {
  typeUnitID: string;
  typeUnitName: string;
}
//----------------------------------------------------------------
//get all gender
export interface IGenderPartner {
  genderID: string;
  name: string;
}
