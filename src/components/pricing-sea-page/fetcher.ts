import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  SeaPricesRequire,
  RequestPricingType,
  RequestUnitTableDraft,
  SeaPricingCreate,
  SeaPricingDelete,
  PricingDetailDataBody,
  SeaPricingDetail,
  SeaPricingEdit,
  UpdateStatusUnit,
  RequestUnitTableRequest,
} from './interface';
import { API_SEA_PRICING } from '@/fetcherAxios/endpoint';

export const getSeaPricingSearch = (data: RequestPricingType) => {
  return post<RequestPricingType, ResponseWithPayload<SeaPricesRequire>>({
    data,
  })(API_SEA_PRICING.GET_SEARCH);
};

export const getSeaPricingDetail = (id: string) => {
  return post<PricingDetailDataBody, ResponseWithPayload<SeaPricingDetail>>({
    data: {
      id,
    },
  })(API_SEA_PRICING.GET_DETAIL);
};

export const createUnit = (data: SeaPricingCreate) => {
  return post<SeaPricingCreate, ResponseWithPayload<SeaPricingCreate>>({
    data,
  })(API_SEA_PRICING.CREATE);
};

export const editUnit = (data: SeaPricingEdit) => {
  return post<SeaPricingEdit, ResponseWithPayload<SeaPricingEdit>>({
    data,
  })(API_SEA_PRICING.EDIT);
};

export const deleteUnit = (data: React.Key[]) => {
  return post<SeaPricingDelete, ResponseWithPayload<SeaPricingDelete>>({
    data: {
      ids: data,
    },
  })(API_SEA_PRICING.DELETE);
};

export const getDartTable = (data: RequestUnitTableDraft) => {
  return post<RequestUnitTableDraft, ResponseWithPayload<SeaPricesRequire>>({
    data,
  })(API_SEA_PRICING.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusUnit) => {
  return post<UpdateStatusUnit, ResponseWithPayload<UpdateStatusUnit>>({
    data,
  })(API_SEA_PRICING.UPDATE_STATUS);
};

export const getTable = (data: RequestUnitTableRequest) => {
  return post<RequestUnitTableRequest, ResponseWithPayload<SeaPricesRequire>>({
    data,
  })(API_SEA_PRICING.GET_REQUEST);
};
