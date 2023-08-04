import { ResponseWithPayload, post } from '@/fetcherAxios';

import {
  CityData,
  CityDataBody,
  CountriesData,
  Pagination,
  PortData,
  PortDetailDataBody,
  PortsData,
} from './interface';
import { API_MASTER_DATA, API_PORT } from '@/fetcherAxios/endpoint';

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

export const getListCity = (data: CityDataBody) => {
  return post<CityDataBody, ResponseWithPayload<CityData[]>>({
    data,
  })(API_MASTER_DATA.GET_CITY);
};
