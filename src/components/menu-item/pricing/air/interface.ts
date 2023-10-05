import { Dayjs } from 'dayjs';
import { Pagination } from '../../../commons/table/table-default';

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
  dateEffect: string;
  validityDate: string;
  freqDate: string;
  demAirPricing: string;
  detAirPricing: string;
  stoAirPricing: string;
  lclMinAirPricing: string;
  lclAirPricing: string;
  public: boolean;
  statusAirPricing: string;
  confirmDated: string;
  confirmByUser: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
  airPricingDetailDTOs: { [key: string]: string };
  airPricingFeeDTOs: AirPricingFeeDTOs[];
}

export interface AirPricingDetailDTOs {
  [key: string]: string;
}
export interface AirPricingFeeDTOs {
  airPricingFeeID: string;
  feeID: string;
  feeName: string;
  feeNo: string;
  currencyID: string;
  currencyName: string;
  unitID: string;
  internationalCode: string;
  price: string;
}

export interface AirPricingTable extends Omit<AirPricing, 'airPricingID'> {
  key: string;
  searchAll: string;
}

export interface AirPricingRequire extends Pagination {
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
  paginateRequest: Pagination;
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
  dateEffect: Dayjs;
  validityDate: Dayjs;
  freqDate: string;
  demAirPricing: string;
  detAirPricing: string;
  stoAirPricing: string;
  lclMinAirPricing: string;
  currencyID: string;
  lclAirPricing: string;
  public: boolean;
  statusAirPricing: string;
  airPricingDetailDTOs: AirPricingDetailDTOsFormValue[];
  airPricingFeeDTOs: AirPricingFeeFormValue[];
}

export interface AirPricingDetailDTOsFormValue {
  airPricingDetailID: string;
  containerTypeID: string;
  containerTypeCode: string;
  containerTypeName: string;
  currencyID: string;
  currencyName: string;
  price: string;
}

export type AirPricingDetailDTOsCreate = Omit<
  AirPricingDetailDTOsFormValue,
  | 'airPricingDetailID'
  | 'containerTypeCode'
  | 'containerTypeName'
  | 'currencyName'
  | 'price'
> & {
  priceAirPricingDetail: string;
};

export type AirPricingDetailDTOsUpdate = Omit<
  AirPricingDetailDTOsFormValue,
  'containerTypeCode' | 'containerTypeName' | 'currencyName'
>;

export interface AirPricingFeeFormValue {
  airPricingFeeID: string;
  feeID: string;
  feeName: string;
  feeNo: string;
  currencyID: string;
  currencyName: string;
  unitID: string;
  internationalCode: string;
  price: string;
}

export type AirPricingFeeDTOsCreate = Omit<
  AirPricingFeeFormValue,
  | 'airPricingFeeID'
  | 'feeName'
  | 'feeNo'
  | 'currencyName'
  | 'internationalCode'
  | 'price'
> & {
  priceAirPricingFee: string;
};

export type AirPricingFeeUpdate = Omit<
  AirPricingFeeFormValue,
  'feeName' | 'feeNo' | 'currencyName' | 'internationalCode'
>;

export interface AirPricingDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type AirPricingCreate = Omit<
  FormValues,
  | 'airPricingID'
  | 'dateEffect'
  | 'validityDate'
  | 'airPricingDetailDTOs'
  | 'airPricingFeeDTOs'
> & {
  dateEffect: number;
  validityDate: number;
  airPricingDetailRegisterRequests: AirPricingDetailDTOsCreate[];
  airPricingFeeRegisterRequests: AirPricingFeeFormValue[];
};

export type AirPricingEdit = Omit<
  FormValues,
  'dateEffect' | 'validityDate' | 'airPricingDetailDTOs' | 'airPricingFeeDTOs'
> & {
  dateEffect: number;
  validityDate: number;
  airPricingDetailUpdateRequests: AirPricingDetailDTOsUpdate[];
  airPricingFeeUpdateRequests: AirPricingFeeUpdate[];
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
  id: string;
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
