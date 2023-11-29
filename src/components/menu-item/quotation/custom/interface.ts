import { Dayjs } from 'dayjs';
import { IPagination } from '../../../commons/table/table-default';

export interface ICustomQuotation {
  customQuotationID: string;
  typeDelaracrionID: string;
  typeDelaracrionName: string;
  typeDelaracrionDesctipton: string;
  typeDelaracrionCode: string;
  partnerID: string;
  commodityID: string;
  commodityName: string;
  currencyID: string;
  currencyAbbreviations: string;
  transactionTypeID: string;
  transactionTypeName: string;
  note: string;
  customRedPrice: string;
  customYellowPrice: string;
  customGreenPrice: string;
  effectDated: string;
  validityDate: string;
  public: boolean;
  statusCustomQuotation: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface SeaQuotationDetailDTOs {
  [key: string]: string;
}

export interface ICustomQuotationTable
  extends Omit<ICustomQuotation, 'customQuotationID'> {
  key: string;
  searchAll: string;
}

export interface ICustomQuotationRequire extends IPagination {
  data: ICustomQuotation[];
}
//
export interface IQueryInputParamType {
  searchAll: string;
}
export interface IQuerySelectParamType {
  statusCustomQuotation: string[];
}

export interface RequestSeaQuotation
  extends IQueryInputParamType,
    IQuerySelectParamType {
  paginateRequest: IPagination;
}

export type SelectSearch = {
  [key in keyof IQueryInputParamType]: {
    label: string;
    value: string;
  };
};

export interface ICustomQuotationDetailDataBody {
  id: string;
}

export interface IFormValues {
  customQuotationID: string;
  typeDelaracrionID: string;
  commodityID: string;
  currencyID: string;
  transactionTypeID: string;
  note: string;
  customRedPrice: string;
  customYellowPrice: string;
  customGreenPrice: string;
  effectDated: Dayjs;
  validityDate: Dayjs;
  public: boolean;
  forNewUser: boolean;
  statusCustomQuotation: string;
  customQuotationFeeGroupDTOs: ISeaQuotationFeeFormValue[];
  salesLeadsCustomQuotationDTOs: string[];
}

export interface ISeaQuotationFeeFormValue {
  feeGroupID: string;
  feeGroupName: string;
}

export interface ICustomQuotationDetailType
  extends Omit<IFormValues, 'salesLeadsCustomQuotationDTOs'> {
  vendor: string;
  typeDelaracrionName: string;
  typeDelaracrionCode: string;
  typeDelaracrionDesctipton: string;
  commodityName: string;
  transactionTypeName: string;
  currencyAbbreviations: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  salesLeadsCustomQuotationDTOs: ISalesLeadsSeaQuotationDTOs[];
}
export interface ISalesLeadsSeaQuotationDTOs {
  salesLeadsSeaQuotationID?: string;
  partnerID: string;
}
export type ICustomQuotationCreate = Omit<
  IFormValues,
  | 'customQuotationID'
  | 'effectDated'
  | 'validityDate'
  | 'customQuotationFeeGroupDTOs'
  | 'salesLeadsCustomQuotationDTOs'
> & {
  effectDated: number;
  validityDate: number;
  customQuotationFeeGroupRegisterRequests: { feeGroupID: string }[];
  salesLeadsQuotationRegisters: { partnerID: React.Key }[];
};

export type ICustomQuotationEdit = Omit<
  IFormValues,
  | 'effectDated'
  | 'validityDate'
  | 'customQuotationFeeGroupDTOs'
  | 'salesLeadsCustomQuotationDTOs'
> & {
  effectDated: number;
  validityDate: number;
};
export type SeaQuotationDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  searchAll: string;
}
export interface QuerySelectDraft {
  statusCustomQuotation: string[];
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
  statusCustomQuotation: string[];
}
export interface RequestTableRequest extends QueryInputRequest {
  paginateRequest: IPagination;
}

// get all location
export interface IDataLocation {
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
//----------------------------------------------------------------
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
