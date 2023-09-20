import { Pagination } from '../commons/table/table-deafault';
import COLORS from '@/constant/color';

export const STATUS_MASTER_COLORS = {
  ACTIVE: COLORS.STATUS_CODE.ACTIVE,
  DEACTIVE: COLORS.STATUS_CODE.DEACTIVE,
};

export const STATUS_MATER_LABELS = {
  ACTIVE: 'ACTIVE',
  DEACTIVE: 'DEACTIVE',
};
//
export interface Bank {
  bankID: string;
  bankNo: string;
  bankName: string;
  accountNumberVND: string;
  accountNumberUSD: string;
  phoneNumber: string;
  email: string;
  address: string;
  bankBranch: string;
  note: string;
  statusBank: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
}

export interface BankTable extends Omit<Bank, 'bankID'> {
  key: string;
  searchAll: string;
}

export interface BankRequire extends Pagination {
  data: Bank[];
}

export interface QueryInputParamType {
  searchAll: string;
  bankNo: string;
  bankName: string;
  accountNumberVND: string;
  accountNumberUSD: string;
  phoneNumber: string;
  email: string;
  address: string;
  bankBranch: string;
  note: string;
}
export interface QuerySelectParamType {
  statusBank: string[];
}

export interface RequestBankType
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

export interface BankDetailDataBody {
  id: string;
}

export interface FormValues {
  bankID: string;
  bankNo: string;
  bankName: string;
  accountNumberVND: string;
  accountNumberUSD: string;
  phoneNumber: string;
  email: string;
  address: string;
  bankBranch: string;
  note: string;
  statusBank: string;
}

export interface BankDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type BankCreate = Omit<FormValues, 'bankID'>;

export type BankEdit = FormValues;

export type BankDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  bankNo: string;
  bankName: string;
  accountNumberVND: string;
  accountNumberUSD: string;
  phoneNumber: string;
  email: string;
  address: string;
  bankBranch: string;
  note: string;
}
export interface QuerySelectDraft {
  status: string[];
}
export interface RequestBankTableDraft
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

export interface UpdateStatusBank {
  id: string;
  status: string;
}

export interface QueryInputRequest {
  bankNo: string;
  bankName: string;
  accountNumberVND: string;
  accountNumberUSD: string;
  phoneNumber: string;
  email: string;
  address: string;
  bankBranch: string;
  note: string;
}
export interface RequestBankTableRequest extends QueryInputRequest {
  paginateRequest: Pagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
