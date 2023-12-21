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
  CommodityRequire,
  RequestLocationType,
  RequestCommodityTableDraft,
  CreateCommodity,
  DeleteCommodity,
  CommodityDetailDataBody,
  CommodityDetailType,
  EditCommodity,
  UpdateStatusCommodity,
  RequestUnitTableRequest,
  RequestExportData,
} from './interface';
import { API_COLUMN, API_COMMODITY } from '@/fetcherAxios/endpoint';

export const getCommoditySearch = (data: RequestLocationType) => {
  return post<RequestLocationType, ResponseWithPayload<CommodityRequire>>({
    data,
  })(API_COMMODITY.GET_SEARCH);
};

export const getCommodityDetail = (id: string) => {
  return post<
    CommodityDetailDataBody,
    ResponseWithPayload<CommodityDetailType>
  >({
    data: {
      id,
    },
  })(API_COMMODITY.GET_DETAIL);
};

export const createCommodity = (data: CreateCommodity) => {
  return post<CreateCommodity, ResponseWithPayload<CreateCommodity>>({
    data,
  })(API_COMMODITY.CREATE);
};

export const editCommodity = (data: EditCommodity) => {
  return post<EditCommodity, ResponseWithPayload<EditCommodity>>({
    data,
  })(API_COMMODITY.EDIT);
};

export const deleteCommodity = (data: React.Key[]) => {
  return post<DeleteCommodity, ResponseWithPayload<DeleteCommodity>>({
    data: {
      ids: data,
    },
  })(API_COMMODITY.DELETE);
};

export const getDartTable = (data: RequestCommodityTableDraft) => {
  return post<
    RequestCommodityTableDraft,
    ResponseWithPayload<CommodityRequire>
  >({
    data,
  })(API_COMMODITY.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusCommodity) => {
  return post<
    UpdateStatusCommodity,
    ResponseWithPayload<UpdateStatusCommodity>
  >({
    data,
  })(API_COMMODITY.UPDATE_STATUS);
};

export const getTable = (data: RequestUnitTableRequest) => {
  return post<RequestUnitTableRequest, ResponseWithPayload<CommodityRequire>>({
    data,
  })(API_COMMODITY.GET_REQUEST);
};

//----------------------------------------------------------------
export const importCommodity = (data: FormData) => {
  return uploadFile<BlobPart>({ data, timeout: 100000 })(API_COMMODITY.IMPORT);
};
export const downloadExampleFileCommodity = () => {
  return downloadFile<BlobPart>({})(API_COMMODITY.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(
    API_COMMODITY.EXPORT
  );
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.COMMODITY,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
