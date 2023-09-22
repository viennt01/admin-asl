import { Dayjs } from 'dayjs';
import { Pagination } from '../commons/table/table-deafault';

export interface SeaPricing {
  seaPricingID: string;
  podid: string;
  podName: string;
  polid: string;
  polName: string;
  commodityID: string;
  commodityName: string;
  note: string;
  effectDate: string;
  validity: string;
  freg: string;
  dem: string;
  det: string;
  sto: string;
  lclMin: string;
  lcl: string;
  public: boolean;
  statusSeaPricing: string;
  confirmDated: string;
  confirmByUser: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
  seaPricingDetailDTOs: { [key: string]: string };
  seaPricingFeeDTOs: SeaPricingFeeDTOs[];
}

export interface SeaPricingDetailDTOs {
  [key: string]: string;
}
export interface SeaPricingFeeDTOs {
  seaPricingFeeID: string;
  feeID: string;
  feeName: string;
  feeNo: string;
  currencyID: string;
  currencyName: string;
  unitID: string;
  internationalCode: string;
  price: string;
}

export interface SeaPricingTable extends Omit<SeaPricing, 'seaPricingID'> {
  key: string;
  searchAll: string;
}

export interface SeaPricingRequire extends Pagination {
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
  paginateRequest: Pagination;
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
  fregDate: Dayjs;
  demSeaPricing: string;
  detSeaPricing: string;
  stoSeaPricing: string;
  lclMinSeaPricing: string;
  lclMinCurrency: string;
  lclSeaPricing: string;
  lclCurrency: string;
  public: boolean;
  statusSeaPricing: string;
  seaPricingDetailDTOs: SeaPricingDetailDTOsFormValue[];
  seaPricingFeeDTOs: SeaPricingFeeDTOsFormValue[];
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
  priceSeaPricingDetail: string;
};

export type SeaPricingDetailDTOsUpdate = Omit<
  SeaPricingDetailDTOsFormValue,
  'containerTypeCode' | 'containerTypeName' | 'currencyName'
>;

export interface SeaPricingFeeDTOsFormValue {
  seaPricingFeeID: string;
  feeID: string;
  feeName: string;
  feeNo: string;
  currencyID: string;
  currencyName: string;
  unitID: string;
  internationalCode: string;
  price: string;
}

export type SeaPricingFeeDTOsCreate = Omit<
  SeaPricingFeeDTOsFormValue,
  | 'seaPricingFeeID'
  | 'feeName'
  | 'feeNo'
  | 'currencyName'
  | 'internationalCode'
  | 'price'
> & {
  priceSeaPricingFee: string;
};

export type SeaPricingFeeDTOsUpdate = Omit<
  SeaPricingFeeDTOsFormValue,
  'feeName' | 'feeNo' | 'currencyName' | 'internationalCode'
>;

export interface SeaPricingDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type SeaPricingCreate = Omit<
  FormValues,
  'seaPricingID' | 'dateEffect' | 'fregDate' | 'validityDate'
> & {
  dateEffect: string;
  validityDate: string;
  fregDate: string;
};

export type SeaPricingEdit = Omit<
  FormValues,
  'dateEffect' | 'fregDate' | 'validityDate'
> & {
  dateEffect: string;
  validityDate: string;
  fregDate: string;
};
export type SeaPricingDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  internationalCode: string;
  description: string;
}
export interface QuerySelectDraft {
  status: string[];
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
  currencyName: string;
}
