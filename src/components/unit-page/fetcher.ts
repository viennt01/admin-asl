import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  LocationsRequire,
  RequestLocationType,
  UnitCreate,
  UnitDetailDataBody,
  UnitDetailType,
  UnitEdit,
} from './interface';
import { API_UNIT } from '@/fetcherAxios/endpoint';

export const getLocationsSearch = (data: RequestLocationType) => {
  return post<RequestLocationType, ResponseWithPayload<LocationsRequire>>({
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
