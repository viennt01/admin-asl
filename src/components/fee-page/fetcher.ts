import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  FeeRequire,
  RequestFeeType,
  RequestTableDraft,
  FeeCreate,
  FeeDelete,
  FeeDetailDataBody,
  FeeDetailType,
  FeeEdit,
  UpdateStatusFee,
  RequestFeeTableRequest,
  RequestExportData,
} from './interface';
import { API_FEE } from '@/fetcherAxios/endpoint';

export const getFeeSearch = (data: RequestFeeType) => {
  return post<RequestFeeType, ResponseWithPayload<FeeRequire>>({
    data,
  })(API_FEE.GET_SEARCH);
};

export const getFeeDetail = (id: string) => {
  return post<FeeDetailDataBody, ResponseWithPayload<FeeDetailType>>({
    data: {
      id,
    },
  })(API_FEE.GET_DETAIL);
};

export const createFee = (data: FeeCreate) => {
  return post<FeeCreate, ResponseWithPayload<FeeCreate>>({
    data,
  })(API_FEE.CREATE);
};

export const editFee = (data: FeeEdit) => {
  return post<FeeEdit, ResponseWithPayload<FeeEdit>>({
    data,
  })(API_FEE.EDIT);
};

export const deleteFee = (data: React.Key[]) => {
  return post<FeeDelete, ResponseWithPayload<FeeDelete>>({
    data: {
      ids: data,
    },
  })(API_FEE.DELETE);
};

export const getDartTable = (data: RequestTableDraft) => {
  return post<RequestTableDraft, ResponseWithPayload<FeeRequire>>({
    data,
  })(API_FEE.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusFee) => {
  return post<UpdateStatusFee, ResponseWithPayload<UpdateStatusFee>>({
    data,
  })(API_FEE.UPDATE_STATUS);
};

export const getTableRequire = (data: RequestFeeTableRequest) => {
  return post<RequestFeeTableRequest, ResponseWithPayload<FeeRequire>>({
    data,
  })(API_FEE.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_FEE.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_FEE.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(API_FEE.EXPORT);
};
