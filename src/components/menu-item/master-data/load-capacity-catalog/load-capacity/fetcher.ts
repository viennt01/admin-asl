import {
  ColumnTable,
  TABLE_NAME,
} from '../../../../commons/table/table-default';
import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  ILoadCapacityRequire,
  IRequestLoadCapacity,
  IRequestLoadCapacityTableDraft,
  ICreateLoadCapacity,
  IDeleteLoadCapacity,
  ILoadCapacityDetailDataBody,
  ILoadCapacityDetail,
  IEditLoadCapacity,
  IUpdateStatusLoadCapacity,
  IRequestLoadCapacityTableRequest,
  IRequestExportData,
  ILoadCapacityType,
} from './interface';
import {
  API_COLUMN,
  API_LOAD_CAPACITY_TYPE,
  API_LOAD_CAPACITY,
} from '@/fetcherAxios/endpoint';

export const getLoadCapacitySearch = (data: IRequestLoadCapacity) => {
  return post<IRequestLoadCapacity, ResponseWithPayload<ILoadCapacityRequire>>({
    data,
  })(API_LOAD_CAPACITY.GET_SEARCH);
};

export const getLoadCapacityDetail = (id: string) => {
  return post<
    ILoadCapacityDetailDataBody,
    ResponseWithPayload<ILoadCapacityDetail>
  >({
    data: {
      id,
    },
  })(API_LOAD_CAPACITY.GET_DETAIL);
};

export const createLoadCapacity = (data: ICreateLoadCapacity) => {
  return post<ICreateLoadCapacity, ResponseWithPayload<ICreateLoadCapacity>>({
    data,
  })(API_LOAD_CAPACITY.CREATE);
};

export const editLoadCapacity = (data: IEditLoadCapacity) => {
  return post<IEditLoadCapacity, ResponseWithPayload<IEditLoadCapacity>>({
    data,
  })(API_LOAD_CAPACITY.EDIT);
};

export const deleteLoadCapacity = (data: React.Key[]) => {
  return post<IDeleteLoadCapacity, ResponseWithPayload<IDeleteLoadCapacity>>({
    data: {
      ids: data,
    },
  })(API_LOAD_CAPACITY.DELETE);
};

export const getDartTable = (data: IRequestLoadCapacityTableDraft) => {
  return post<
    IRequestLoadCapacityTableDraft,
    ResponseWithPayload<ILoadCapacityRequire>
  >({
    data,
  })(API_LOAD_CAPACITY.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: IUpdateStatusLoadCapacity) => {
  return post<
    IUpdateStatusLoadCapacity,
    ResponseWithPayload<IUpdateStatusLoadCapacity>
  >({
    data,
  })(API_LOAD_CAPACITY.UPDATE_STATUS);
};

export const getTableRequire = (data: IRequestLoadCapacityTableRequest) => {
  return post<
    IRequestLoadCapacityTableRequest,
    ResponseWithPayload<ILoadCapacityRequire>
  >({
    data,
  })(API_LOAD_CAPACITY.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile<BlobPart>({ data, timeout: 10000 })(
    API_LOAD_CAPACITY.IMPORT
  );
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_LOAD_CAPACITY.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: IRequestExportData) => {
  return exportFile<IRequestExportData, BlobPart>({ data })(
    API_LOAD_CAPACITY.EXPORT
  );
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.LOAD_CAPACITY,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
//----------------------------------------------------------------
//Get all list Type of Load Capacity
export const getListTypeLoadCapacityID = () => {
  return get<ResponseWithPayload<ILoadCapacityType[]>>({})(
    API_LOAD_CAPACITY_TYPE.GET_ALL
  );
};
