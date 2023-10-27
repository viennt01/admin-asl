import { Key } from 'react';
import { IPagination } from '../../../../commons/table/table-default';

export interface Fee {
  feeID: string;
  feeNo: string;
  feeName: string;
  vatFee: string;
  public: boolean;
  statusFee: string;
  typeFeeID: string;
  typeFeeName: string;
  currencyID: string;
  currencyName: string;
  unitID: string;
  unitInternationalCode: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface FeeTable extends Omit<Fee, 'feeID'> {
  key: string;
  searchAll: string;
}

export interface FeeRequire extends IPagination {
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
  typeFeeID: string;
  currencyID: string;
  unitID: string;
}

export interface RequestFeeType
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

export interface FeeDetailDataBody {
  id: string;
}

export interface FormValues {
  feeID: string;
  feeNo: string;
  feeNameEN: string;
  feeNameVN: string;
  vatFee: string;
  statusFee: string;
  typeFeeID: string;
  currencyID: string;
  unitID: string;
}

export interface FeeDetailType extends FormValues {
  typeFeeName: string;
  currencyName: string;
  unitInternationalCode: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
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
  typeFeeID: string;
  currencyID: string;
  unitID: string;
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

export interface UpdateStatusFee {
  id: Key[];
  status: string;
}

export interface QueryInputRequest {
  feeNo: string;
  feeName: string;
  vatFee: string;
}

export interface QuerySelectRequest {
  typeFeeID: string;
  currencyID: string;
  unitID: string;
}

export interface RequestFeeTableRequest
  extends QueryInputRequest,
    QuerySelectRequest {
  paginateRequest: IPagination;
}

export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}

export interface TypeFeeData {
  typeFeeID: string;
  typeFeeName: string;
}
export interface TypeCurrencyData {
  currencyID: string;
  abbreviations: string;
}
export interface TypeUnitData {
  unitID: string;
  internationalCode: string;
}
