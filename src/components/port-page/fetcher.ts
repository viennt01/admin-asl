import { ResponseWithPayload, get, post } from '@/fetcherAxios';
import {
  CountriesData,
  PortCreate,
  PortData,
  PortDetailDataBody,
  PortEdit,
  PortsData,
  TypePortData,
} from './interface';
import { API_MASTER_DATA, API_PORT } from '@/fetcherAxios/endpoint';
import { Pagination } from '../commons/table-commons';

export const getListPort = (data: Pagination) => {
  return post<Pagination, ResponseWithPayload<PortsData>>({
    data,
  })(API_PORT.GET_PORTS);
};

export const getPortDetail = (id: string) => {
  return post<PortDetailDataBody, ResponseWithPayload<PortData>>({
    data: {
      id,
    },
  })(API_PORT.GET_PORT_DETAIL);
};

export const getListCountry = (data: Pagination) => {
  return post<Pagination, ResponseWithPayload<CountriesData>>({
    data,
  })(API_MASTER_DATA.GET_COUNTRY);
};

export const getListTypePort = () => {
  return get<ResponseWithPayload<TypePortData[]>>({})(
    API_MASTER_DATA.GET_TYPE_PORT
  );
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
