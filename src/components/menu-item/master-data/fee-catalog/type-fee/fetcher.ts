import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  TypeFeeRequire,
  RequestTypeFeeType,
  RequestTableDraft,
  TypeFeeCreate,
  TypeFeeDelete,
  TypeFeeDetailDataBody,
  TypeFeeDetailType,
  TypeFeeEdit,
  UpdateStatusTypeFee,
  RequestTypeFeeTableRequest,
  RequestExportData,
} from './interface';
import { API_COLUMN, API_TYPE_FEE } from '@/fetcherAxios/endpoint';
import {
  ColumnTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';

export const getTypeFeeSearch = (data: RequestTypeFeeType) => {
  return post<RequestTypeFeeType, ResponseWithPayload<TypeFeeRequire>>({
    data,
  })(API_TYPE_FEE.GET_SEARCH);
};

export const getTypeFeeDetail = (id: string) => {
  return post<TypeFeeDetailDataBody, ResponseWithPayload<TypeFeeDetailType>>({
    data: {
      id,
    },
  })(API_TYPE_FEE.GET_DETAIL);
};

export const createTypeFee = (data: TypeFeeCreate) => {
  return post<TypeFeeCreate, ResponseWithPayload<TypeFeeCreate>>({
    data,
  })(API_TYPE_FEE.CREATE);
};

export const editTypeFee = (data: TypeFeeEdit) => {
  return post<TypeFeeEdit, ResponseWithPayload<TypeFeeEdit>>({
    data,
  })(API_TYPE_FEE.EDIT);
};

export const deleteTypeFee = (data: React.Key[]) => {
  return post<TypeFeeDelete, ResponseWithPayload<TypeFeeDelete>>({
    data: {
      ids: data,
    },
  })(API_TYPE_FEE.DELETE);
};

export const getDartTypeTable = (data: RequestTableDraft) => {
  return post<RequestTableDraft, ResponseWithPayload<TypeFeeRequire>>({
    data,
  })(API_TYPE_FEE.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusTypeFee) => {
  return post<UpdateStatusTypeFee, ResponseWithPayload<UpdateStatusTypeFee>>({
    data,
  })(API_TYPE_FEE.UPDATE_STATUS);
};

export const getTableRequire = (data: RequestTypeFeeTableRequest) => {
  return post<RequestTypeFeeTableRequest, ResponseWithPayload<TypeFeeRequire>>({
    data,
  })(API_TYPE_FEE.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_TYPE_FEE.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_TYPE_FEE.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(API_TYPE_FEE.EXPORT);
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.TYPE_FEE,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
