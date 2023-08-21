import { ResponseWithPayload, post, uploadFile } from '@/fetcherAxios';
import {
  PortCreate,
  PortType,
  PortDetailDataBody,
  PortEdit,
  PortsData,
  RequestPortsType,
  PortDelete,
} from './interface';
import { API_PORT } from '@/fetcherAxios/endpoint';
import { Pagination } from '../commons/table-commons';

export const getListPortSearch = (data: RequestPortsType) => {
  return post<RequestPortsType, ResponseWithPayload<PortsData>>({
    data,
  })(API_PORT.GET_PORTS_SEARCH);
};

export const getListPort = (data: Pagination) => {
  return post<Pagination, ResponseWithPayload<PortsData>>({
    data,
  })(API_PORT.GET_PORTS);
};

export const getPortDetail = (id: string) => {
  return post<PortDetailDataBody, ResponseWithPayload<PortType>>({
    data: {
      id,
    },
  })(API_PORT.GET_PORT_DETAIL);
};

export const createPort = (data: PortCreate) => {
  return post<PortCreate, ResponseWithPayload<PortCreate>>({
    data,
  })(API_PORT.CREATE_PORT);
};

export const editPort = (data: PortEdit) => {
  return post<PortEdit, ResponseWithPayload<PortEdit>>({
    data,
  })(API_PORT.EDIT_PORT);
};

export const deletePort = (data: React.Key[]) => {
  return post<PortDelete, ResponseWithPayload<PortEdit>>({
    data: {
      portIds: data,
    },
  })(API_PORT.DELETE_PORT);
};

export const bulkCreatePort = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_PORT.IMPORT_CSV);
};
