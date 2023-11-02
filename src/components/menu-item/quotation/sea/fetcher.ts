import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  ISeaQuotationRequire,
  RequestSeaQuotation,
  RequestTableDraft,
  ISeaQuotationCreate,
  SeaPricingDelete,
  ISeaQuotationDetailDataBody,
  ISeaPricingDetailType,
  ISeaQuotationEdit,
  UpdateStatus,
  RequestTableRequest,
  RequireLocation,
  RequireCommodity,
  RequireCurrency,
  RequireTypeContainer,
  RequireFeeGroup,
  RequestExportData,
} from './interface';
import {
  API_COMMODITY,
  API_CONTAINER_TYPE,
  API_CURRENCY,
  API_FEE_GROUP,
  API_LOCATION,
  API_SEA_QUOTATION,
} from '@/fetcherAxios/endpoint';

export const getSeaQuotationSearch = (data: RequestSeaQuotation) => {
  return post<RequestSeaQuotation, ResponseWithPayload<ISeaQuotationRequire>>({
    data,
  })(API_SEA_QUOTATION.GET_SEARCH);
};

export const getSeaQuotationDetail = (id: string) => {
  return post<
    ISeaQuotationDetailDataBody,
    ResponseWithPayload<ISeaPricingDetailType>
  >({
    data: {
      id,
    },
  })(API_SEA_QUOTATION.GET_DETAIL);
};

export const createSeaQuotation = (data: ISeaQuotationCreate) => {
  return post<ISeaQuotationCreate, ResponseWithPayload<ISeaQuotationCreate>>({
    data,
  })(API_SEA_QUOTATION.CREATE);
};

export const editSeaQuotation = (data: ISeaQuotationEdit) => {
  return post<ISeaQuotationEdit, ResponseWithPayload<ISeaQuotationEdit>>({
    data,
  })(API_SEA_QUOTATION.EDIT);
};

export const deleteSeaQuotation = (data: React.Key[]) => {
  return post<SeaPricingDelete, ResponseWithPayload<SeaPricingDelete>>({
    data: {
      ids: data,
    },
  })(API_SEA_QUOTATION.DELETE);
};

export const getDartTable = (data: RequestTableDraft) => {
  return post<RequestTableDraft, ResponseWithPayload<ISeaQuotationRequire>>({
    data,
  })(API_SEA_QUOTATION.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatus) => {
  return post<UpdateStatus, ResponseWithPayload<UpdateStatus>>({
    data,
  })(API_SEA_QUOTATION.UPDATE_STATUS);
};

export const getTable = (data: RequestTableRequest) => {
  return post<RequestTableRequest, ResponseWithPayload<ISeaQuotationRequire>>({
    data,
  })(API_SEA_QUOTATION.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_SEA_QUOTATION.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_SEA_QUOTATION.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(
    API_FEE_GROUP.EXPORT
  );
};
// Get all location
export const getAllLocation = () => {
  return get<ResponseWithPayload<RequireLocation[]>>({})(API_LOCATION.GET_ALL);
};

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

export const getAllFeeGroup = () => {
  return get<ResponseWithPayload<RequireFeeGroup[]>>({})(API_FEE_GROUP.GET_ALL);
};
