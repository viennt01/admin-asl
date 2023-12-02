import {
  ResponseWithPayload,
  downloadFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  ICustomPricingRequire,
  RequestSeaPricing,
  RequestTableDraft,
  ICustomPricingCreate,
  SeaPricingDelete,
  ICustomPricingDetailDataBody,
  ICustomPricingDetailType,
  ICustomPricingEdit,
  UpdateStatus,
  RequestTableRequest,
  RequireCommodity,
  RequireCurrency,
  RequireTypeContainer,
  RequireCreateQuotationWithPricing,
  RequirePartnerGroup,
  RequirePartner,
  RequestPartnerTable,
  TablePartner,
  RequireColorRouter,
} from './interface';
import {
  API_COMMODITY,
  API_CONTAINER_TYPE,
  API_CURRENCY,
  API_PARTNER,
  API_CUSTOM_PRICING,
  API_CUSTOMS_QUOTATION,
  API_COLOR_ROUTER,
} from '@/fetcherAxios/endpoint';

export const getCustomPricingSearch = (data: RequestSeaPricing) => {
  return post<RequestSeaPricing, ResponseWithPayload<ICustomPricingRequire>>({
    data,
  })(API_CUSTOM_PRICING.GET_SEARCH);
};

export const getCustomPricingDetail = (id: string) => {
  return post<
    ICustomPricingDetailDataBody,
    ResponseWithPayload<ICustomPricingDetailType>
  >({
    data: {
      id,
    },
  })(API_CUSTOM_PRICING.GET_DETAIL);
};

export const createCustomPricing = (data: ICustomPricingCreate) => {
  return post<ICustomPricingCreate, ResponseWithPayload<ICustomPricingCreate>>({
    data,
  })(API_CUSTOM_PRICING.CREATE);
};

export const editCustomPricing = (data: ICustomPricingEdit) => {
  return post<ICustomPricingEdit, ResponseWithPayload<ICustomPricingEdit>>({
    data,
  })(API_CUSTOM_PRICING.EDIT);
};

export const deleteCustomPricing = (data: React.Key[]) => {
  return post<SeaPricingDelete, ResponseWithPayload<SeaPricingDelete>>({
    data: {
      ids: data,
    },
  })(API_CUSTOM_PRICING.DELETE);
};

export const getDartTable = (data: RequestTableDraft) => {
  return post<RequestTableDraft, ResponseWithPayload<ICustomPricingRequire>>({
    data,
  })(API_CUSTOM_PRICING.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatus) => {
  return post<UpdateStatus, ResponseWithPayload<UpdateStatus>>({
    data,
  })(API_CUSTOM_PRICING.UPDATE_STATUS);
};

export const getTable = (data: RequestTableRequest) => {
  return post<RequestTableRequest, ResponseWithPayload<ICustomPricingRequire>>({
    data,
  })(API_CUSTOM_PRICING.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_CUSTOM_PRICING.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_CUSTOM_PRICING.DOWNLOAD_EXAMPLE_FILE);
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

//----------------------------------------------------------------
// create quotation with pricing
export const createQuotationWithPricing = (
  data: RequireCreateQuotationWithPricing
) => {
  return post<
    RequireCreateQuotationWithPricing,
    ResponseWithPayload<RequireCreateQuotationWithPricing>
  >({
    data,
  })(API_CUSTOMS_QUOTATION.CREATE_WITH_PRICING);
};
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
// Get all color router
export const getAllColorRouter = () =>
  get<ResponseWithPayload<RequireColorRouter[]>>({})(API_COLOR_ROUTER.GET_ALL);
