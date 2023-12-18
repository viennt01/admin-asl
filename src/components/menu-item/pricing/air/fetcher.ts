import {
  ResponseWithPayload,
  downloadFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  AirPricingRequire,
  RequestAirPricing,
  RequestTableDraft,
  AirPricingCreate,
  AirPricingDelete,
  AirPricingDetailDataBody,
  AirPricingDetailType,
  AirPricingEdit,
  UpdateStatus,
  RequestTableRequest,
  RequireCommodity,
  RequireCurrency,
  RequireTypeLoadCapacity,
  IRequireTypeLoadCapacity,
} from './interface';
import {
  API_COMMODITY,
  API_CURRENCY,
  API_AIR_PRICING,
  API_LOAD_CAPACITY,
} from '@/fetcherAxios/endpoint';

export const getAirPricingSearch = (data: RequestAirPricing) => {
  return post<RequestAirPricing, ResponseWithPayload<AirPricingRequire>>({
    data,
  })(API_AIR_PRICING.GET_SEARCH);
};

export const getAirPricingDetail = (id: string) => {
  return post<
    AirPricingDetailDataBody,
    ResponseWithPayload<AirPricingDetailType>
  >({
    data: {
      id,
    },
  })(API_AIR_PRICING.GET_DETAIL);
};

export const createAirPricing = (data: AirPricingCreate) => {
  return post<AirPricingCreate, ResponseWithPayload<AirPricingCreate>>({
    data,
  })(API_AIR_PRICING.CREATE);
};

export const editAirPricing = (data: AirPricingEdit) => {
  return post<AirPricingEdit, ResponseWithPayload<AirPricingEdit>>({
    data,
  })(API_AIR_PRICING.EDIT);
};

export const deleteAirPricing = (data: React.Key[]) => {
  return post<AirPricingDelete, ResponseWithPayload<AirPricingDelete>>({
    data: {
      ids: data,
    },
  })(API_AIR_PRICING.DELETE);
};

export const getDartTable = (data: RequestTableDraft) => {
  return post<RequestTableDraft, ResponseWithPayload<AirPricingRequire>>({
    data,
  })(API_AIR_PRICING.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatus) => {
  return post<UpdateStatus, ResponseWithPayload<UpdateStatus>>({
    data,
  })(API_AIR_PRICING.UPDATE_STATUS);
};

export const getTable = (data: RequestTableRequest) => {
  return post<RequestTableRequest, ResponseWithPayload<AirPricingRequire>>({
    data,
  })(API_AIR_PRICING.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile<BlobPart>({ data, timeout: 10000 })(API_AIR_PRICING.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_AIR_PRICING.DOWNLOAD_EXAMPLE_FILE);
};

export const getAllCommodity = () => {
  return get<ResponseWithPayload<RequireCommodity[]>>({})(
    API_COMMODITY.GET_ALL
  );
};

export const getAllCurrency = () => {
  return get<ResponseWithPayload<RequireCurrency[]>>({})(API_CURRENCY.GET_ALL);
};

export const getAllTypeLoadCapacity = (data: IRequireTypeLoadCapacity) => {
  return post<
    IRequireTypeLoadCapacity,
    ResponseWithPayload<RequireTypeLoadCapacity[]>
  >({ data })(API_LOAD_CAPACITY.GET_ALL);
};
