import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  ILoadCapacityTypeRequire,
  IRequestLoadCapacityTypeType,
  IRequestLoadCapacityTypeTableDraft,
  ILoadCapacityTypeCreate,
  ILoadCapacityTypeDelete,
  ILoadCapacityTypeDetailDataBody,
  ILoadCapacityTypeDetailType,
  ILoadCapacityTypeEdit,
  IUpdateStatusLoadCapacityType,
  IRequestLoadCapacityTypeTableRequest,
  IRequestExportData,
} from './interface';
import { API_COLUMN, API_LOAD_CAPACITY_TYPE } from '@/fetcherAxios/endpoint';
import {
  ColumnTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';
export const getLoadCapacityTypeSearch = (
  data: IRequestLoadCapacityTypeType
) => {
  return post<
    IRequestLoadCapacityTypeType,
    ResponseWithPayload<ILoadCapacityTypeRequire>
  >({
    data,
  })(API_LOAD_CAPACITY_TYPE.GET_SEARCH);
};

export const geLoadCapacityTypeDetail = (id: string) => {
  return post<
    ILoadCapacityTypeDetailDataBody,
    ResponseWithPayload<ILoadCapacityTypeDetailType>
  >({
    data: {
      id,
    },
  })(API_LOAD_CAPACITY_TYPE.GET_DETAIL);
};

export const createLoadCapacityType = (data: ILoadCapacityTypeCreate) => {
  return post<
    ILoadCapacityTypeCreate,
    ResponseWithPayload<ILoadCapacityTypeCreate>
  >({
    data,
  })(API_LOAD_CAPACITY_TYPE.CREATE);
};

export const editLoadCapacityType = (data: ILoadCapacityTypeEdit) => {
  return post<
    ILoadCapacityTypeEdit,
    ResponseWithPayload<ILoadCapacityTypeEdit>
  >({
    data,
  })(API_LOAD_CAPACITY_TYPE.EDIT);
};

export const deleteLoadCapacityType = (data: React.Key[]) => {
  return post<
    ILoadCapacityTypeDelete,
    ResponseWithPayload<ILoadCapacityTypeDelete>
  >({
    data: {
      ids: data,
    },
  })(API_LOAD_CAPACITY_TYPE.DELETE);
};

export const getDartTable = (data: IRequestLoadCapacityTypeTableDraft) => {
  return post<
    IRequestLoadCapacityTypeTableDraft,
    ResponseWithPayload<ILoadCapacityTypeRequire>
  >({
    data,
  })(API_LOAD_CAPACITY_TYPE.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: IUpdateStatusLoadCapacityType) => {
  return post<
    IUpdateStatusLoadCapacityType,
    ResponseWithPayload<IUpdateStatusLoadCapacityType>
  >({
    data,
  })(API_LOAD_CAPACITY_TYPE.UPDATE_STATUS);
};

export const getTableRequire = (data: IRequestLoadCapacityTypeTableRequest) => {
  return post<
    IRequestLoadCapacityTypeTableRequest,
    ResponseWithPayload<ILoadCapacityTypeRequire>
  >({
    data,
  })(API_LOAD_CAPACITY_TYPE.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile<BlobPart>({ data, timeout: 10000 })(
    API_LOAD_CAPACITY_TYPE.IMPORT
  );
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(
    API_LOAD_CAPACITY_TYPE.DOWNLOAD_EXAMPLE_FILE
  );
};
export const exportTableFile = (data: IRequestExportData) => {
  return exportFile<IRequestExportData, BlobPart>({ data })(
    API_LOAD_CAPACITY_TYPE.EXPORT
  );
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.TYPE_OF_LOAD_CAPACITY,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
