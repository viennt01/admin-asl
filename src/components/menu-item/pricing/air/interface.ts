import { Dayjs } from 'dayjs';
import { IPagination } from '../../../commons/table/table-default';

export enum TYPE_LOAD_CAPACITY {
  'TRUCKING' = 'Truck',
  'AIR' = 'Air',
  'TOTAL' = '',
}
export enum TYPE_TABS {
  GET_AIR_PRICING_BY_MASTER_DATA = 'GET_AIR_PRICING_BY_MASTER_DATA',
  GET_AIR_PRICING_BY_REQUEST_DATA = 'GET_AIR_PRICING_BY_REQUEST_DATA',
  GET_AIR_PRICING_BY_DRAFT_DATA = 'GET_AIR_PRICING_BY_DRAFT_DATA',
}

export interface AirPricing {
  airPricingID: string;
  aodid: string;
  aodName: string;
  aolid: string;
  aolName: string;
  commodityID: string;
  commodityName: string;
  currencyID: string;
  currencyAbbreviations: string;
  note: string;
  validityDate: string;
  effectDated: string;
  freqDate: string;
  public: boolean;
  statusAirPricing: string;
  confirmDated: string;
  confirmByUser: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  airPricingDetailDTOs: { [key: string]: string };
  vendor: string;
  transitTimeAirPricing: string;
  gw: boolean;
}

export interface AirPricingDetailDTOs {
  [key: string]: string;
}

export interface AirPricingTable extends Omit<AirPricing, 'airPricingID'> {
  key: string;
  searchAll: string;
}

export interface AirPricingRequire extends IPagination {
  data: AirPricing[];
}
//
export interface QueryInputParamType {
  searchAll: string;
}
export interface QuerySelectParamType {
  statusAirPricing: string[];
}

export interface RequestAirPricing
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

export interface AirPricingDetailDataBody {
  id: string;
}

export interface FormValues {
  airPricingID: string;
  aodid: string;
  aolid: string;
  commodityID: string;
  note: string;
  validityDate: Dayjs;
  effectDated: Dayjs;
  freqDate: string;
  currencyID: string;
  public: boolean;
  statusAirPricing: string;
  gw: boolean;
  vendorID: string;
  transitTimeAirPricing: string;
  airPricingDetailDTOs: AirPricingDetailDTOsFormValue[];
  airPricingFeeDTOs: string[];
}

export interface AirPricingDetailType
  extends Omit<FormValues, 'airPricingFeeDTOs'> {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  airPricingFeeDTOs: AirPricingFeeFormValue[];
}

export interface AirPricingDetailDTOsFormValue {
  airPricingDetailID: string;
  loadCapacityID: string;
  loadCapacityName: string;
  price: string;
}

export type AirPricingDetailDTOsCreate = Omit<
  AirPricingDetailDTOsFormValue,
  'airPricingDetailID' | 'price' | 'loadCapacityName'
> & {
  pricePricingDetail: string;
};

export type AirPricingDetailDTOsUpdate = Omit<
  AirPricingDetailDTOsFormValue,
  'loadCapacityID' | 'loadCapacityName'
>;

export interface AirPricingFeeFormValue {
  airPricingFeeGroupID: string;
  feeGroupID: string;
  public: boolean;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type AirPricingFeeDTOsCreate = Omit<
  AirPricingFeeFormValue,
  | 'airPricingFeeGroupID'
  | 'insertedByUser'
  | 'dateInserted'
  | 'dateUpdated'
  | 'updatedByUser'
> & {
  public: boolean;
};

export type AirPricingFeeUpdate = Omit<
  AirPricingFeeFormValue,
  'insertedByUser' | 'dateInserted' | 'dateUpdated' | 'updatedByUser'
> & {
  isDelete: boolean;
  public: boolean;
};

export type AirPricingCreate = Omit<
  FormValues,
  | 'airPricingID'
  | 'validityDate'
  | 'airPricingDetailDTOs'
  | 'airPricingFeeDTOs'
  | 'effectDated'
> & {
  validityDate: number;
  effectDated: number;
  airPricingDetailRegisterRequests: AirPricingDetailDTOsCreate[];
  airPricingFeeGroupRegisterRequests: AirPricingFeeDTOsCreate[];
};

export type AirPricingEdit = Omit<
  FormValues,
  'validityDate' | 'airPricingDetailDTOs' | 'airPricingFeeDTOs' | 'effectDated'
> & {
  validityDate: number;
  effectDated: number;
  airPricingDetailUpdateRequests: AirPricingDetailDTOsUpdate[];
  airPricingFeeGroupUpdateRequests: AirPricingFeeUpdate[];
};
export type AirPricingDelete = {
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
export interface RequireTypeLoadCapacity {
  loadCapacityID: string;
  name: string;
}
export interface IRequireTypeLoadCapacity {
  type: TYPE_LOAD_CAPACITY;
}
