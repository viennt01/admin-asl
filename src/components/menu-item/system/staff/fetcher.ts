import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  IPartnerRequire,
  IRequestPartnerType,
  RequestUnitTableDraft,
  IPartnerCreate,
  IPartnerDelete,
  IPartnerDetailDataBody,
  IPartnerDetailType,
  IPartnerEdit,
  UpdateStatusUnit,
  RequestUnitTableRequest,
  RequestExportData,
  IGenderPartner,
  ILanguage,
  IRoleStaff,
  IAllPartner,
} from './interface';
import {
  API_COLUMN,
  API_STAFF,
  API_GENDER,
  API_LANGUAGE,
  API_ROLE,
} from '@/fetcherAxios/endpoint';
import {
  ColumnTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';

export const getStaffSearch = (data: IRequestPartnerType) => {
  return post<IRequestPartnerType, ResponseWithPayload<IPartnerRequire>>({
    data,
  })(API_STAFF.GET_SEARCH);
};

export const getStaffDetail = (id: string) => {
  return post<IPartnerDetailDataBody, ResponseWithPayload<IPartnerDetailType>>({
    data: {
      id,
    },
  })(API_STAFF.GET_DETAIL);
};

export const createStaff = (data: IPartnerCreate) => {
  return post<IPartnerCreate, ResponseWithPayload<IPartnerCreate>>({
    data,
  })(API_STAFF.CREATE);
};

export const editStaff = (data: IPartnerEdit) => {
  return post<IPartnerEdit, ResponseWithPayload<IPartnerEdit>>({
    data,
  })(API_STAFF.EDIT);
};

export const deleteStaff = (data: React.Key[]) => {
  return post<IPartnerDelete, ResponseWithPayload<IPartnerDelete>>({
    data: {
      ids: data,
    },
  })(API_STAFF.DELETE);
};

export const getDartTable = (data: RequestUnitTableDraft) => {
  return post<RequestUnitTableDraft, ResponseWithPayload<IPartnerRequire>>({
    data,
  })(API_STAFF.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusUnit) => {
  return post<UpdateStatusUnit, ResponseWithPayload<UpdateStatusUnit>>({
    data,
  })(API_STAFF.UPDATE_STATUS);
};

export const getTable = (data: RequestUnitTableRequest) => {
  return post<RequestUnitTableRequest, ResponseWithPayload<IPartnerRequire>>({
    data,
  })(API_STAFF.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_STAFF.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_STAFF.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(API_STAFF.EXPORT);
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.STAFF,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
//----------------------------------------------------------------
//Get Gender
export const getListGender = () => {
  return get<ResponseWithPayload<IGenderPartner[]>>({})(API_GENDER.GET_ALL);
};
//----------------------------------------------------------------
//Get Language
export const getListLanguage = () => {
  return get<ResponseWithPayload<ILanguage[]>>({})(API_LANGUAGE.GET_ALL);
};
//----------------------------------------------------------------
//Get Language
export const getListRoleStaff = () => {
  return get<ResponseWithPayload<IRoleStaff[]>>({})(
    API_ROLE.GET_ALL_ROLE_STAFF
  );
};
//----------------------------------------------------------------
//Get list staff
export const getListStaff = () => {
  return get<ResponseWithPayload<IAllPartner[]>>({})(API_STAFF.GET_ALL);
};
