import { ResponseWithPayload, post } from '@/fetcherAxios';
import { LocationsRequire, RequestLocationType } from './interface';
import { API_UNIT } from '@/fetcherAxios/endpoint';

export const getLocationsSearch = (data: RequestLocationType) => {
  return post<RequestLocationType, ResponseWithPayload<LocationsRequire>>({
    data,
  })(API_UNIT.GET_UNIT_SEARCH);
};
