import { Dayjs } from 'dayjs';
import { IPagination } from '../../../commons/table/table-default';

export enum TYPE_LOAD_CAPACITY {
  'TRUCKING' = 'Truck',
  'AIR' = 'Air',
  'TOTAL' = '',
}
export enum TYPE_TABS {
  GET_AIR_QUOTATION_BY_MASTER_DATA = 'GET_AIR_QUOTATION_BY_MASTER_DATA',
  GET_AIR_QUOTATION_BY_REQUEST_DATA = 'GET_AIR_QUOTATION_BY_REQUEST_DATA',
  GET_AIR_QUOTATION_BY_DRAFT_DATA = 'GET_AIR_QUOTATION_BY_DRAFT_DATA',
}

export interface IAirQuotation {
  airQuotationID: string;
  airQuotationNo: string;
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
  statusAirQuotation: string;
  loadCapacityMinAirQuotation: string;
  priceLoadCapacityMinAirQuotation: string;
  confirmDated: string;
  confirmByUser: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  airQuotationDetailDTOs: { [key: string]: string };
  vendorName: string;
  transitTimeAirQuotation: string;
  fscAirQuotation: string;
  sscAirQuotation: string;
  gw: boolean;
}

export interface IAirQuotationDetailDTOs {
  [key: string]: string;
}

export interface IAirQuotationTable
  extends Omit<IAirQuotation, 'airQuotationID'> {
  key: string;
  searchAll: string;
}

export interface IAirQuotationRequire extends IPagination {
  data: IAirQuotation[];
}
//
export interface IQueryInputParamType {
  searchAll: string;
}
export interface IQuerySelectParamType {
  statusAirQuotation: string[];
}

export interface IRequestAirQuotation
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

export interface IAirQuotationDetailDataBody {
  id: string;
}

export interface IFormValues {
  airQuotationID: string;
  aodid: string;
  aolid: string;
  commodityID: string;
  note: string;
  validityDate: Dayjs;
  effectDated: Dayjs;
  freqDate: string;
  currencyID: string;
  public: boolean;
  statusAirQuotation: string;
  fscAirQuotation: string;
  sscAirQuotation: string;
  loadCapacityMinAirQuotation: string;
  priceLoadCapacityMinAirQuotation: string;
  gw: boolean;
  forNewUser: boolean;
  vendorID: string;
  transitTimeAirQuotation: string;
  airQuotationDetailDTOs: IAirQuotationDetailDTOsFormValue[];
  airQuotaionFeeGroupDTOs: string[];
  salesLeadsAirQuotationDTOs: string[];
}

export interface IAirQuotationDetailType
  extends Omit<
    IFormValues,
    'airQuotaionFeeGroupDTOs' | 'salesLeadsAirQuotationDTOs'
  > {
  airPricingID: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  airQuotaionFeeGroupDTOs: IAirQuotationFeeFormValue[];
  salesLeadsAirQuotationDTOs: ISalesLeadsAirQuotationDTOs[];
}

export interface ISalesLeadsAirQuotationDTOs {
  salesLeadsAirQuotationID?: string;
  partnerID: string;
}

export interface IEditSalesLeadsAirQuotationDTOs
  extends ISalesLeadsAirQuotationDTOs {
  isDelete: boolean;
}
export interface IAirQuotationDetailDTOsFormValue {
  airPricingDetailID: string;
  loadCapacityID: string;
  loadCapacityName: string;
  price: string;
}

export type IAirQuotationDetailDTOsCreate = Omit<
  IAirQuotationDetailDTOsFormValue,
  'airPricingDetailID' | 'price' | 'loadCapacityName'
> & {
  pricePricingDetail: string;
};

export type IAirQuotationDetailDTOsUpdate = Omit<
  IAirQuotationDetailDTOsFormValue,
  'loadCapacityID' | 'loadCapacityName'
>;

export interface IAirQuotationFeeFormValue {
  airPricingFeeGroupID: string;
  feeGroupID: string;
  public: boolean;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type IAirQuotationFeeDTOsCreate = Omit<
  IAirQuotationFeeFormValue,
  | 'airPricingFeeGroupID'
  | 'insertedByUser'
  | 'dateInserted'
  | 'dateUpdated'
  | 'updatedByUser'
> & {
  public: boolean;
};

export type IAirQuotationFeeUpdate = Omit<
  IAirQuotationFeeFormValue,
  'insertedByUser' | 'dateInserted' | 'dateUpdated' | 'updatedByUser'
> & {
  isDelete: boolean;
  public: boolean;
};

export type IAirQuotationCreate = Omit<
  IFormValues,
  | 'airQuotationID'
  | 'validityDate'
  | 'airQuotationDetailDTOs'
  | 'airQuotaionFeeGroupDTOs'
  | 'effectDated'
  | 'salesLeadsAirQuotationDTOs'
> & {
  validityDate: number;
  effectDated: number;
  airQuotationDetailRegisterRequests: IAirQuotationDetailDTOsCreate[];
  airQuotationFeeGroupRegisterRequests: IAirQuotationFeeDTOsCreate[];
  salesLeadsQuotationRegisters: { partnerID: string }[];
};

export type IAirQuotationEdit = Omit<
  IFormValues,
  | 'validityDate'
  | 'airQuotationDetailDTOs'
  | 'airQuotaionFeeGroupDTOs'
  | 'effectDated'
  | 'salesLeadsAirQuotationDTOs'
> & {
  validityDate: number;
  effectDated: number;
  airQuotationDetailRegisterRequests: IAirQuotationDetailDTOsUpdate[];
  airQuotationFeeGroupRegisterRequests: IAirQuotationFeeUpdate[];
};
export type IAirQuotationDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------

export interface IUpdateStatus {
  id: React.Key[];
  status: string;
}

// get all commodity
export interface IRequireCommodity {
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
