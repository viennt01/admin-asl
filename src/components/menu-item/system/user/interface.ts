import { Pagination } from '@/components/commons/table/table-default';
import { Dayjs } from 'dayjs';

export interface User {
  userID: string;
  roleID: string;
  roleName: string;
  genderID: string;
  genderName: string;
  emailAccount: string;
  firstName: string;
  lastName: string;
  fullName: string;
  companyName: string;
  abbreviationsCompany: string;
  emailCompany: string;
  birthday: string;
  employeeCode: string;
  taxCode: string;
  phoneNumber: string;
  address: string;
  citizenIdentification: string;
  visa: string;
  nationality: string;
  workingBranch: string;
  note: string;
  website: string;
  avatar: string;
  colorAvatar: string;
  defaultAvatar: string;
  lastLoginUser: string;
  lastFailedLoginUser: string;
  statusUser: string;
  createdDateUser: string;
  updatedDateUser: string;
}

export interface UserTable extends Omit<User, 'userID'> {
  key: string;
  searchAll: string;
}

export interface UserRequire extends Pagination {
  data: User[];
}
//
export interface QueryInputParamType {
  searchAll: string;
  genderID: string;
  emailAccount: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthday: string;
  employeeCode: string;
  taxCode: string;
  phoneNumber: string;
  address: string;
  citizenIdentification: string;
  visa: string;
  nationality: string;
  workingBranch: string;
  note: string;
  companyName: string;
  abbreviationsCompany: string;
  emailCompany: string;
  website: string;
}
export interface QuerySelectParamType {
  statusUser: string[];
}

export interface RequestUserType
  extends QueryInputParamType,
    QuerySelectParamType {
  paginateRequest: Pagination;
}

export type SelectSearch = {
  [key in keyof QueryInputParamType]: {
    label: string;
    value: string;
  };
};

export interface UserDetailDataBody {
  id: string;
}

export interface FormValues {
  userID: string;
  roleID: string; //
  roleName: string; //
  genderID: string; //
  genderName: string; //
  emailAccount: string;
  firstName: string; //
  lastName: string; //
  fullName: string; //
  companyName: string; //
  abbreviationsCompany: string; //
  emailCompany: string; //
  birthday: Dayjs; //
  employeeCode: string; //
  taxCode: string; //
  phoneNumber: string; //
  address: string; //
  citizenIdentification: string;
  visa: string; //
  nationality: string; //
  workingBranch: string; //
  note: string; //
  website: string; //
  avatar: string; //
  colorAvatar: string; //
  defaultAvatar: string; //
  lastLoginUser: string;
  lastFailedLoginUser: string;
  statusUser: string;
  createdDateUser: string; //
  updatedDateUser: string; //
}

export interface UnitDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}
//----------------------------------------------------------------

export interface UpdateStatusUser {
  id: string[];
  status: string;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
