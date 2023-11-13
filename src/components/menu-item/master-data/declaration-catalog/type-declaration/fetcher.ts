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
  IRequestDeclarationTableDraft,
  ITypeDeclarationCreate,
  ITypeDeclarationDelete,
  ITypeDeclarationDetailDataBody,
  ITypeDeclarationDetailType,
  ITypeDeclarationEdit,
  IUpdateStatusDeclaration,
  IRequestDeclarationTableRequest,
  IRequestExportData,
  ITypeDeclaration,
  ITypeTransaction,
} from './interface';
import {
  API_COLUMN,
  API_TRANSACTION_TYPE,
  API_TYPE_DECLARATION,
} from '@/fetcherAxios/endpoint';
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
  })(API_TYPE_DECLARATION.GET_SEARCH);
};

export const getDeclarationDetail = (id: string) => {
  return post<
    ITypeDeclarationDetailDataBody,
    ResponseWithPayload<ITypeDeclarationDetailType>
  >({
    data: {
      id,
    },
  })(API_TYPE_DECLARATION.GET_DETAIL);
};

export const createDeclaration = (data: ITypeDeclarationCreate) => {
  return post<
    ITypeDeclarationCreate,
    ResponseWithPayload<ITypeDeclarationCreate>
  >({
    data,
  })(API_TYPE_DECLARATION.CREATE);
};

export const editDeclaration = (data: ITypeDeclarationEdit) => {
  return post<ITypeDeclarationEdit, ResponseWithPayload<ITypeDeclarationEdit>>({
    data,
  })(API_TYPE_DECLARATION.EDIT);
};

export const deleteDeclaration = (data: React.Key[]) => {
  return post<
    ITypeDeclarationDelete,
    ResponseWithPayload<ITypeDeclarationDelete>
  >({
    data: {
      ids: data,
    },
  })(API_TYPE_DECLARATION.DELETE);
};

export const getDartTable = (data: IRequestDeclarationTableDraft) => {
  return post<
    IRequestDeclarationTableDraft,
    ResponseWithPayload<ITypeDeclarationRequire>
  >({
    data,
  })(API_TYPE_DECLARATION.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: IUpdateStatusDeclaration) => {
  return post<
    IUpdateStatusDeclaration,
    ResponseWithPayload<IUpdateStatusDeclaration>
  >({
    data,
  })(API_TYPE_DECLARATION.UPDATE_STATUS);
};

export const getTable = (data: IRequestDeclarationTableRequest) => {
  return post<
    IRequestDeclarationTableRequest,
    ResponseWithPayload<ITypeDeclarationRequire>
  >({
    data,
  })(API_TYPE_DECLARATION.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_TYPE_DECLARATION.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_TYPE_DECLARATION.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: IRequestExportData) => {
  return exportFile<IRequestExportData, BlobPart>({ data })(
    API_TYPE_DECLARATION.EXPORT
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
    API_TYPE_DECLARATION.GET_ALL
  );
};
//----------------------------------------------------------------
//Get type Transaction
export const getListTypeTransaction = () => {
  return get<ResponseWithPayload<ITypeTransaction[]>>({})(
    API_TRANSACTION_TYPE.GET_ALL
  );
};
