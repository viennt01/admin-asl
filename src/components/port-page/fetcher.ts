import { ResponseWithPayload, post } from '@/fetcherAxios';

import { Pagination, PortsData } from './interface';
import { API_PORT } from '@/fetcherAxios/endpoint';

export const getListPort = (data: Pagination) => {
  return post<Pagination, ResponseWithPayload<PortsData>>({
    data,
  })(API_PORT.GET_PORTS);
};
