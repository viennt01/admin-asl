import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  ITypeUnitsRequire,
  IRequestTypeUnitType,
  IRequestUnitTableDraft,
  ITypeUnitCreate,
  ITypeUnitDelete,
  ITypeUnitDetailDataBody,
  ITypeUnitDetailType,
  ITypeUnitEdit,
  IUpdateStatusUnit,
  IRequestUnitTableRequest,
  IRequestExportData,
  ITypeUnit,
} from './interface';
import { API_COLUMN, API_TYPE_UNIT } from '@/fetcherAxios/endpoint';
import {
  ColumnTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';

export const getUnitSearch = (data: IRequestTypeUnitType) => {
  return post<IRequestTypeUnitType, ResponseWithPayload<ITypeUnitsRequire>>({
    data,
  })(API_TYPE_UNIT.GET_SEARCH);
};

export const getUnitDetail = (id: string) => {
  return post<
    ITypeUnitDetailDataBody,
    ResponseWithPayload<ITypeUnitDetailType>
  >({
    data: {
      id,
    },
  })(API_TYPE_UNIT.GET_DETAIL);
};

export const createUnit = (data: ITypeUnitCreate) => {
  return post<ITypeUnitCreate, ResponseWithPayload<ITypeUnitCreate>>({
    data,
  })(API_TYPE_UNIT.CREATE);
};

export const editUnit = (data: ITypeUnitEdit) => {
  return post<ITypeUnitEdit, ResponseWithPayload<ITypeUnitEdit>>({
    data,
  })(API_TYPE_UNIT.EDIT);
};

export const deleteUnit = (data: React.Key[]) => {
  return post<ITypeUnitDelete, ResponseWithPayload<ITypeUnitDelete>>({
    data: {
      ids: data,
    },
  })(API_TYPE_UNIT.DELETE);
};

export const getDartTable = (data: IRequestUnitTableDraft) => {
  return post<IRequestUnitTableDraft, ResponseWithPayload<ITypeUnitsRequire>>({
    data,
  })(API_TYPE_UNIT.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: IUpdateStatusUnit) => {
  return post<IUpdateStatusUnit, ResponseWithPayload<IUpdateStatusUnit>>({
    data,
  })(API_TYPE_UNIT.UPDATE_STATUS);
};

export const getTable = (data: IRequestUnitTableRequest) => {
  return post<IRequestUnitTableRequest, ResponseWithPayload<ITypeUnitsRequire>>(
    {
      data,
    }
  )(API_TYPE_UNIT.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_TYPE_UNIT.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_TYPE_UNIT.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: IRequestExportData) => {
  return exportFile<IRequestExportData, BlobPart>({ data })(
    API_TYPE_UNIT.EXPORT
  );
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.TYPE_OF_UNIT,
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
