import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  BankRequire,
  RequestBankType,
  RequestBankTableDraft,
  BankCreate,
  BankDelete,
  BankDetailDataBody,
  BankDetailType,
  BankEdit,
  UpdateStatusBank,
  RequestBankTableRequest,
} from './interface';
import { API_BANK } from '@/fetcherAxios/endpoint';

export const getBankSearch = (data: RequestBankType) => {
  return post<RequestBankType, ResponseWithPayload<BankRequire>>({
    data,
  })(API_BANK.GET_SEARCH);
};

export const getBankDetail = (id: string) => {
  return post<BankDetailDataBody, ResponseWithPayload<BankDetailType>>({
    data: {
      id,
    },
  })(API_BANK.GET_DETAIL);
};

export const createBank = (data: BankCreate) => {
  return post<BankCreate, ResponseWithPayload<BankCreate>>({
    data,
  })(API_BANK.CREATE);
};

export const editBank = (data: BankEdit) => {
  return post<BankEdit, ResponseWithPayload<BankEdit>>({
    data,
  })(API_BANK.EDIT);
};

export const deleteBank = (data: React.Key[]) => {
  return post<BankDelete, ResponseWithPayload<BankDelete>>({
    data: {
      ids: data,
    },
  })(API_BANK.DELETE);
};

export const getDartTable = (data: RequestBankTableDraft) => {
  return post<RequestBankTableDraft, ResponseWithPayload<BankRequire>>({
    data,
  })(API_BANK.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusBank) => {
  return post<UpdateStatusBank, ResponseWithPayload<UpdateStatusBank>>({
    data,
  })(API_BANK.UPDATE_STATUS);
};

export const getTableRequire = (data: RequestBankTableRequest) => {
  return post<RequestBankTableRequest, ResponseWithPayload<BankRequire>>({
    data,
  })(API_BANK.GET_REQUEST);
};
