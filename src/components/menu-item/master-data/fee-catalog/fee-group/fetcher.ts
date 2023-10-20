import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  FeeGroupsRequire,
  RequestFeeGroup,
  RequestFeeGroupTableDraft,
  FeeGroupCreate,
  FeeGroupDelete,
  FeeGroupDetailDataBody,
  FeeGroupDetailType,
  FeeGroupEdit,
  UpdateStatusFeeGroup,
  RequestFeeGroupTableRequest,
  RequestExportData,
  TypeFeeGroupData,
  FeeData,
  RequestFee,
  FeeTable,
  RequestUpdateFeeOfFeeGroup,
} from './interface';
import {
  API_COLUMN,
  API_FEE,
  API_FEE_GROUP,
  API_TYPE_FEE_GROUP,
} from '@/fetcherAxios/endpoint';
import {
  ColumnTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';

export const getFeeGroupSearch = (data: RequestFeeGroup) => {
  return post<RequestFeeGroup, ResponseWithPayload<FeeGroupsRequire>>({
    data,
  })(API_FEE_GROUP.GET_SEARCH);
};

export const getFeeGroupDetail = (id: string) => {
  return post<FeeGroupDetailDataBody, ResponseWithPayload<FeeGroupDetailType>>({
    data: {
      id,
    },
  })(API_FEE_GROUP.GET_DETAIL);
};

export const createFeeGroup = (data: FeeGroupCreate) => {
  return post<FeeGroupCreate, ResponseWithPayload<FeeGroupCreate>>({
    data,
  })(API_FEE_GROUP.CREATE);
};

export const editFeeGroup = (data: FeeGroupEdit) => {
  return post<FeeGroupEdit, ResponseWithPayload<FeeGroupEdit>>({
    data,
  })(API_FEE_GROUP.EDIT);
};

export const deleteFeeGroup = (data: React.Key[]) => {
  return post<FeeGroupDelete, ResponseWithPayload<FeeGroupDelete>>({
    data: {
      ids: data,
    },
  })(API_FEE_GROUP.DELETE);
};

export const getDartTable = (data: RequestFeeGroupTableDraft) => {
  return post<RequestFeeGroupTableDraft, ResponseWithPayload<FeeGroupsRequire>>(
    {
      data,
    }
  )(API_FEE_GROUP.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusFeeGroup) => {
  return post<UpdateStatusFeeGroup, ResponseWithPayload<UpdateStatusFeeGroup>>({
    data,
  })(API_FEE_GROUP.UPDATE_STATUS);
};

export const getTable = (data: RequestFeeGroupTableRequest) => {
  return post<
    RequestFeeGroupTableRequest,
    ResponseWithPayload<FeeGroupsRequire>
  >({
    data,
  })(API_FEE_GROUP.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_FEE_GROUP.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_FEE_GROUP.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(
    API_FEE_GROUP.EXPORT
  );
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.FEE_GROUP,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
//----------------------------------------------------------------
//Get type fee group
export const getListTypeFeeGroup = () => {
  return get<ResponseWithPayload<TypeFeeGroupData[]>>({})(
    API_TYPE_FEE_GROUP.GET_ALL
  );
};
//Get fee
export const getListFee = () => {
  return get<ResponseWithPayload<FeeData[]>>({})(API_FEE.GET_ALL);
};
//----------------------------------------------------------------
// Get table fee with feeGroup
export const getFeeWithFeeGroup = (data: RequestFee) => {
  return post<RequestFee, ResponseWithPayload<FeeTable[]>>({ data })(
    API_FEE_GROUP.GET_ALL_FEE_WITH_FEE_GROUP
  );
};
// Update fee with feeGroup
export const updateFeeWithFeeGroup = (data: RequestUpdateFeeOfFeeGroup) => {
  return post<
    RequestUpdateFeeOfFeeGroup,
    ResponseWithPayload<RequestUpdateFeeOfFeeGroup>
  >({
    data,
  })(API_FEE_GROUP.UPDATE_FEE_WITH_FEE_GROUP);
};
