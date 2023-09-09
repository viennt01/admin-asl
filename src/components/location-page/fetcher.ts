import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  LocationTypeRequire,
  RequestLocationTypeType,
  RequestLocationTypeTableDraft,
  LocationTypeCreate,
  LocationTypeDelete,
  LocationTypeDetailDataBody,
  LocationTypeDetailType,
  LocationTypeEdit,
  UpdateStatusLocation,
  RequestLocationTypeTableRequest,
} from './interface';
import { API_LOCATION } from '@/fetcherAxios/endpoint';

export const getLocationSearch = (data: RequestLocationTypeType) => {
  return post<
    RequestLocationTypeType,
    ResponseWithPayload<LocationTypeRequire>
  >({
    data,
  })(API_LOCATION.GET_SEARCH);
};

export const geLocationDetail = (id: string) => {
  return post<
    LocationTypeDetailDataBody,
    ResponseWithPayload<LocationTypeDetailType>
  >({
    data: {
      id,
    },
  })(API_LOCATION.GET_DETAIL);
};

export const createLocation = (data: LocationTypeCreate) => {
  return post<LocationTypeCreate, ResponseWithPayload<LocationTypeCreate>>({
    data,
  })(API_LOCATION.CREATE);
};

export const editLocation = (data: LocationTypeEdit) => {
  return post<LocationTypeEdit, ResponseWithPayload<LocationTypeEdit>>({
    data,
  })(API_LOCATION.EDIT);
};

export const deleteLocation = (data: React.Key[]) => {
  return post<LocationTypeDelete, ResponseWithPayload<LocationTypeDelete>>({
    data: {
      ids: data,
    },
  })(API_LOCATION.DELETE);
};

export const getDartTable = (data: RequestLocationTypeTableDraft) => {
  return post<
    RequestLocationTypeTableDraft,
    ResponseWithPayload<LocationTypeRequire>
  >({
    data,
  })(API_LOCATION.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusLocation) => {
  return post<UpdateStatusLocation, ResponseWithPayload<UpdateStatusLocation>>({
    data,
  })(API_LOCATION.UPDATE_STATUS);
};

export const getTableRequire = (data: RequestLocationTypeTableRequest) => {
  return post<
    RequestLocationTypeTableRequest,
    ResponseWithPayload<LocationTypeRequire>
  >({
    data,
  })(API_LOCATION.GET_REQUEST);
};
