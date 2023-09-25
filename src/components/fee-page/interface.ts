import { Pagination } from '../commons/table/table-deafault';

export interface Fee {
  feeID: string;
  feeNo: string;
  feeName: string;
  vatFee: string;
  public: boolean;
  statusFee: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export interface FeeTable extends Omit<Fee, 'feeID'> {
  key: string;
  searchAll: string;
}

export interface FeeRequire extends Pagination {
  data: Fee[];
}

export interface QueryInputParamType {
  searchAll: string;
  feeNo: string;
  feeName: string;
  vatFee: string;
}

export interface QuerySelectParamType {
  statusFee: string[];
}

export interface RequestFeeType
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

export interface FeeDetailDataBody {
  id: string;
}

export interface FormValues {
  feeID: string;
  feeNo: string;
  feeName: string;
  vatFee: string;
  statusFee: string;
}

export interface FeeDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type FeeCreate = Omit<FormValues, 'feeID'>;

export type FeeEdit = FormValues;

export type FeeDelete = {
  ids: React.Key[];
};

export interface QueryInputDraft {
  feeNo: string;
  feeName: string;
  vatFee: string;
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

export interface UpdateStatusFee {
  id: string;
  status: string;
}

export interface QueryInputRequest {
  feeNo: string;
  feeName: string;
  vatFee: string;
}

export interface RequestFeeTableRequest extends QueryInputRequest {
  paginateRequest: Pagination;
}

export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
