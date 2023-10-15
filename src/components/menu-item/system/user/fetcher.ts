import { ResponseWithPayload, exportFile, post } from '@/fetcherAxios';
import {
  UserRequire,
  RequestUserType,
  UserDetailDataBody,
  UnitDetailType,
  UpdateStatusUser,
  RequestExportData,
} from './interface';
import { API_COLUMN, API_USER } from '@/fetcherAxios/endpoint';
import {
  ColumnTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';

export const getUserSearch = (data: RequestUserType) => {
  return post<RequestUserType, ResponseWithPayload<UserRequire>>({
    data,
  })(API_USER.GET_SEARCH);
};

export const getUserDetail = (id: string) => {
  return post<UserDetailDataBody, ResponseWithPayload<UnitDetailType>>({
    data: {
      id,
    },
  })(API_USER.GET_DETAIL);
};

export const updateStatus = (data: UpdateStatusUser) => {
  return post<UpdateStatusUser, ResponseWithPayload<UpdateStatusUser>>({
    data,
  })(API_USER.UPDATE_STATUS);
};

//----------------------------------------------------------------
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(API_USER.EXPORT);
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.USER,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
