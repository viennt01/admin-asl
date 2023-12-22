import { Dayjs } from 'dayjs';
import { IPagination } from '../../../commons/table/table-default';
export enum TYPE_FEE_GROUP {
  'TRUCKING_QUOTATION' = 'Trucking Quotation',
  'SEA_QUOTATION' = 'Sea Quotation',
  'AIR_QUOTATION' = 'Air Quotation',
  'CUSTOM_QUOTATION' = 'Custom Quotation',
  'TRUCKING_PRICING' = 'Trucking Pricing',
  'SEA_PRICING' = 'Sea Pricing',
  'AIR_PRICING' = 'Air Pricing',
  'CUSTOM_PRICING' = 'Custom Pricing',
  'TOTAL' = '',
}

export enum TYPE_QUOTATION_PRICING {
  'QUOTATION' = 'Quotation',
  'PRICING' = 'PRICING',
}

export enum TYPE_FEE {
  'SEA_FREIGHT' = 'SEA FREIGHT',
  'SEA_LOCAL_CHARGES' = 'Sea Local Charges',
  'AIR_FREIGHT' = 'AIR FREIGHT',
  'TRUCKING' = 'Trucking',
  'CUSTOMS' = 'Customs',
  'AIR_LOCAL_CHARGES' = 'Air Local Charges',
}

export enum TYPE_TABS {
  GET_OTHER_CHARGES_PRICING_BY_MASTER_DATA = 'GET_OTHER_CHARGES_PRICING_BY_MASTER_DATA',
  GET_OTHER_CHARGES_PRICING_BY_REQUEST_DATA = 'GET_OTHER_CHARGES_PRICING_BY_REQUEST_DATA',
  GET_OTHER_CHARGES_PRICING_BY_DRAFT_DATA = 'GET_OTHER_CHARGES_PRICING_BY_DRAFT_DATA',
}

export interface FeeGroup {
  feeGroupID: string;
  typeFeeGroupID: string;
  typeFeeGroupName: string;
  feeGroupNo: string;
  feeGroupName: string;
  statusFeeGroup: string;
  dateStart: string;
  dateExpiration: string;
  public: boolean;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface FeeGroupTable extends Omit<FeeGroup, 'feeGroupID'> {
  key: string;
  searchAll: string;
}

export interface FeeGroupsRequire extends IPagination {
  data: FeeGroup[];
}
//
export interface QueryInputParamType {
  searchAll: string;
}
export interface QuerySelectParamType {
  status: string[];
  typeFeeGroupName: string[];
}

export interface RequestFeeGroup
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

export interface FeeGroupDetailDataBody {
  id: string;
}

export interface FormValues {
  feeGroupID: string;
  typeFeeGroupID: string;
  typeFeeGroupName: string;
  feeGroupNo: string;
  feeGroupNameEN: string;
  feeGroupNameVN: string;
  statusFeeGroup: string;
  dateStart: Dayjs;
  dateExpiration: Dayjs;
  public: boolean;
}

export interface FeeGroupDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export type FeeGroupCreate = Omit<
  FormValues,
  'feeGroupID' | 'typeFeeGroupName' | 'dateStart' | 'dateExpiration'
> & {
  listFee: Fee[];
};

export type FeeGroupEdit = Omit<
  FormValues,
  'typeFeeGroupName' | 'dateStart' | 'dateExpiration'
>;

export type FeeGroupDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QueryInputDraft {
  // feeGroupNo: string;
  // feeGroupName: string;
}
export interface QuerySelectDraft {
  status: string[];
  typeFeeGroupName: string[];
}
export interface RequestFeeGroupTableDraft
  extends QueryInputDraft,
    QuerySelectDraft {
  paginateRequest: IPagination;
}

export type SelectDratSearch = {
  [key in keyof QueryInputDraft]: {
    label: string;
    value: string;
  };
};

//----------------------------------------------------------------

export interface UpdateStatusFeeGroup {
  id: React.Key[];
  status: string;
}

export interface QueryInputRequest {
  searchAll: string;
  typeFeeGroupName: string[];
}
export interface RequestFeeGroupTableRequest extends QueryInputRequest {
  paginateRequest: IPagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
//----------------------------------------------------------------
export interface ITypeFeeGroupData {
  typeFeeGroupID: string;
  typeFeeGroupName: string;
}
export interface ITypeFeeGroup {
  type: TYPE_QUOTATION_PRICING;
}
export interface ITypeFeeRequest {
  typeFeeName: string[];
}
export interface FeeData {
  feeID: string;
  feeName: string;
  currencyID: string;
  currencyName: string;
  feeNo: string;
  priceFeeGroup: string;
  unitID: string;
  unitInternationalCode: string;
  vatFeeGroup: string;
}

export type FeeDataOption = Omit<FeeData, 'feeID'> & {
  value: string;
  label: string;
};
//----------------------------------------------------------------
//table fee
export interface Fee {
  feeID: string;
  priceFeeGroup: string;
  vatFeeGroup: string;
  unitID: string;
  currencyID: string;
}
export interface FeeTable extends Fee {
  key: React.Key;
  currencyName: string;
  unitInternationalCode: string;
  feeNo: string;
  feeName: string;
  typeFeeName?: string;
}
export interface RequestFee {
  id: string[];
}
//----------------------------------------------------------------
//update fee of fee group
export interface RequestUpdateFeeOfFeeGroup {
  feeGroupID: string;
  feeList: Fee[];
}
//delete fee of fee group
export interface RequestDeleteFeeOfFeeGroup {
  feeGroupID: string;
  ids: React.Key[];
}
export interface IDataFeeGroup {
  feeGroupID: string;
  feeGroupName: string;
}
export interface IRequestFeeGroup {
  type: TYPE_FEE_GROUP;
}
