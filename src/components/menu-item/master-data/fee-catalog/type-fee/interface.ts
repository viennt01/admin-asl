import { Key } from 'react';
import { Pagination } from '../../../../commons/table/table-default';

export interface TypeFee {
  typeFeeID: string;
  typeFeeNo: string;
  typeFeeName: string;
  statusTypeFee: string;
  public: boolean;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export interface TypeFeeTable extends Omit<TypeFee, 'typeFeeID'> {
  key: string;
  searchAll: string;
}

export interface TypeFeeRequire extends Pagination {
  data: TypeFee[];
}

export interface QueryInputParamType {
  searchAll: string;
  typeFeeNo: string;
  typeFeeName: string;
}

export interface QuerySelectParamType {
  statusTypeFee: string[];
}

export interface RequestTypeFeeType
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

export interface TypeFeeDetailDataBody {
  id: string;
}

export interface FormValues {
  typeFeeID: string;
  typeFeeNo: string;
  typeFeeNameEN: string;
  typeFeeNameVN: string;
  statusTypeFee: string;
}

export interface TypeFeeDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type TypeFeeCreate = Omit<FormValues, 'typeFeeID'>;

export type TypeFeeEdit = FormValues;

export type TypeFeeDelete = {
  ids: React.Key[];
};

export interface QueryInputDraft {
  typeFeeNo: string;
  typeFeeName: string;
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

export interface UpdateStatusTypeFee {
  id: Key[];
  status: string;
}

export interface QueryInputRequest {
  typeFeeNo: string;
  typeFeeName: string;
}

export interface RequestTypeFeeTableRequest extends QueryInputRequest {
  paginateRequest: Pagination;
}

export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
