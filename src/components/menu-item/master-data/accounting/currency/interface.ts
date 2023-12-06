import { IPagination } from '../../../../commons/table/table-default';

export interface Currency {
  currencyID: string;
  currencyName: string;
  exchangeRateToVND: string;
  exchangeRateToUSD: string;
  statusCurrency: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
}

export interface CurrencyTable extends Omit<Currency, 'currencyID'> {
  key: string;
  searchAll: string;
}

export interface CurrencyRequire extends IPagination {
  data: Currency[];
}
//
export interface QueryInputParamType {
  searchAll: string;
  currencyName: string;
  exchangeRateToVND: string;
  exchangeRateToUSD: string;
}
export interface QuerySelectParamType {
  statusCurrency: string[];
}

export interface RequestCurrencyType
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

export interface CurrencyDetailDataBody {
  id: string;
}

export interface FormValues {
  currencyID: string;
  currencyName: string;
  exchangeRateToVND: string;
  exchangeRateToUSD: string;
  public: boolean;
  statusCurrency: string;
}

export interface CurrencyDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type CurrencyCreate = Omit<FormValues, 'currencyID'>;

export type CurrencyEdit = FormValues;

export type CurrencyDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  currencyName: string;
  exchangeRateToVND: string;
  exchangeRateToUSD: string;
}
export interface QuerySelectDraft {
  status: string[];
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

export interface UpdateStatusCurrency {
  id: React.Key[];
  status: string;
}

export interface QueryInputRequest {
  currencyName: string;
  exchangeRateToVND: string;
  exchangeRateToUSD: string;
}
export interface RequestCurrencyTableRequest extends QueryInputRequest {
  paginateRequest: IPagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
