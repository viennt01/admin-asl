import { IPagination } from '@/components/commons/table/table-default';

export interface IPartner {
  partnerID: string;
  cityID: string;
  cityName: string;
  countryName: string;
  aslPersonalContactID: string;
  saleManName: string;
  companyName: string;
  abbreviations: string;
  emailCompany: string;
  phoneNumber: string;
  taxCode: string;
  address: string;
  website: string;
  note: string;
  statusPartner: string;
  rolePartner: IRolePartner[];
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface IPartnerTable extends Omit<IPartner, 'partnerID'> {
  key: string;
  searchAll: string;
}

export interface IPartnerRequire extends IPagination {
  data: IPartner[];
}
//
export interface IQueryInputParamType {
  searchAll: string;
  rolePartner: string;
}
export interface IQuerySelectParamType {
  status: string[];
}
export interface IRolePartner {
  roleID: string;
  abbreviations: string;
  name: string;
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
  partnerID: string;
  cityID: string;
  aslPersonalContactID: string;
  companyName: string;
  abbreviations: string;
  emailCompany: string;
  phoneNumber: string;
  taxCode: string;
  address: string;
  website: string;
  note: string;
  statusPartner: string;
  rolePartners: string[];
  userBaseDTOs: IUserBaseDTOs[];
}
export interface IRolePartners {
  partnerRoleDetailID?: string;
  partnerRoleID: string;
  isDelete?: boolean;
}
export interface IUserBaseDTOs {
  userID: string;
  employeeCode: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}
export interface IUserBaseDTOsTable extends Omit<IUserBaseDTOs, 'userID'> {
  key: string;
}
export interface IPartnerDetailType extends Omit<IFormValues, 'rolePartners'> {
  rolePartners: IRolePartners[];
  countryName: string;
  cityName: string;
  saleManName: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export type IPartnerCreate = Omit<
  IFormValues,
  'partnerID' | 'userBaseDTOs' | 'rolePartners' | 'address' | 'companyName'
> & {
  rolePartners: string[];
  companyNameEN: string;
  companyNameVN: string;
  addressEN: string;
  addressVN: string;
};

export type IPartnerEdit = Omit<
  IFormValues,
  'userBaseDTOs' | 'rolePartners' | 'address' | 'companyName'
> & {
  rolePartnerUpdateRequests: IRolePartners[];
  companyNameEN: string;
  companyNameVN: string;
  addressEN: string;
  addressVN: string;
};

export type IPartnerDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface UpdateStatusUnit {
  id: React.Key[];
  status: string;
}

export interface QueryInputRequest {
  searchAll: string;
  rolePartner: string;
}
export interface QuerySelectRequest {
  status: string[];
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
//Add user partner
export interface IRequestAddUserPartner {
  genderID: string; //
  partnerID: string;
  email: string; //
  firstName: string; //
  lastName: string; //
  fullName: string; //
  birthday: number; //
  phoneNumber: string; //
  address: string; //
  taxCode: string; //
  visa: string; //
  citizenIdentification: string; //
  workingBranch: string;
  nationality: string;
  note: string;
}
