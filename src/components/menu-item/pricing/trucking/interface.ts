import { Dayjs } from 'dayjs';
import { Pagination } from '../../../commons/table/table-default';

export interface TruckingPricing {
  truckingPricingID: string;
  pickupID: string;
  pickupName: string;
  deliveryID: string;
  deliveryName: string;
  emtyPickupID: string;
  emtyPickupName: string;
  commodityID: string;
  commodityName: string;
  currencyID: string;
  currencyAbbreviations: string;
  note: string;
  vendor: string;
  effectDated: string;
  validityDate: string;
  freqDate: string;
  lclMinTruckingPricing: string;
  lclTruckingPricing: string;
  public: boolean;
  statusTruckingPricing: string;
  confirmDated: string;
  confirmByUser: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  truckingPricingDetailDTOs: { [key: string]: string };
  feeGroupID: string;
}

export interface TruckingPricingDetailDTOs {
  [key: string]: string;
}

export interface TruckingPricingTable
  extends Omit<TruckingPricing, 'truckingPricingID'> {
  key: string;
  searchAll: string;
}

export interface TruckingPricingRequire extends Pagination {
  data: TruckingPricing[];
}
//
export interface QueryInputParamType {
  searchAll: string;
}
export interface QuerySelectParamType {
  statusTruckingPricing: string[];
}

export interface RequestTruckingPricing
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

export interface TruckingPricingDetailDataBody {
  id: string;
}

export interface FormValues {
  truckingPricingID: string;
  pickupID: string;
  pickupName: string;
  deliveryID: string;
  deliveryName: string;
  emtyPickupID: string;
  emtyPickupName: string;
  commodityID: string;
  commodityName: string;
  note: string;
  effectDated: Dayjs;
  validityDate: Dayjs;
  freqDate: string;
  currencyID: string;
  public: boolean;
  currencyAbbreviations: string;
  feeGroupID: string;
  vendor: string;
  lclMinTruckingPricing: string;
  lclTruckingPricing: string;
  statusTruckingPricing: string;
  statusSeaPricing: string;
  truckingPricingDetailDTOs: SeaPricingDetailDTOsFormValue[];
  truckingPricingFeeGroupDTOs: string[];
}

export interface SeaPricingDetailType
  extends Omit<FormValues, 'truckingPricingFeeGroupDTOs'> {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  truckingPricingFeeGroupDTOs: SeaPricingFeeFormValue[];
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
  seaPricingFeeGroupID: string;
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
  | 'validityDate'
  | 'seaPricingDetailDTOs'
  | 'seaPricingFeeDTOs'
> & {
  dateEffect: number;
  validityDate: number;
  seaPricingDetailRegisterRequests: SeaPricingDetailDTOsCreate[];
  seaPricingFeeGroupRegisterRequests: SeaPricingFeeDTOsCreate[];
};

export type SeaPricingEdit = Omit<
  FormValues,
  'dateEffect' | 'validityDate' | 'seaPricingDetailDTOs' | 'seaPricingFeeDTOs'
> & {
  dateEffect: number;
  validityDate: number;
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
  paginateRequest: Pagination;
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
  paginateRequest: Pagination;
}

// get all location
export interface RequireLocation {
  locationID: string;
  locationName: string;
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
}
// get all fee group
export interface RequireFeeGroup {
  feeGroupID: string;
  feeGroupName: string;
}
