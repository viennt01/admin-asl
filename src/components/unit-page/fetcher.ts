import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  UnitsRequire,
  RequestLocationType,
  RequestUnitTableDraft,
  UnitCreate,
  UnitDelete,
  UnitDetailDataBody,
  UnitDetailType,
  UnitEdit,
  UpdateStatusUnit,
  RequestUnitTableRequest,
} from './interface';
import { API_UNIT } from '@/fetcherAxios/endpoint';

export const getLocationsSearch = (data: RequestLocationType) => {
  return post<RequestLocationType, ResponseWithPayload<UnitsRequire>>({
    data,
  })(API_UNIT.GET_SEARCH);
};

export const getUnitDetail = (id: string) => {
  return post<UnitDetailDataBody, ResponseWithPayload<UnitDetailType>>({
    data: {
      id,
    },
  })(API_UNIT.GET_DETAIL);
};

export const createUnit = (data: UnitCreate) => {
  return post<UnitCreate, ResponseWithPayload<UnitCreate>>({
    data,
  })(API_UNIT.CREATE);
};

export const editUnit = (data: UnitEdit) => {
  return post<UnitEdit, ResponseWithPayload<UnitEdit>>({
    data,
  })(API_UNIT.EDIT);
};

export const deleteUnit = (data: React.Key[]) => {
  return post<UnitDelete, ResponseWithPayload<UnitDelete>>({
    data: {
      ids: data,
    },
  })(API_UNIT.DELETE);
};

export const getDartTable = (data: RequestUnitTableDraft) => {
  return post<RequestUnitTableDraft, ResponseWithPayload<UnitsRequire>>({
    data,
  })(API_UNIT.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusUnit) => {
  return post<UpdateStatusUnit, ResponseWithPayload<UpdateStatusUnit>>({
    data,
  })(API_UNIT.UPDATE_STATUS);
};

export const getTable = (data: RequestUnitTableRequest) => {
  return post<RequestUnitTableRequest, ResponseWithPayload<UnitsRequire>>({
    data,
  })(API_UNIT.GET_REQUEST);
};
