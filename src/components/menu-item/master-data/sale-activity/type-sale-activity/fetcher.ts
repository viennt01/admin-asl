import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  ITypeDeclarationRequire,
  IRequestTypeDeclarationType,
  IRequestSaleActivityTableDraft,
  ITypeSaleActivityCreate,
  ITypeSaleActivityDelete,
  ITypeSaleActivityDetailDataBody,
  ITypeSaleActivityDetailType,
  ITypeSaleActivityEdit,
  IUpdateStatusDeclaration,
  IRequestDeclarationTableRequest,
  IRequestExportData,
  ITypeDeclaration,
} from './interface';
import { API_COLUMN, API_TYPE_SALE_ACTIVITY } from '@/fetcherAxios/endpoint';
import {
  ColumnTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';

export const getDeclarationSearch = (data: IRequestTypeDeclarationType) => {
  return post<
    IRequestTypeDeclarationType,
    ResponseWithPayload<ITypeDeclarationRequire>
  >({
    data,
  })(API_TYPE_SALE_ACTIVITY.GET_SEARCH);
};

export const getDeclarationDetail = (id: string) => {
  return post<
    ITypeSaleActivityDetailDataBody,
    ResponseWithPayload<ITypeSaleActivityDetailType>
  >({
    data: {
      id,
    },
  })(API_TYPE_SALE_ACTIVITY.GET_DETAIL);
};

export const createDeclaration = (data: ITypeSaleActivityCreate) => {
  return post<
    ITypeSaleActivityCreate,
    ResponseWithPayload<ITypeSaleActivityCreate>
  >({
    data,
  })(API_TYPE_SALE_ACTIVITY.CREATE);
};

export const editDeclaration = (data: ITypeSaleActivityEdit) => {
  return post<
    ITypeSaleActivityEdit,
    ResponseWithPayload<ITypeSaleActivityEdit>
  >({
    data,
  })(API_TYPE_SALE_ACTIVITY.EDIT);
};

export const deleteDeclaration = (data: React.Key[]) => {
  return post<
    ITypeSaleActivityDelete,
    ResponseWithPayload<ITypeSaleActivityDelete>
  >({
    data: {
      ids: data,
    },
  })(API_TYPE_SALE_ACTIVITY.DELETE);
};

export const getDartTable = (data: IRequestSaleActivityTableDraft) => {
  return post<
    IRequestSaleActivityTableDraft,
    ResponseWithPayload<ITypeDeclarationRequire>
  >({
    data,
  })(API_TYPE_SALE_ACTIVITY.GET_SEARCH);
};

//----------------------------------------------------------------

export const updateStatus = (data: IUpdateStatusDeclaration) => {
  return post<
    IUpdateStatusDeclaration,
    ResponseWithPayload<IUpdateStatusDeclaration>
  >({
    data,
  })(API_TYPE_SALE_ACTIVITY.UPDATE_STATUS);
};

export const getTable = (data: IRequestDeclarationTableRequest) => {
  return post<
    IRequestDeclarationTableRequest,
    ResponseWithPayload<ITypeDeclarationRequire>
  >({
    data,
  })(API_TYPE_SALE_ACTIVITY.GET_SEARCH);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile<BlobPart>({ data, timeout: 100000 })(
    API_TYPE_SALE_ACTIVITY.IMPORT
  );
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(
    API_TYPE_SALE_ACTIVITY.DOWNLOAD_EXAMPLE_FILE
  );
};
export const exportTableFile = (data: IRequestExportData) => {
  return exportFile<IRequestExportData, BlobPart>({ data })(
    API_TYPE_SALE_ACTIVITY.EXPORT
  );
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.TYPE_OF_DECLARATION,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
//----------------------------------------------------------------
//Get type Declaration
export const getListTypeDeclaration = () => {
  return get<ResponseWithPayload<ITypeDeclaration[]>>({})(
    API_TYPE_SALE_ACTIVITY.GET_ALL
  );
};
