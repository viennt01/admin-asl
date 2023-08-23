import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  PortCreate,
  PortType,
  PortDetailDataBody,
  PortEdit,
  PortsData,
  RequestPortsType,
  PortDelete,
} from './interface';
import { API_LOCATION } from '@/fetcherAxios/endpoint';

export const getListPortSearch = (data: RequestPortsType) => {
  return post<RequestPortsType, ResponseWithPayload<PortsData>>({
    data,
  })(API_LOCATION.GET_LOCATION_SEARCH);
};

export const getPortDetail = (id: string) => {
  return post<PortDetailDataBody, ResponseWithPayload<PortType>>({
    data: {
      id,
    },
  })(API_LOCATION.GET_PORT_DETAIL);
};

export const createPort = (data: PortCreate) => {
  return post<PortCreate, ResponseWithPayload<PortCreate>>({
    data,
  })(API_LOCATION.CREATE_PORT);
};

export const editPort = (data: PortEdit) => {
  return post<PortEdit, ResponseWithPayload<PortEdit>>({
    data,
  })(API_LOCATION.EDIT_PORT);
};

export const deletePort = (data: React.Key[]) => {
  return post<PortDelete, ResponseWithPayload<PortEdit>>({
    data: {
      portIds: data,
    },
  })(API_LOCATION.DELETE_PORT);
};
