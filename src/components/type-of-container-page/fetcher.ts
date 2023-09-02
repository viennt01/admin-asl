import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  ContainerTypesRequire,
  RequestLocationType,
  RequestContainerTypeTableDraft,
  ContainerTypeCreate,
  ContainerTypeDelete,
  ContainerTypeDetailDataBody,
  ContainerTypeDetailType,
  ContainerTypeEdit,
  UpdateStatusContainerType,
  RequestContainerTypeTableRequest,
} from './interface';
import { API_CONTAINER_TYPE } from '@/fetcherAxios/endpoint';

export const getLocationsSearch = (data: RequestLocationType) => {
  return post<RequestLocationType, ResponseWithPayload<ContainerTypesRequire>>({
    data,
  })(API_CONTAINER_TYPE.GET_SEARCH);
};

export const getContainerTypeDetail = (id: string) => {
  return post<
    ContainerTypeDetailDataBody,
    ResponseWithPayload<ContainerTypeDetailType>
  >({
    data: {
      id,
    },
  })(API_CONTAINER_TYPE.GET_DETAIL);
};

export const createContainerType = (data: ContainerTypeCreate) => {
  return post<ContainerTypeCreate, ResponseWithPayload<ContainerTypeCreate>>({
    data,
  })(API_CONTAINER_TYPE.CREATE);
};

export const editContainerType = (data: ContainerTypeEdit) => {
  return post<ContainerTypeEdit, ResponseWithPayload<ContainerTypeEdit>>({
    data,
  })(API_CONTAINER_TYPE.EDIT);
};

export const deleteContainerType = (data: React.Key[]) => {
  return post<ContainerTypeDelete, ResponseWithPayload<ContainerTypeDelete>>({
    data: {
      ids: data,
    },
  })(API_CONTAINER_TYPE.DELETE);
};

export const getDartTable = (data: RequestContainerTypeTableDraft) => {
  return post<
    RequestContainerTypeTableDraft,
    ResponseWithPayload<ContainerTypesRequire>
  >({
    data,
  })(API_CONTAINER_TYPE.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusContainerType) => {
  return post<
    UpdateStatusContainerType,
    ResponseWithPayload<UpdateStatusContainerType>
  >({
    data,
  })(API_CONTAINER_TYPE.UPDATE_STATUS);
};

export const getTable = (data: RequestContainerTypeTableRequest) => {
  return post<
    RequestContainerTypeTableRequest,
    ResponseWithPayload<ContainerTypesRequire>
  >({
    data,
  })(API_CONTAINER_TYPE.GET_REQUEST);
};
