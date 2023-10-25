import {
  ColumnTable,
  TABLE_NAME,
} from '../../../../commons/table/table-default';
import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  LocationTypeRequire,
  RequestLocationTypeType,
  RequestLocationTypeTableDraft,
  LocationTypeCreate,
  LocationTypeDelete,
  LocationTypeDetailDataBody,
  LocationTypeDetailType,
  LocationTypeEdit,
  UpdateStatusLocation,
  RequestLocationTypeTableRequest,
  RequestExportData,
} from './interface';
import { API_COLUMN, API_LOCATION } from '@/fetcherAxios/endpoint';

export const getLocationSearch = (data: RequestLocationTypeType) => {
  return post<
    RequestLocationTypeType,
    ResponseWithPayload<LocationTypeRequire>
  >({
    data,
  })(API_LOCATION.GET_SEARCH);
};

export const geLocationDetail = (id: string) => {
  return post<
    LocationTypeDetailDataBody,
    ResponseWithPayload<LocationTypeDetailType>
  >({
    data: {
      id,
    },
  })(API_LOCATION.GET_DETAIL);
};

export const createLocation = (data: LocationTypeCreate) => {
  return post<LocationTypeCreate, ResponseWithPayload<LocationTypeCreate>>({
    data,
  })(API_LOCATION.CREATE);
};

export const editLocation = (data: LocationTypeEdit) => {
  return post<LocationTypeEdit, ResponseWithPayload<LocationTypeEdit>>({
    data,
  })(API_LOCATION.EDIT);
};

export const deleteLocation = (data: React.Key[]) => {
  return post<LocationTypeDelete, ResponseWithPayload<LocationTypeDelete>>({
    data: {
      ids: data,
    },
  })(API_LOCATION.DELETE);
};

export const getDartTable = (data: RequestLocationTypeTableDraft) => {
  return post<
    RequestLocationTypeTableDraft,
    ResponseWithPayload<LocationTypeRequire>
  >({
    data,
  })(API_LOCATION.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusLocation) => {
  return post<UpdateStatusLocation, ResponseWithPayload<UpdateStatusLocation>>({
    data,
  })(API_LOCATION.UPDATE_STATUS);
};

export const getTableRequire = (data: RequestLocationTypeTableRequest) => {
  return post<
    RequestLocationTypeTableRequest,
    ResponseWithPayload<LocationTypeRequire>
  >({
    data,
  })(API_LOCATION.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_LOCATION.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_LOCATION.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(API_LOCATION.EXPORT);
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.LOCATION,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
