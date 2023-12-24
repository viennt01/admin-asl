import { Dayjs } from 'dayjs';
import { IPagination } from '../../../commons/table/table-default';

export enum TYPE_TABS {
  GET_TRUCK_PRICING_BY_MASTER_DATA = 'GET_TRUCK_PRICING_BY_MASTER_DATA',
  GET_TRUCK_PRICING_BY_REQUEST_DATA = 'GET_TRUCK_PRICING_BY_REQUEST_DATA',
  GET_TRUCK_PRICING_BY_DRAFT_DATA = 'GET_TRUCK_PRICING_BY_DRAFT_DATA',
}
export interface ITruckingPricing {
  truckingPricingID: string;
  pickupID: string;
  pickupName: string;
  deliveryID: string;
  deliveryName: string;
  commodityID: string;
  commodityName: string;
  currencyID: string;
  currencyAbbreviations: string;
  vendorName: string;
  transitTimeTruckingPricing: string;
  note: string;
  effectDated: string;
  validityDate: string;
  freqDate: string;
  public: boolean;
  statusTruckingPricing: string;
  truckingPricingDetailByContainerTypeDTOs: { [key: string]: string };
  truckingPricingDetailByLoadCapacityDTOs: { [key: string]: string };
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface ITypeDTOs {
  [key: string]: string;
}

export interface ITruckingPricingTable
  extends Omit<ITruckingPricing, 'truckingPricingID'> {
  key: string;
  searchAll: string;
}

export interface ITruckingRequire extends IPagination {
  data: ITruckingPricing[];
}
//
export interface IQueryInputParamType {
  searchAll: string;
}
export interface IQuerySelectParamType {
  statusTruckingPricing: string[];
}

export interface IRequestTruckingPricing
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

export interface SeaPricingDetailDataBody {
  id: string;
}

export interface IFormValues {
  truckingPricingID: string;
  pickupID: string;
  deliveryID: string;
  commodityID: string;
  currencyID: string;
  public: boolean;
  note: string;
  effectDated: Dayjs;
  validityDate: Dayjs;
  freqDate: string;
  statusTruckingPricing: string;
  transitTimetruckingPricing: string;
  truckingPricingDetailByContainerTypeDTOs: ITruckingPricingDetailDTOsFormValue[];
  truckingPricingDetailByLoadCapacityDTOs: ITruckingPricingDetailLoadCapacityDTOsFormValue[];
  truckingPricingFeeGroupDTOs: string[];
}

export interface ITruckingDetailType
  extends Omit<IFormValues, 'truckingPricingFeeGroupDTOs'> {
  pickupName: string;
  deliveryName: string;
  commodityName: string;
  currencyAbbreviations: string;
  vendor: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  truckingPricingFeeGroupDTOs: ITruckingPricingFeeFormValue[];
}

export interface ITruckingPricingDetailDTOsFormValue {
  seaPricingDetailID: string;
  containerTypeID: string;
  containerTypeCode: string;
  containerTypeName: string;
  currencyID: string;
  currencyName: string;
  price: string;
  vat: string;
}

export type ITruckingDetailDTOsCreate = Omit<
  ITruckingPricingDetailDTOsFormValue,
  | 'seaPricingDetailID'
  | 'containerTypeCode'
  | 'containerTypeName'
  | 'currencyName'
  | 'price'
> & {
  pricePricingDetail: string;
};

export type ITruckingPricingDetailDTOsUpdate = Omit<
  ITruckingPricingDetailDTOsFormValue,
  'containerTypeCode' | 'containerTypeName' | 'currencyName'
>;

export interface ITruckingPricingDetailLoadCapacityDTOsFormValue {
  truckingPricingDetailID: string;
  loadCapacityID: string;
  loadCapacityCode: string;
  loadCapacityName: string;
  currencyID: string;
  currencyName: string;
  price: string;
  vat: string;
}

export type ITruckingDetailLoadCapacityDTOsCreate = Omit<
  ITruckingPricingDetailLoadCapacityDTOsFormValue,
  | 'truckingPricingDetailID'
  | 'loadCapacityCode'
  | 'loadCapacityName'
  | 'currencyName'
  | 'price'
> & {
  pricePricingDetail: string;
};

export interface ITruckingPricingFeeFormValue {
  truckingPricingFeeGroupID?: string;
  feeGroupID: string;
  public: boolean;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type ITruckingPricingFeeDTOsCreate = Omit<
  ITruckingPricingFeeFormValue,
  | 'truckingPricingFeeGroupID'
  | 'insertedByUser'
  | 'dateInserted'
  | 'dateUpdated'
  | 'updatedByUser'
>;

export type ITruckingPricingFeeUpdate = Omit<
  ITruckingPricingFeeFormValue,
  'insertedByUser' | 'dateInserted' | 'dateUpdated' | 'updatedByUser'
> & {
  isDelete: boolean;
};

export type ITruckingPricingCreate = Omit<
  IFormValues,
  | 'truckingPricingID'
  | 'effectDated'
  | 'validityDate'
  | 'truckingPricingDetailByContainerTypeDTOs'
  | 'truckingPricingFeeGroupDTOs'
  | 'truckingPricingDetailByLoadCapacityDTOs'
> & {
  effectDated: number;
  validityDate: number;
  truckingPricingDetailRegisterRequests: ITruckingDetailDTOsCreate[];
  truckingPricingFeeGroupRegisterRequests: ITruckingPricingFeeDTOsCreate[];
  truckingLoadCapacityDetailRegisterRequests: ITruckingDetailLoadCapacityDTOsCreate[];
};

export type SeaPricingEdit = Omit<
  IFormValues,
  | 'effectDated'
  | 'validityDate'
  | 'truckingPricingDetailByContainerTypeDTOs'
  | 'truckingPricingFeeGroupDTOs'
  | 'truckingPricingDetailByLoadCapacityDTOs'
> & {
  effectDated: number;
  validityDate: number;
  seaPricingDetailUpdateRequests: ITruckingPricingDetailDTOsUpdate[];
  seaPricingFeeGroupUpdateRequests: ITruckingPricingFeeUpdate[];
};
export type SeaPricingDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface IUpdateStatus {
  id: React.Key[];
  status: string;
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
// get all load capacity
export interface RequireLoadCapacity {
  loadCapacityID: string;
  name: string;
}
//----------------------------------------------------------------
// create quotation with pricing
export interface RequireCreateQuotationWithPricing {
  truckingPricingID: React.Key[];
  effectDated: number;
  validityDate: number;
  profitRateOfPricing: string;
  profitRateOfContainerType: { [key: string]: string };
  profitRateOfLoadCapacity: { [key: string]: string };
  profitRateOfUnitforFee: { [key: string]: string };
  profitRateOfFee: string;
  profitRateOfAllLoadCapacity: string;
  forNewUser: boolean;
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
  partnerID: string;
  email: string;
  fullName: string;
}
export interface TablePartner extends Omit<Partner, 'partnerID'> {
  key: React.Key;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
