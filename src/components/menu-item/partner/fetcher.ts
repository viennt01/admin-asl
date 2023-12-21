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
  IPartnerCreate,
  IPartnerDelete,
  IPartnerDetailDataBody,
  IPartnerDetailType,
  IPartnerEdit,
  UpdateStatusUnit,
  RequestUnitTableRequest,
  RequestExportData,
  ITypeUnit,
  IGenderPartner,
  IRequestAddUserPartner,
  IDataChartPricing,
  IRequestChartPricing,
} from './interface';
import {
  API_COLUMN,
  API_TYPE_UNIT,
  API_PARTNER,
  API_GENDER,
  API_CHART,
} from '@/fetcherAxios/endpoint';
import {
  ColumnTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';

export const getUnitSearch = (data: IRequestPartnerType) => {
  return post<IRequestPartnerType, ResponseWithPayload<IPartnerRequire>>({
    data,
  })(API_PARTNER.GET_SEARCH);
};

export const getUnitDetail = (id: string) => {
  return post<IPartnerDetailDataBody, ResponseWithPayload<IPartnerDetailType>>({
    data: {
      id,
    },
  })(API_PARTNER.GET_DETAIL);
};

export const createUnit = (data: IPartnerCreate) => {
  return post<IPartnerCreate, ResponseWithPayload<IPartnerCreate>>({
    data,
  })(API_PARTNER.CREATE);
};

export const editUnit = (data: IPartnerEdit) => {
  return post<IPartnerEdit, ResponseWithPayload<IPartnerEdit>>({
    data,
  })(API_PARTNER.EDIT);
};

export const deleteUnit = (data: React.Key[]) => {
  return post<IPartnerDelete, ResponseWithPayload<IPartnerDelete>>({
    data: {
      ids: data,
    },
  })(API_PARTNER.DELETE);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusUnit) => {
  return post<UpdateStatusUnit, ResponseWithPayload<UpdateStatusUnit>>({
    data,
  })(API_PARTNER.UPDATE_STATUS);
};

export const getTable = (data: RequestUnitTableRequest) => {
  return post<RequestUnitTableRequest, ResponseWithPayload<IPartnerRequire>>({
    data,
  })(API_PARTNER.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile<BlobPart>({ data, timeout: 100000 })(API_PARTNER.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_PARTNER.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(API_PARTNER.EXPORT);
};
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.PARTNER,
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
//----------------------------------------------------------------
//Get type unit
export const getListGender = () => {
  return get<ResponseWithPayload<IGenderPartner[]>>({})(API_GENDER.GET_ALL);
};
//----------------------------------------------------------------
//add user partner
export const addUserPartner = (data: IRequestAddUserPartner) => {
  return post<IRequestAddUserPartner, ResponseWithPayload<string>>({
    data,
  })(API_PARTNER.ADD_USER_PARTNER);
};
//add chart pricing
export const getChartPricing = (data: IRequestChartPricing) => {
  return post<IRequestChartPricing, ResponseWithPayload<IDataChartPricing[]>>({
    data,
  })(API_CHART.GET_CHART_PRICING);
};
