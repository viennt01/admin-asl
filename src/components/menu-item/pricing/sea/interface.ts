import { Dayjs } from 'dayjs';
import { IPagination } from '../../../commons/table/table-default';

export enum TYPE_LOCATION {
  'PORT' = 'Port',
  'INDUSTRIAL_ZONE' = 'Industrial Zone',
  'DEPOT' = 'Depot',
  'AIR_PORT' = 'Airport',
}

export interface SeaPricing {
  seaPricingID: string;
  podid: string;
  podName: string;
  polid: string;
  polName: string;
  commodityID: string;
  commodityName: string;
  currencyID: string;
  currencyAbbreviations: string;
  note: string;
  dateEffect: string;
  validityDate: string;
  freqDate: string;
  demSeaPricing: string;
  detSeaPricing: string;
  stoSeaPricing: string;
  lclMinSeaPricing: string;
  lclSeaPricing: string;
  public: boolean;
  statusSeaPricing: string;
  confirmDated: string;
  confirmByUser: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  seaPricingDetailDTOs: { [key: string]: string };
  vendor: string;
}

export interface SeaPricingDetailDTOs {
  [key: string]: string;
}

export interface SeaPricingTable extends Omit<SeaPricing, 'seaPricingID'> {
  key: string;
  searchAll: string;
}

export interface SeaPricingRequire extends IPagination {
  data: SeaPricing[];
}
//
export interface QueryInputParamType {
  searchAll: string;
}
export interface QuerySelectParamType {
  statusSeaPricing: string[];
}

export interface RequestSeaPricing
  extends QueryInputParamType,
    QuerySelectParamType {
  paginateRequest: IPagination;
}

export type SelectSearch = {
  [key in keyof QueryInputParamType]: {
    label: string;
    value: string;
  };
};

export interface SeaPricingDetailDataBody {
  id: string;
}

export interface FormValues {
  seaPricingID: string;
  podid: string;
  polid: string;
  commodityID: string;
  note: string;
  dateEffect: Dayjs;
  validityDate: Dayjs;
  vendorID: string;
  freqDate: string;
  demSeaPricing: string;
  detSeaPricing: string;
  stoSeaPricing: string;
  lclMinSeaPricing: string;
  currencyID: string;
  lclSeaPricing: string;
  public: boolean;
  statusSeaPricing: string;
  seaPricingDetailDTOs: SeaPricingDetailDTOsFormValue[];
  seaPricingFeeGroupDTOs: string[];
}

export interface SeaPricingDetailType
  extends Omit<FormValues, 'seaPricingFeeGroupDTOs'> {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  seaPricingFeeGroupDTOs: SeaPricingFeeFormValue[];
}

export interface SeaPricingDetailDTOsFormValue {
  seaPricingDetailID: string;
  containerTypeID: string;
  containerTypeCode: string;
  containerTypeName: string;
  currencyID: string;
  currencyName: string;
  price: string;
}

export type SeaPricingDetailDTOsCreate = Omit<
  SeaPricingDetailDTOsFormValue,
  | 'seaPricingDetailID'
  | 'containerTypeCode'
  | 'containerTypeName'
  | 'currencyName'
  | 'price'
> & {
  pricePricingDetail: string;
};

export type SeaPricingDetailDTOsUpdate = Omit<
  SeaPricingDetailDTOsFormValue,
  'containerTypeCode' | 'containerTypeName' | 'currencyName'
>;

export interface SeaPricingFeeFormValue {
  seaPricingFeeGroupID?: string;
  feeGroupID: string;
  public: boolean;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type SeaPricingFeeDTOsCreate = Omit<
  SeaPricingFeeFormValue,
  | 'seaPricingFeeGroupID'
  | 'insertedByUser'
  | 'dateInserted'
  | 'dateUpdated'
  | 'updatedByUser'
>;

export type SeaPricingFeeUpdate = Omit<
  SeaPricingFeeFormValue,
  'insertedByUser' | 'dateInserted' | 'dateUpdated' | 'updatedByUser'
> & {
  isDelete: boolean;
};

export type SeaPricingCreate = Omit<
  FormValues,
  | 'seaPricingID'
  | 'dateEffect'
  | 'vendorID'
  | 'validityDate'
  | 'seaPricingDetailDTOs'
  | 'seaPricingFeeGroupDTOs'
> & {
  dateEffect: number;
  validityDate: number;
  partnerId: string;
  seaPricingDetailRegisterRequests: SeaPricingDetailDTOsCreate[];
  seaPricingFeeGroupRegisterRequests: SeaPricingFeeDTOsCreate[];
};

export type SeaPricingEdit = Omit<
  FormValues,
  | 'dateEffect'
  | 'validityDate'
  | 'vendorID'
  | 'seaPricingDetailDTOs'
  | 'seaPricingFeeGroupDTOs'
> & {
  dateEffect: number;
  validityDate: number;
  partnerId: string;
  seaPricingDetailUpdateRequests: SeaPricingDetailDTOsUpdate[];
  seaPricingFeeGroupUpdateRequests: SeaPricingFeeUpdate[];
};
export type SeaPricingDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  searchAll: string;
}
export interface QuerySelectDraft {
  status: string;
}
export interface RequestTableDraft extends QueryInputDraft, QuerySelectDraft {
  paginateRequest: IPagination;
}

export type SelectDratSearch = {
  [key in keyof QueryInputDraft]: {
    label: string;
    value: string;
  };
};

//----------------------------------------------------------------

export interface UpdateStatus {
  id: React.Key[];
  status: string;
}

export interface QueryInputRequest {
  searchAll: string;
  status: string;
}
export interface RequestTableRequest extends QueryInputRequest {
  paginateRequest: IPagination;
}

// get all location
export interface IDataLocation {
  locationID: string;
  locationName: string;
}
export interface IRequireLocation {
  type: TYPE_LOCATION[];
}

// get all commodity
export interface RequireCommodity {
  commodityID: string;
  commodityName: string;
}

// get all currency
export interface RequireCurrency {
  currencyID: string;
  abbreviations: string;
}
// get all type container
export interface RequireTypeContainer {
  containerTypeID: string;
  name: string;
  code: string;
}
//----------------------------------------------------------------
// create quotation with pricing
export interface RequireCreateQuotationWithPricing {
  seaPricingID: React.Key[];
  effectDated: number;
  validityDate: number;
  profitRateOfPricing: string;
  profitRateOfContainerType: { [key: string]: string };
  profitRateOfUnitforFee: { [key: string]: string };
  profitRateOfFee: string;
  profitRateOfLCLMin: string;
  profitRateOfLCL: string;
  salesLeadsQuotationRegisters: { partnerID: string }[];
  seaQuotationGroupPartnerRegisterRequests: {
    groupPartnerID: string;
  }[];
  status: string;
}
export interface RequireCreateQuotationWithPricingFormValue
  extends Omit<
    RequireCreateQuotationWithPricing,
    'salesLeadsQuotationRegisters' | 'seaQuotationGroupPartnerRegisterRequests'
  > {
  salesLeadsQuotationRegisters: string[];
  seaQuotationGroupPartnerRegisterRequests: string[];
}
export interface RequirePartnerGroup {
  groupPartnerID: string;
  abbreviations: string;
}

//table partner
export interface RequirePartner {
  partnerID: string;
  name: string;
}
export interface RequestPartnerTable {
  ids: string[];
}
export interface Partner {
  userID: string;
  email: string;
  fullName: string;
  companyName: string;
  cityName: string;
  nationality: string;
}
export interface TablePartner extends Partner {
  key: React.Key;
}
