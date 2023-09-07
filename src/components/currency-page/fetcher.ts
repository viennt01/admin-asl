import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  CurrencyRequire,
  RequestCurrencyType,
  RequestTableDraft,
  CurrencyCreate,
  CurrencyDelete,
  CurrencyDetailDataBody,
  CurrencyDetailType,
  CurrencyEdit,
  UpdateStatusCurrency,
  RequestCurrencyTableRequest,
} from './interface';
import { API_CURRENCY } from '@/fetcherAxios/endpoint';

export const getCurrencySearch = (data: RequestCurrencyType) => {
  return post<RequestCurrencyType, ResponseWithPayload<CurrencyRequire>>({
    data,
  })(API_CURRENCY.GET_SEARCH);
};

export const getCurrencyDetail = (id: string) => {
  return post<CurrencyDetailDataBody, ResponseWithPayload<CurrencyDetailType>>({
    data: {
      id,
    },
  })(API_CURRENCY.GET_DETAIL);
};

export const createCurrency = (data: CurrencyCreate) => {
  return post<CurrencyCreate, ResponseWithPayload<CurrencyCreate>>({
    data,
  })(API_CURRENCY.CREATE);
};

export const editCurrency = (data: CurrencyEdit) => {
  return post<CurrencyEdit, ResponseWithPayload<CurrencyEdit>>({
    data,
  })(API_CURRENCY.EDIT);
};

export const deleteCurrency = (data: React.Key[]) => {
  return post<CurrencyDelete, ResponseWithPayload<CurrencyDelete>>({
    data: {
      ids: data,
    },
  })(API_CURRENCY.DELETE);
};

export const getDartTable = (data: RequestTableDraft) => {
  return post<RequestTableDraft, ResponseWithPayload<CurrencyRequire>>({
    data,
  })(API_CURRENCY.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusCurrency) => {
  return post<UpdateStatusCurrency, ResponseWithPayload<UpdateStatusCurrency>>({
    data,
  })(API_CURRENCY.UPDATE_STATUS);
};

export const getTableRequire = (data: RequestCurrencyTableRequest) => {
  return post<
    RequestCurrencyTableRequest,
    ResponseWithPayload<CurrencyRequire>
  >({
    data,
  })(API_CURRENCY.GET_REQUEST);
};
