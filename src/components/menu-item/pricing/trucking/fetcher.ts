import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  ITruckingRequire,
  IRequestTruckingPricing,
  RequestTableDraft,
  ITruckingPricingCreate,
  SeaPricingDelete,
  SeaPricingDetailDataBody,
  ITruckingDetailType,
  SeaPricingEdit,
  IUpdateStatus,
  IRequestTableRequest,
  RequireCommodity,
  RequireCurrency,
  RequireTypeContainer,
  RequireCreateQuotationWithPricing,
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
  API_TRUCKING_PRICING,
  API_TRUCKING_QUOTATION,
  API_COLUMN,
  API_LOAD_CAPACITY,
} from '@/fetcherAxios/endpoint';
import {
  ColumnTable,
  TABLE_NAME,
} from '@/components/commons/table/table-default';
import {
  IRequireTypeLoadCapacity,
  RequireTypeLoadCapacity,
} from '../air/interface';

export const getTruckPricingSearch = (data: IRequestTruckingPricing) => {
  return post<IRequestTruckingPricing, ResponseWithPayload<ITruckingRequire>>({
    data,
  })(API_TRUCKING_PRICING.GET_SEARCH);
};

export const getTruckPricingDetail = (id: string) => {
  return post<
    SeaPricingDetailDataBody,
    ResponseWithPayload<ITruckingDetailType>
  >({
    data: {
      id,
    },
  })(API_TRUCKING_PRICING.GET_DETAIL);
};

export const createTruckPricing = (data: ITruckingPricingCreate) => {
  return post<
    ITruckingPricingCreate,
    ResponseWithPayload<ITruckingPricingCreate>
  >({
    data,
  })(API_TRUCKING_PRICING.CREATE);
};

export const editTruckPricing = (data: SeaPricingEdit) => {
  return post<SeaPricingEdit, ResponseWithPayload<SeaPricingEdit>>({
    data,
  })(API_TRUCKING_PRICING.EDIT);
};

export const deleteTruckPricing = (data: React.Key[]) => {
  return post<SeaPricingDelete, ResponseWithPayload<SeaPricingDelete>>({
    data: {
      ids: data,
    },
  })(API_TRUCKING_PRICING.DELETE);
};

export const getDartTable = (data: RequestTableDraft) => {
  return post<RequestTableDraft, ResponseWithPayload<ITruckingRequire>>({
    data,
  })(API_TRUCKING_PRICING.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: IUpdateStatus) => {
  return post<IUpdateStatus, ResponseWithPayload<IUpdateStatus>>({
    data,
  })(API_TRUCKING_PRICING.UPDATE_STATUS);
};

export const getTable = (data: IRequestTableRequest) => {
  return post<IRequestTableRequest, ResponseWithPayload<ITruckingRequire>>({
    data,
  })(API_TRUCKING_PRICING.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_TRUCKING_PRICING.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_TRUCKING_PRICING.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(
    API_TRUCKING_PRICING.EXPORT
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

export const getAllLoadCapacity = (data: IRequireTypeLoadCapacity) => {
  return post<
    IRequireTypeLoadCapacity,
    ResponseWithPayload<RequireTypeLoadCapacity[]>
  >({ data })(API_LOAD_CAPACITY.GET_ALL);
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
  })(API_TRUCKING_QUOTATION.CREATE_WITH_PRICING);
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
//----------------------------------------------------------------
//Get format column
export const getColumnTable = () => {
  return post<{ tableName: string }, ResponseWithPayload<ColumnTable>>({
    data: {
      tableName: TABLE_NAME.TRUCKING_PRICING,
    },
  })(API_COLUMN.GET_COLUMN_TABLE_NAME);
};
export const updateColumnTable = (data: ColumnTable) => {
  return post<ColumnTable, ResponseWithPayload<ColumnTable>>({
    data,
  })(API_COLUMN.UPDATE_COLUMN_TABLE_NAME);
};
