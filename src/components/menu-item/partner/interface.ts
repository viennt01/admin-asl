import { IPagination } from '@/components/commons/table/table-default';

export enum TYPE_TABS {
  GET_PARTNER_BY_AGENT = 'GET_PARTNER_BY_AGENT',
  GET_PARTNER_BY_LINER = 'GET_PARTNER_BY_LINER',
  GET_PARTNER_BY_CUSTOMER = 'GET_PARTNER_BY_CUSTOMER',
  GET_PARTNER_BY_REQUEST = 'GET_PARTNER_BY_REQUEST',
}

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
  rolePartner: string[];
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
  seaPricingForPartnerDTOs: ISeaPricingForPartnerDTOs[];
  truckingPricingForPartnerDTOs: ITruckingPricingForPartnerDTOs[];
  customPricingForPartnerDTOs: ICustomPricingForPartnerDTOs[];
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
export interface ISeaPricingForPartnerDTOs {
  seaPricingID: string;
  podName: string;
  polName: string;
  commodityName: string;
  currencyAbbreviations: string;
  vendor: string;
  note: string;
  effectDated: string;
  validityDate: string;
  freqDate: string;
  demSeaPricing: string;
  detSeaPricing: string;
  stoSeaPricing: string;
  lclMinSeaPricing: string;
  lclSeaPricing: string;
  statusSeaPricing: string;
}
export interface ITruckingPricingForPartnerDTOs {
  truckingPricingID: string;
  pickupName: string;
  deliveryName: string;
  commodityName: string;
  currencyAbbreviations: string;
  vendor: string;
  note: string;
  effectDated: string;
  validityDate: string;
  freqDate: string;
  statusTruckingPricing: string;
}
export interface ICustomPricingForPartnerDTOs {
  customPricingID: string;
  typeDelaracrionName: string;
  transactionTypeName: string;
  vendor: string;
  commodityName: string;
  currencyAbbreviations: string;
  note: string;
  effectDated: string;
  validityDate: string;
  statusCustomPricing: string;
}

export interface ISeaPricingForPartnerDTOsTable
  extends Omit<ISeaPricingForPartnerDTOs, 'seaPricingID'> {
  key: string;
}
export interface ITruckingPricingForPartnerDTOsTable
  extends Omit<ITruckingPricingForPartnerDTOs, 'truckingPricingID'> {
  key: string;
}
export interface ICustomPricingForPartnerDTOsTable
  extends Omit<ICustomPricingForPartnerDTOs, 'customPricingID'> {
  key: string;
}
export type IPartnerCreate = Omit<
  IFormValues,
  | 'partnerID'
  | 'userBaseDTOs'
  | 'rolePartners'
  | 'address'
  | 'companyName'
  | 'seaPricingForPartnerDTOs'
  | 'truckingPricingForPartnerDTOs'
  | 'customPricingForPartnerDTOs'
> & {
  rolePartners: string[];
  companyNameEN: string;
  companyNameVN: string;
  addressEN: string;
  addressVN: string;
};

export type IPartnerEdit = Omit<
  IFormValues,
  | 'userBaseDTOs'
  | 'rolePartners'
  | 'address'
  | 'companyName'
  | 'seaPricingForPartnerDTOs'
  | 'truckingPricingForPartnerDTOs'
  | 'customPricingForPartnerDTOs'
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
  rolePartner: string[];
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
//----------------------------------------------------------------
//get all gender
export interface IRequestChartPricing {
  id: string;
}
export interface IDataChartPricing {
  totalPricing: string;
  date: 0;
}
