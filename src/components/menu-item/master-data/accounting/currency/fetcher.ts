import {
  ColumnTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';
import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  post,
  uploadFile,
} from '@/fetcherAxios';
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
  RequestExportData,
} from './interface';
import { API_COLUMN, API_CURRENCY } from '@/fetcherAxios/endpoint';

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
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile<BlobPart>({ data, timeout: 100000 })(API_CURRENCY.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_CURRENCY.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(API_CURRENCY.EXPORT);
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.CURRENCY,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
