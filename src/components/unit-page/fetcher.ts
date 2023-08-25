import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  UnitsRequire,
  RequestUnit,
  UnitCreate,
  UnitDelete,
  UnitDetailDataBody,
  UnitDetailType,
  UnitEdit,
  RequestUnitTableDraft,
} from './interface';
import { API_UNIT } from '@/fetcherAxios/endpoint';

export const getUnitsSearch = (data: RequestUnit) => {
  return post<RequestUnit, ResponseWithPayload<UnitsRequire>>({
    data,
  })(API_UNIT.GET_UNIT_SEARCH);
};

export const getUnitDetail = (id: string) => {
  return post<UnitDetailDataBody, ResponseWithPayload<UnitDetailType>>({
    data: {
      id,
    },
  })(API_UNIT.GET_UNIT_DETAIL);
};

export const createUnit = (data: UnitCreate) => {
  return post<UnitCreate, ResponseWithPayload<UnitCreate>>({
    data,
  })(API_UNIT.CREATE_UNIT);
};

export const editUnit = (data: UnitEdit) => {
  return post<UnitEdit, ResponseWithPayload<UnitEdit>>({
    data,
  })(API_UNIT.EDIT_UNIT);
};

export const deleteUnit = (data: React.Key[]) => {
  return post<UnitDelete, ResponseWithPayload<UnitDelete>>({
    data: {
      ids: data,
    },
  })(API_UNIT.DELETE_UNIT);
};

export const getDartTable = (data: RequestUnitTableDraft) => {
  return post<RequestUnitTableDraft, ResponseWithPayload<UnitsRequire>>({
    data,
  })(API_UNIT.GET_UNIT_SEARCH);
};
