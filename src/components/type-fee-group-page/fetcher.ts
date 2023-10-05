import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  TypeFeeGroupsRequire,
  RequestFeeGroupType,
  RequestTypeFeeGroupTableDraft,
  TypeFeeGroupCreate,
  TypeFeeGroupDelete,
  TypeFeeGroupDetailDataBody,
  TypeFeeGroupDetailType,
  TypeFeeGroupEdit,
  UpdateStatusTypeFeeGroup,
  RequestTypeFeeGroupTableRequest,
  RequestExportData,
} from './interface';
import { API_COLUMN, API_TYPE_FEE_GROUP } from '@/fetcherAxios/endpoint';
import {
  ColumnTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';

export const getLocationsSearch = (data: RequestFeeGroupType) => {
  return post<RequestFeeGroupType, ResponseWithPayload<TypeFeeGroupsRequire>>({
    data,
  })(API_TYPE_FEE_GROUP.GET_SEARCH);
};

export const getTypeFeeGroupDetail = (id: string) => {
  return post<
    TypeFeeGroupDetailDataBody,
    ResponseWithPayload<TypeFeeGroupDetailType>
  >({
    data: {
      id,
    },
  })(API_TYPE_FEE_GROUP.GET_DETAIL);
};

export const createTypeFeeGroup = (data: TypeFeeGroupCreate) => {
  return post<TypeFeeGroupCreate, ResponseWithPayload<TypeFeeGroupCreate>>({
    data,
  })(API_TYPE_FEE_GROUP.CREATE);
};

export const editTypeFeeGroup = (data: TypeFeeGroupEdit) => {
  return post<TypeFeeGroupEdit, ResponseWithPayload<TypeFeeGroupEdit>>({
    data,
  })(API_TYPE_FEE_GROUP.EDIT);
};

export const deleteTypeFeeGroup = (data: React.Key[]) => {
  return post<TypeFeeGroupDelete, ResponseWithPayload<TypeFeeGroupDelete>>({
    data: {
      ids: data,
    },
  })(API_TYPE_FEE_GROUP.DELETE);
};

export const getDartTable = (data: RequestTypeFeeGroupTableDraft) => {
  return post<
    RequestTypeFeeGroupTableDraft,
    ResponseWithPayload<TypeFeeGroupsRequire>
  >({
    data,
  })(API_TYPE_FEE_GROUP.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusTypeFeeGroup) => {
  return post<
    UpdateStatusTypeFeeGroup,
    ResponseWithPayload<UpdateStatusTypeFeeGroup>
  >({
    data,
  })(API_TYPE_FEE_GROUP.UPDATE_STATUS);
};

export const getTable = (data: RequestTypeFeeGroupTableRequest) => {
  return post<
    RequestTypeFeeGroupTableRequest,
    ResponseWithPayload<TypeFeeGroupsRequire>
  >({
    data,
  })(API_TYPE_FEE_GROUP.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_TYPE_FEE_GROUP.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_TYPE_FEE_GROUP.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(
    API_TYPE_FEE_GROUP.EXPORT
  );
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.TYPE_OF_FEE_GROUP,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
