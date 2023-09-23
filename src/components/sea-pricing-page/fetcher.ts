import {
  ResponseWithPayload,
  downloadFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  SeaPricingRequire,
  RequestSeaPricing,
  RequestTableDraft,
  SeaPricingCreate,
  SeaPricingDelete,
  SeaPricingDetailDataBody,
  SeaPricingDetailType,
  SeaPricingEdit,
  UpdateStatus,
  RequestTableRequest,
  RequireLocation,
  RequireCommodity,
  RequireCurrency,
  RequireTypeContainer,
} from './interface';
import {
  API_COMMODITY,
  API_CONTAINER_TYPE,
  API_CURRENCY,
  API_LOCATION,
  API_SEA_PRICING,
} from '@/fetcherAxios/endpoint';

export const getSeaPricingSearch = (data: RequestSeaPricing) => {
  return post<RequestSeaPricing, ResponseWithPayload<SeaPricingRequire>>({
    data,
  })(API_SEA_PRICING.GET_SEARCH);
};

export const getSeaPricingDetail = (id: string) => {
  return post<
    SeaPricingDetailDataBody,
    ResponseWithPayload<SeaPricingDetailType>
  >({
    data: {
      id,
    },
  })(API_SEA_PRICING.GET_DETAIL);
};

export const createSeaPricing = (data: SeaPricingCreate) => {
  return post<SeaPricingCreate, ResponseWithPayload<SeaPricingCreate>>({
    data,
  })(API_SEA_PRICING.CREATE);
};

export const editSeaPricing = (data: SeaPricingEdit) => {
  return post<SeaPricingEdit, ResponseWithPayload<SeaPricingEdit>>({
    data,
  })(API_SEA_PRICING.EDIT);
};

export const deleteSeaPricing = (data: React.Key[]) => {
  return post<SeaPricingDelete, ResponseWithPayload<SeaPricingDelete>>({
    data: {
      ids: data,
    },
  })(API_SEA_PRICING.DELETE);
};

export const getDartTable = (data: RequestTableDraft) => {
  return post<RequestTableDraft, ResponseWithPayload<SeaPricingRequire>>({
    data,
  })(API_SEA_PRICING.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatus) => {
  return post<UpdateStatus, ResponseWithPayload<UpdateStatus>>({
    data,
  })(API_SEA_PRICING.UPDATE_STATUS);
};

export const getTable = (data: RequestTableRequest) => {
  return post<RequestTableRequest, ResponseWithPayload<SeaPricingRequire>>({
    data,
  })(API_SEA_PRICING.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_SEA_PRICING.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_SEA_PRICING.DOWNLOAD_EXAMPLE_FILE);
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
