import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  ICustomQuotationRequire,
  RequestSeaQuotation,
  RequestTableDraft,
  ICustomQuotationCreate,
  SeaQuotationDelete,
  ICustomQuotationDetailDataBody,
  ICustomQuotationDetailType,
  ICustomQuotationEdit,
  UpdateStatus,
  RequestTableRequest,
  RequireCommodity,
  RequireCurrency,
  RequireTypeContainer,
  RequirePartnerGroup,
  RequirePartner,
  RequestPartnerTable,
  TablePartner,
  RequestExportData,
} from './interface';
import {
  API_COMMODITY,
  API_CONTAINER_TYPE,
  API_CURRENCY,
  API_PARTNER,
  API_CUSTOMS_QUOTATION,
} from '@/fetcherAxios/endpoint';

export const getCustomQuotationSearch = (data: RequestSeaQuotation) => {
  return post<
    RequestSeaQuotation,
    ResponseWithPayload<ICustomQuotationRequire>
  >({
    data,
  })(API_CUSTOMS_QUOTATION.GET_SEARCH);
};

export const getCustomQuotationDetail = (id: string) => {
  return post<
    ICustomQuotationDetailDataBody,
    ResponseWithPayload<ICustomQuotationDetailType>
  >({
    data: {
      id,
    },
  })(API_CUSTOMS_QUOTATION.GET_DETAIL);
};

export const createCustomQuotation = (data: ICustomQuotationCreate) => {
  return post<
    ICustomQuotationCreate,
    ResponseWithPayload<ICustomQuotationCreate>
  >({
    data,
  })(API_CUSTOMS_QUOTATION.CREATE);
};

export const editCustomQuotation = (data: ICustomQuotationEdit) => {
  return post<ICustomQuotationEdit, ResponseWithPayload<ICustomQuotationEdit>>({
    data,
  })(API_CUSTOMS_QUOTATION.EDIT);
};

export const deleteCustomQuotation = (data: React.Key[]) => {
  return post<SeaQuotationDelete, ResponseWithPayload<SeaQuotationDelete>>({
    data: {
      ids: data,
    },
  })(API_CUSTOMS_QUOTATION.DELETE);
};

export const getDartTable = (data: RequestTableDraft) => {
  return post<RequestTableDraft, ResponseWithPayload<ICustomQuotationRequire>>({
    data,
  })(API_CUSTOMS_QUOTATION.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatus) => {
  return post<UpdateStatus, ResponseWithPayload<UpdateStatus>>({
    data,
  })(API_CUSTOMS_QUOTATION.UPDATE_STATUS);
};

export const getTable = (data: RequestTableRequest) => {
  return post<
    RequestTableRequest,
    ResponseWithPayload<ICustomQuotationRequire>
  >({
    data,
  })(API_CUSTOMS_QUOTATION.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile<BlobPart>({ data, timeout: 10000 })(
    API_CUSTOMS_QUOTATION.IMPORT
  );
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(
    API_CUSTOMS_QUOTATION.DOWNLOAD_EXAMPLE_FILE
  );
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(
    API_CUSTOMS_QUOTATION.EXPORT
  );
};
//----------------------------------------------------------------
export const getAllCommodity = () => {
  return get<ResponseWithPayload<RequireCommodity[]>>({})(
    API_COMMODITY.GET_ALL
  );
};

export const getAllCurrency = () => {
  return get<ResponseWithPayload<RequireCurrency[]>>({})(API_CURRENCY.GET_ALL);
};

export const getAllContainerType = () => {
  return get<ResponseWithPayload<RequireTypeContainer[]>>({})(
    API_CONTAINER_TYPE.GET_ALL
  );
};

//----------------------------------------------------------------
export const getAllPartnerGroup = () => {
  return get<ResponseWithPayload<RequirePartnerGroup[]>>({})(
    API_PARTNER.GET_ALL_PARTNER_GROUP
  );
};
export const getAllPartner = () =>
  get<ResponseWithPayload<RequirePartner[]>>({})(API_PARTNER.GET_ALL_PARTNER);
// Get table partner
export const getTablePartner = (data: RequestPartnerTable) => {
  return post<RequestPartnerTable, ResponseWithPayload<TablePartner[]>>({
    data,
  })(API_PARTNER.GET_ALL_PARTNER_BY_IDS);
};
