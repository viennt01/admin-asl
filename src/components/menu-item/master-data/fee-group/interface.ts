import { Dayjs } from 'dayjs';
import { IPagination } from '../../../commons/table/table-default';

export interface FeeGroup {
  feeGroupID: string;
  typeFeeGroupID: string;
  typeFeeGroupName: string;
  feeGroupNo: string;
  feeGroupName: string;
  statusFeeGroup: string;
  dateStart: string;
  dateExpiration: string;
  public: true;
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
  feeGroupNo: string;
  feeGroupName: string;
}
export interface QuerySelectParamType {
  statusFeeGroup: string[];
  typeFeeGroupID: string;
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
}

export interface FeeGroupDetailType extends FormValues {
  public: boolean;
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
export interface QueryInputDraft {
  feeGroupNo: string;
  feeGroupName: string;
}
export interface QuerySelectDraft {
  status: string[];
  typeFeeGroupID: string;
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
  feeGroupNo: string;
  feeGroupName: string;
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
export interface TypeFeeGroupData {
  typeFeeGroupID: string;
  typeFeeGroupName: string;
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
