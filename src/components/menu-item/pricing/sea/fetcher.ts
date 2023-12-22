import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  SeaPricingRequire,
  RequestSeaPricing,
  SeaPricingCreate,
  SeaPricingDelete,
  SeaPricingDetailDataBody,
  SeaPricingDetailType,
  SeaPricingEdit,
  UpdateStatus,
  IDataLocation,
  RequireCommodity,
  RequireCurrency,
  RequireTypeContainer,
  RequireCreateQuotationWithPricing,
  RequirePartnerGroup,
  RequirePartner,
  RequestPartnerTable,
  TablePartner,
  IRequireLocation,
  RequestExportData,
  RequireVendor,
  PartnerData,
} from './interface';
import {
  API_COMMODITY,
  API_CONTAINER_TYPE,
  API_CURRENCY,
  API_LOCATION,
  API_PARTNER,
  API_SEA_PRICING,
  API_SEA_QUOTATION,
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

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatus) => {
  return post<UpdateStatus, ResponseWithPayload<UpdateStatus>>({
    data,
  })(API_SEA_PRICING.UPDATE_STATUS);
};

//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile<BlobPart>({ data, timeout: 100000 })(
    API_SEA_PRICING.IMPORT
  );
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_SEA_PRICING.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(
    API_SEA_PRICING.EXPORT
  );
};
// Get all location
export const getAllLocation = (data: IRequireLocation) => {
  return post<IRequireLocation, ResponseWithPayload<IDataLocation[]>>({ data })(
    API_LOCATION.GET_ALL
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
  })(API_SEA_QUOTATION.CREATE_WITH_PRICING);
};
export const getAllPartnerGroup = () => {
  return get<ResponseWithPayload<RequirePartnerGroup[]>>({})(
    API_PARTNER.GET_ALL_PARTNER_GROUP
  );
};
export const getAllPartner = () =>
  get<ResponseWithPayload<RequirePartner[]>>({})(API_PARTNER.GET_ALL_PARTNER);
export const getAllVendor = () =>
  get<ResponseWithPayload<RequireVendor[]>>({})(API_PARTNER.GET_ALL_VENDOR);
export const getAllCustomer = () =>
  get<ResponseWithPayload<RequireVendor[]>>({})(API_PARTNER.GET_ALL_CUSTOMER);
// Get table partner
export const getTablePartnerId = (data: RequestPartnerTable) => {
  return post<RequestPartnerTable, ResponseWithPayload<TablePartner[]>>({
    data,
  })(API_PARTNER.GET_ALL_PARTNER_BY_IDS);
};
export const getUserPartnerId = (data: RequestPartnerTable) => {
  return post<RequestPartnerTable, ResponseWithPayload<PartnerData[]>>({
    data,
  })(API_PARTNER.GET_ALL_USER_BY_PARTNER_IDS);
};
export const getTablePartnerByGroup = (data: RequestPartnerTable) => {
  return post<RequestPartnerTable, ResponseWithPayload<TablePartner[]>>({
    data,
  })(API_PARTNER.GET_ALL_PARTNER_BY_GROUPS_ID);
};
