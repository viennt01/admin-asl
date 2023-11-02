import { Dayjs } from 'dayjs';
import { IPagination } from '../../../commons/table/table-default';

export interface ISeaQuotation {
  seaQuotationID: string;
  podid: string; //
  podName: string; //
  polid: string; //
  polName: string; //
  commodityID: string; //
  commodityName: string; //
  currencyID: string; //
  currencyAbbreviations: string; //
  note: string; //
  effectDated: string;
  validityDate: string; //
  freqDate: string; //
  demSeaQuotation: string;
  detSeaQuotation: string;
  stoSeaQuotation: string;
  lclMinSeaQuotation: string;
  lclSeaQuotation: string;
  public: boolean; //
  statusSeaQuotation: string;
  confirmDated: string; //
  confirmByUser: string; //
  dateInserted: string; //
  insertedByUser: string; //
  dateUpdated: string; //
  updatedByUser: string; //
  seaQuotationDetailDTOs: { [key: string]: string };
}

export interface ISeaQuotationDetailDTOs {
  [key: string]: string;
}

export interface ISeaQuotationTable
  extends Omit<ISeaQuotation, 'seaQuotationID'> {
  key: string;
  searchAll: string;
}

export interface ISeaQuotationRequire extends IPagination {
  data: ISeaQuotation[];
}
//
export interface IQueryInputParamType {
  searchAll: string;
}
export interface IQuerySelectParamType {
  statusSeaQuotation: string[];
}

export interface RequestSeaQuotation
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

export interface ISeaQuotationDetailDataBody {
  id: string;
}

export interface IFormValues {
  seaQuotationID: string;
  podid: string;
  polid: string;
  commodityID: string;
  note: string;
  dateEffect: Dayjs;
  validityDate: Dayjs;
  freqDate: string;
  demSeaQuotation: string;
  detSeaQuotation: string;
  stoSeaQuotation: string;
  lclMinSeaQuotation: string;
  lclSeaQuotation: string;
  currencyID: string;
  public: boolean;
  statusSeaQuotation: string;
  seaQuotationDetailDTOs: SeaQuotationDetailDTOsFormValue[];
  seaQuotaionFeeGroupDTOs: ISeaQuotationFeeFormValue[];
}

export interface ISeaPricingDetailType
  extends Omit<IFormValues, 'seaQuotaionFeeGroupDTOs'> {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  seaQuotaionFeeGroupDTOs: ISeaQuotationFeeFormValue[];
}

export interface SeaQuotationDetailDTOsFormValue {
  seaQuotationDetailID: string;
  containerTypeID: string;
  containerTypeCode: string;
  containerTypeName: string;
  currencyID: string;
  currencyName: string;
  price: string;
}

export type ISeaQuotationDetailDTOsCreate = Omit<
  SeaQuotationDetailDTOsFormValue,
  | 'seaQuotationDetailID'
  | 'containerTypeCode'
  | 'containerTypeName'
  | 'currencyName'
  | 'price'
> & {
  priceQuotationDetail: string;
};

export type ISeaQuotationDetailDTOsUpdate = Omit<
  SeaQuotationDetailDTOsFormValue,
  'containerTypeCode' | 'containerTypeName' | 'currencyName'
> & {
  isDelete?: boolean;
};

export interface ISeaQuotationFeeFormValue {
  seaQuotationID: string;
  feeGroupID: string;
  feeGroupName: string;
  seaQuotationFeeDTOs: ISeaQuotationFeeDTOs[];
}

export interface ISeaQuotationFeeDTOs {
  seaQuotationFeeID: string;
  feeGroupDetailID: string;
  currencyID: string;
  feeName: string;
  unitID: string;
  priceFee: string;
  vatFee: string;
  unitInternationalCode: string;
  currencyName: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type SeaPricingFeeDTOsCreate = Omit<
  ISeaQuotationFeeFormValue,
  'seaQuotationFeeDTOs' | 'seaQuotationID'
> & {
  seaQuotationFeeDTOs: {
    feeGroupDetailID: string;
    priceFee: string;
    vatFee: string;
  }[];
};

export type SeaPricingFeeUpdate = Omit<
  ISeaQuotationFeeFormValue,
  'seaQuotationFeeDTOs'
> & {
  seaQuotationFeeDTOs: {
    seaQuotationFeeID: string;
    feeGroupDetailID: string;
    priceFee: string;
    vatFee: string;
  }[];
  isDelete: boolean;
};

export type ISeaQuotationCreate = Omit<
  IFormValues,
  | 'seaPricingID'
  | 'dateEffect'
  | 'validityDate'
  | 'seaQuotationDetailRegisterRequests'
  | 'seaPricingFeeDTOs'
> & {
  dateEffect: number;
  validityDate: number;
  seaQuotationDetailRegisterRequests: ISeaQuotationDetailDTOsCreate[];
  seaQuotationFeeGroupRegisterRequests: SeaPricingFeeDTOsCreate[];
};

export type ISeaQuotationEdit = Omit<
  IFormValues,
  | 'dateEffect'
  | 'validityDate'
  | 'seaQuotationDetailRegisterRequests'
  | 'seaPricingFeeDTOs'
> & {
  dateEffect: number;
  validityDate: number;
  seaQuotationDetailUpdateRequests: ISeaQuotationDetailDTOsUpdate[];
  seaQuotationFeeGroupUpdateRequests: SeaPricingFeeUpdate[];
};
export type SeaPricingDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  searchAll: string;
}
export interface QuerySelectDraft {
  statusSeaQuotation: string[];
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
  statusSeaQuotation: string[];
}
// export interface QuerySelectRequest {
//   status: string;
// }
export interface RequestTableRequest extends QueryInputRequest {
  paginateRequest: IPagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
//----------------------------------------------------------------
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
