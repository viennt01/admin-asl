import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  get,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  IAirQuotationRequire,
  IRequestAirQuotation,
  IAirQuotationCreate,
  IAirQuotationDelete,
  IAirQuotationDetailDataBody,
  IAirQuotationDetailType,
  IAirQuotationEdit,
  IUpdateStatus,
  IRequireCommodity,
  RequireCurrency,
  RequireTypeLoadCapacity,
  IRequireTypeLoadCapacity,
} from './interface';
import {
  API_COMMODITY,
  API_CURRENCY,
  API_AIR_QUOTATION,
  API_LOAD_CAPACITY,
} from '@/fetcherAxios/endpoint';
import { RequestExportData } from '../custom/interface';

export const getAirPricingSearch = (data: IRequestAirQuotation) => {
  return post<IRequestAirQuotation, ResponseWithPayload<IAirQuotationRequire>>({
    data,
  })(API_AIR_QUOTATION.GET_SEARCH);
};

export const getAirPricingDetail = (id: string) => {
  return post<
    IAirQuotationDetailDataBody,
    ResponseWithPayload<IAirQuotationDetailType>
  >({
    data: {
      id,
    },
  })(API_AIR_QUOTATION.GET_DETAIL);
};

export const createAirPricing = (data: IAirQuotationCreate) => {
  return post<IAirQuotationCreate, ResponseWithPayload<IAirQuotationCreate>>({
    data,
  })(API_AIR_QUOTATION.CREATE);
};

export const editAirPricing = (data: IAirQuotationEdit) => {
  return post<IAirQuotationEdit, ResponseWithPayload<IAirQuotationEdit>>({
    data,
  })(API_AIR_QUOTATION.EDIT);
};

export const deleteAirPricing = (data: React.Key[]) => {
  return post<IAirQuotationDelete, ResponseWithPayload<IAirQuotationDelete>>({
    data: {
      ids: data,
    },
  })(API_AIR_QUOTATION.DELETE);
};

//----------------------------------------------------------------

export const updateStatus = (data: IUpdateStatus) => {
  return post<IUpdateStatus, ResponseWithPayload<IUpdateStatus>>({
    data,
  })(API_AIR_QUOTATION.UPDATE_STATUS);
};

//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile<BlobPart>({ data, timeout: 100000 })(
    API_AIR_QUOTATION.IMPORT
  );
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_AIR_QUOTATION.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(
    API_AIR_QUOTATION.EXPORT
  );
};
export const getAllCommodity = () => {
  return get<ResponseWithPayload<IRequireCommodity[]>>({})(
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
