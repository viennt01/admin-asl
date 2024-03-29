import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  UnitsRequire,
  RequestUnitType,
  RequestUnitTableDraft,
  UnitCreate,
  UnitDelete,
  UnitDetailDataBody,
  UnitDetailType,
  UnitEdit,
  UpdateStatusUnit,
  RequestUnitTableRequest,
  RequestExportData,
  ITypeUnit,
} from './interface';
import { API_COLUMN, API_TYPE_UNIT, API_UNIT } from '@/fetcherAxios/endpoint';
import {
  ColumnTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';

export const getUnitSearch = (data: RequestUnitType) => {
  return post<RequestUnitType, ResponseWithPayload<UnitsRequire>>({
    data,
  })(API_UNIT.GET_SEARCH);
};

export const getUnitDetail = (id: string) => {
  return post<UnitDetailDataBody, ResponseWithPayload<UnitDetailType>>({
    data: {
      id,
    },
  })(API_UNIT.GET_DETAIL);
};

export const createUnit = (data: UnitCreate) => {
  return post<UnitCreate, ResponseWithPayload<UnitCreate>>({
    data,
  })(API_UNIT.CREATE);
};

export const editUnit = (data: UnitEdit) => {
  return post<UnitEdit, ResponseWithPayload<UnitEdit>>({
    data,
  })(API_UNIT.EDIT);
};

export const deleteUnit = (data: React.Key[]) => {
  return post<UnitDelete, ResponseWithPayload<UnitDelete>>({
    data: {
      ids: data,
    },
  })(API_UNIT.DELETE);
};

export const getDartTable = (data: RequestUnitTableDraft) => {
  return post<RequestUnitTableDraft, ResponseWithPayload<UnitsRequire>>({
    data,
  })(API_UNIT.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusUnit) => {
  return post<UpdateStatusUnit, ResponseWithPayload<UpdateStatusUnit>>({
    data,
  })(API_UNIT.UPDATE_STATUS);
};

export const getTable = (data: RequestUnitTableRequest) => {
  return post<RequestUnitTableRequest, ResponseWithPayload<UnitsRequire>>({
    data,
  })(API_UNIT.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile<BlobPart>({ data, timeout: 100000 })(API_UNIT.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_UNIT.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(API_UNIT.EXPORT);
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.UNIT,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
//----------------------------------------------------------------
//Get type unit
export const getListTyeUnit = () => {
  return get<ResponseWithPayload<ITypeUnit[]>>({})(API_TYPE_UNIT.GET_ALL);
};
