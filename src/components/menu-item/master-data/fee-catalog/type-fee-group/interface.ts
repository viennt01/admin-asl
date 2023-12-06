import { IPagination } from '../../../../commons/table/table-default';

export interface TypeFeeGroup {
  typeFeeGroupID: string;
  typeFeeGroupNo: string;
  typeFeeGroupName: string;
  statusTypeFeeGroup: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
}

export interface TypeFeeGroupTable
  extends Omit<TypeFeeGroup, 'typeFeeGroupID'> {
  key: string;
  searchAll: string;
}

export interface TypeFeeGroupsRequire extends IPagination {
  data: TypeFeeGroup[];
}
//
export interface QueryInputParamType {
  searchAll: string;
  typeFeeGroupNo: string;
  typeFeeGroupName: string;
}
export interface QuerySelectParamType {
  statusTypeFeeGroup: string[];
}

export interface RequestFeeGroupType
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

export interface TypeFeeGroupDetailDataBody {
  id: string;
}

export interface FormValues {
  typeFeeGroupID: string;
  typeFeeGroupNo: string;
  typeFeeGroupNameEN: string;
  typeFeeGroupNameVN: string;
  public: boolean;
  statusTypeFeeGroup: string;
}

export interface TypeFeeGroupDetailType extends FormValues {
  public: boolean;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type TypeFeeGroupCreate = Omit<FormValues, 'typeFeeGroupID'>;

export type TypeFeeGroupEdit = FormValues;

export type TypeFeeGroupDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  typeFeeGroupNo: string;
  typeFeeGroupName: string;
}
export interface QuerySelectDraft {
  status: string[];
}
export interface RequestTypeFeeGroupTableDraft
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

export interface UpdateStatusTypeFeeGroup {
  id: React.Key[];
  status: string;
}

export interface QueryInputRequest {
  typeFeeGroupNo: string;
  typeFeeGroupName: string;
}
export interface RequestTypeFeeGroupTableRequest extends QueryInputRequest {
  paginateRequest: IPagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
