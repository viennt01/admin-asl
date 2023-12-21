import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  ITruckingQuotationRequire,
  RequestSeaQuotation,
  RequestTableDraft,
  ITruckQuotationCreate,
  SeaPricingDelete,
  ISeaQuotationDetailDataBody,
  ITruckingPricingDetailType,
  ITruckQuotationEdit,
  IUpdateStatus,
  RequestTableRequest,
  RequireCommodity,
  RequireCurrency,
  RequireTypeContainer,
  IRequestExportData,
} from './interface';
import {
  API_COMMODITY,
  API_CONTAINER_TYPE,
  API_CURRENCY,
  API_TRUCKING_QUOTATION,
} from '@/fetcherAxios/endpoint';

export const getSeaQuotationSearch = (data: RequestSeaQuotation) => {
  return post<
    RequestSeaQuotation,
    ResponseWithPayload<ITruckingQuotationRequire>
  >({
    data,
  })(API_TRUCKING_QUOTATION.GET_SEARCH);
};

export const getSeaQuotationDetail = (id: string) => {
  return post<
    ISeaQuotationDetailDataBody,
    ResponseWithPayload<ITruckingPricingDetailType>
  >({
    data: {
      id,
    },
  })(API_TRUCKING_QUOTATION.GET_DETAIL);
};

export const createSeaQuotation = (data: ITruckQuotationCreate) => {
  return post<
    ITruckQuotationCreate,
    ResponseWithPayload<ITruckQuotationCreate>
  >({
    data,
  })(API_TRUCKING_QUOTATION.CREATE);
};

export const editSeaQuotation = (data: ITruckQuotationEdit) => {
  return post<ITruckQuotationEdit, ResponseWithPayload<ITruckQuotationEdit>>({
    data,
  })(API_TRUCKING_QUOTATION.EDIT);
};

export const deleteSeaQuotation = (data: React.Key[]) => {
  return post<SeaPricingDelete, ResponseWithPayload<SeaPricingDelete>>({
    data: {
      ids: data,
    },
  })(API_TRUCKING_QUOTATION.DELETE);
};

export const getDartTable = (data: RequestTableDraft) => {
  return post<
    RequestTableDraft,
    ResponseWithPayload<ITruckingQuotationRequire>
  >({
    data,
  })(API_TRUCKING_QUOTATION.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: IUpdateStatus) => {
  return post<IUpdateStatus, ResponseWithPayload<IUpdateStatus>>({
    data,
  })(API_TRUCKING_QUOTATION.UPDATE_STATUS);
};

export const getTable = (data: RequestTableRequest) => {
  return post<
    RequestTableRequest,
    ResponseWithPayload<ITruckingQuotationRequire>
  >({
    data,
  })(API_TRUCKING_QUOTATION.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile<BlobPart>({ data, timeout: 100000 })(
    API_TRUCKING_QUOTATION.IMPORT
  );
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(
    API_TRUCKING_QUOTATION.DOWNLOAD_EXAMPLE_FILE
  );
};
export const exportTableFile = (data: IRequestExportData) => {
  return exportFile<IRequestExportData, BlobPart>({ data })(
    API_TRUCKING_QUOTATION.EXPORT
  );
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
