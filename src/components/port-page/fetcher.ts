import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  CountriesType,
  PortCreate,
  PortType,
  PortDetailDataBody,
  PortEdit,
  PortsData,
  RequestPortsType,
  PortDelete,
} from './interface';
import { API_MASTER_DATA, API_PORT } from '@/fetcherAxios/endpoint';
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

export const getListCountry = (data: Pagination) => {
  return post<Pagination, ResponseWithPayload<CountriesType>>({
    data,
  })(API_MASTER_DATA.GET_COUNTRY);
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
