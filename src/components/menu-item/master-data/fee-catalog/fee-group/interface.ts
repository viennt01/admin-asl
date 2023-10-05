import { Pagination } from '../../../../commons/table/table-default';

export interface FeeGroup {
  feeGroupID: string;
  typeFeeGroupID: string;
  typeFeeGroupName: string;
  feeGroupNo: string;
  feeGroupName: string;
  statusFeeGroup: string;
  public: true;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
}

export interface FeeGroupTable extends Omit<FeeGroup, 'feeGroupID'> {
  key: string;
  searchAll: string;
}

export interface FeeGroupsRequire extends Pagination {
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
  paginateRequest: Pagination;
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
  feeGroupNo: string;
  feeGroupNameEN: string;
  feeGroupNameVN: string;
  statusFeeGroup: string;
}

export interface FeeGroupDetailType extends FormValues {
  public: boolean;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type FeeGroupCreate = Omit<FormValues, 'feeGroupID'>;

export type FeeGroupEdit = FormValues;

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
  paginateRequest: Pagination;
}

export type SelectDratSearch = {
  [key in keyof QueryInputDraft]: {
    label: string;
    value: string;
  };
};

//----------------------------------------------------------------

export interface UpdateStatusFeeGroup {
  id: string;
  status: string;
}

export interface QueryInputRequest {
  feeGroupNo: string;
  feeGroupName: string;
}
export interface RequestFeeGroupTableRequest extends QueryInputRequest {
  paginateRequest: Pagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
