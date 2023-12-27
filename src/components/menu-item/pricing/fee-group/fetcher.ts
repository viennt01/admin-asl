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
  ITypeFeeGroupData,
  FeeData,
  RequestFee,
  FeeTable,
  RequestUpdateFeeOfFeeGroup,
  RequestDeleteFeeOfFeeGroup,
  IDataFeeGroup,
  IRequestFeeGroup,
  ITypeFeeGroup,
  ITypeFeeRequest,
} from './interface';
import {
  API_COLUMN,
  API_FEE,
  API_FEE_GROUP,
  API_TYPE_FEE_GROUP,
} from '@/fetcherAxios/endpoint';
import {
  ColumnTable,
  RequestGetColumnTable,
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
  return uploadFile<BlobPart>({ data, timeout: 100000 })(API_FEE_GROUP.IMPORT);
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
export const getColumnTable = (data: RequestGetColumnTable) => {
  return post<RequestGetColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
//----------------------------------------------------------------
//Get type fee group
export const getListTypeFeeGroup = (data: ITypeFeeGroup) => {
  return post<ITypeFeeGroup, ResponseWithPayload<ITypeFeeGroupData[]>>({
    data,
  })(API_TYPE_FEE_GROUP.GET_ALL);
};
//Get fee
export const getListFee = () => {
  return get<ResponseWithPayload<FeeData[]>>({})(API_FEE.GET_ALL);
};
export const getListFeeByTypeFee = (data: ITypeFeeRequest) => {
  return post<ITypeFeeRequest, ResponseWithPayload<FeeData[]>>({ data })(
    API_FEE.GET_ALL_FEE_BY_TYPE_FEE
  );
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
// Delete fee with feeGroup
export const deleteFeeWithFeeGroup = (data: RequestDeleteFeeOfFeeGroup) => {
  return post<
    RequestDeleteFeeOfFeeGroup,
    ResponseWithPayload<RequestDeleteFeeOfFeeGroup>
  >({
    data,
  })(API_FEE_GROUP.DELETE_FEE_WITH_FEE_GROUP);
};
//----------------------------------------------------------------
// Get all feeGroup
export const getAllFeeGroup = (data: IRequestFeeGroup) => {
  return post<IRequestFeeGroup, ResponseWithPayload<IDataFeeGroup[]>>({ data })(
    API_FEE_GROUP.GET_ALL
  );
};
