import { ResponseWithPayload, post } from '@/fetcherAxios';
import { API_UNIT } from '@/fetcherAxios/endpoint';

export interface UpdateStatusUnit {
  id: string;
  status: string;
}

export const updateStatus = (data: UpdateStatusUnit) => {
  return post<UpdateStatusUnit, ResponseWithPayload<UpdateStatusUnit>>({
    data,
  })(API_UNIT.UPDATE_STATUS_UNIT);
};
