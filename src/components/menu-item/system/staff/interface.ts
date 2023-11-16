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
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  aslRoleID: string; //
  aslRoleName: string; //
  employeeCode: string; //
  ipAddress: string; //
  taxCode: string;
  address: string;
  userBirthday: string;
  workingBranch: string;
  nationality: string;
  visa: string;
  citizenIdentification: string;
  note: string;
  avatar: string;
  colorAvatar: string;
  defaultAvatar: string;
  lastUserLogin: string;
  lastUserLoginFailed: string;
  dateCreated: string;
  dateUpdated: string;
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
  aslRoleID: string;
  ipAddress: string;
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  taxCode: string;
  userBirthday: Dayjs;
  workingBranch: string;
  nationality: string;
  visa: string;
  citizenIdentification: string;
  note: string;
  avatar: string;
  statusUser: string;
}

export interface IPartnerDetailType extends IFormValues {
  employeeCode: string;
  languageName: string;
  genderName: string;
  roleName: string;
  aslRoleName: string;
  colorAvatar: string;
  defaultAvatar: string;
  lastUserLogin: string;
  lastUserLoginFailed: string;
  dateCreated: string;
  dateUpdated: string;
}

export type IPartnerCreate = Omit<IFormValues, 'userID' | 'userBirthday'> & {
  birthday: number;
};

export type IPartnerEdit = Omit<IFormValues, 'userBirthday'> & {
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
export interface QuerySelectRequest {
  typeUnitID: string;
}
export interface RequestUnitTableRequest
  extends QueryInputRequest,
    QuerySelectRequest {
  paginateRequest: IPagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
//----------------------------------------------------------------
//get all gender
export interface IGenderPartner {
  genderID: string;
  name: string;
}
//get all language
export interface ILanguage {
  languageID: string;
  name: string;
  imageLanguage: string;
}
//get all role staff
export interface IRoleStaff {
  roleID: string;
  abbreviations: string;
  name: string;
}
//get all role partner
export interface IAllPartner {
  aslPersonalContactID: string;
  fullName: string;
}
