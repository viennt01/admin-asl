import { Dayjs } from 'dayjs';
import { IPagination } from '../../../commons/table/table-default';

export interface ISeaQuotation {
  seaQuotationID: string;
  seaQuotationNo: string;
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
  vendor: string;
  freqDate: string;
  demSeaQuotation: string;
  detSeaQuotation: string;
  stoSeaQuotation: string;
  lclMinSeaQuotation: string;
  lclSeaQuotation: string;
  currencyID: string;
  public: boolean;
  statusSeaQuotation: string;
  seaQuotationDetailDTOs: ISeaQuotationDetailDTOsFormValue[];
  seaQuotaionFeeGroupDTOs: ISeaQuotationFeeFormValue[];
  salesLeadsSeaQuotationDTOs: string[];
  seaQuotaionGroupPartnerDTOs: string[];
}

export interface ISeaPricingDetailType
  extends Omit<
    IFormValues,
    | 'seaQuotaionFeeGroupDTOs'
    | 'salesLeadsSeaQuotationDTOs'
    | 'seaQuotaionGroupPartnerDTOs'
  > {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  seaQuotaionFeeGroupDTOs: ISeaQuotationFeeFormValue[];
  salesLeadsSeaQuotationDTOs: ISalesLeadsSeaQuotationDTOs[];
  seaQuotaionGroupPartnerDTOs: ISeaQuotaionGroupPartnerDTOs[];
}

export interface ISalesLeadsSeaQuotationDTOs {
  salesLeadsSeaQuotationID?: string;
  partnerID: string;
}
export interface IEditSalesLeadsSeaQuotationDTOs
  extends ISalesLeadsSeaQuotationDTOs {
  isDelete: boolean;
}
export interface ISeaQuotaionGroupPartnerDTOs {
  seaQuotationGroupPartnerID: string;
  groupPartnerID: string;
}

export interface ISeaQuotationDetailDTOsFormValue {
  seaQuotationDetailID: string;
  containerTypeID: string;
  containerTypeCode: string;
  containerTypeName: string;
  currencyID: string;
  currencyName: string;
  price: string;
}

export type ISeaQuotationDetailDTOsCreate = Omit<
  ISeaQuotationDetailDTOsFormValue,
  | 'seaQuotationDetailID'
  | 'containerTypeCode'
  | 'containerTypeName'
  | 'currencyID'
  | 'currencyName'
  | 'price'
> & {
  priceQuotationDetail: string;
};

export type ISeaQuotationDetailDTOsUpdate = Omit<
  ISeaQuotationDetailDTOsFormValue,
  'containerTypeCode' | 'containerTypeName' | 'currencyName' | 'currencyID'
> & {
  isDelete?: boolean;
};

export interface ISeaQuotationFeeFormValue {
  feeGroupID: string;
  feeGroupName: string;
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

export type ISeaQuotationCreate = Omit<
  IFormValues,
  | 'seaQuotationID'
  | 'seaPricingID'
  | 'dateEffect'
  | 'validityDate'
  | 'vendor'
  | 'seaQuotationDetailDTOs'
  | 'seaQuotaionFeeGroupDTOs'
  | 'salesLeadsSeaQuotationDTOs'
  | 'seaQuotaionGroupPartnerDTOs'
> & {
  dateEffect: number;
  validityDate: number;
  partnerID: string;
  seaQuotationDetailRegisterRequests: ISeaQuotationDetailDTOsCreate[];
  seaQuotationFeeGroupRegisterRequests: { feeGroupID: string }[];
  salesLeadsQuotationRegisters: { partnerID: string }[];
  seaQuotationGroupPartnerRegisterRequests: { groupPartnerID: string }[];
};

export type ISeaQuotationEdit = Omit<
  IFormValues,
  | 'dateEffect'
  | 'validityDate'
  | 'vendor'
  | 'seaQuotationDetailDTOs'
  | 'seaQuotaionFeeGroupDTOs'
  | 'salesLeadsSeaQuotationDTOs'
  | 'seaQuotaionGroupPartnerDTOs'
> & {
  dateEffect: number;
  validityDate: number;
  partnerID: string;
  seaQuotationDetailUpdateRequests: ISeaQuotationDetailDTOsUpdate[];
  salesLeadsSeaQuotationUpdateRequests: IEditSalesLeadsSeaQuotationDTOs[];
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
  code: string;
}
// get all fee group
export interface RequireFeeGroup {
  feeGroupID: string;
  feeGroupName: string;
}
// get all partner role
export interface RequirePartnerRole {
  partnerRoleID: string;
  abbreviations: string;
  name: string;
}
