import { Pagination } from '@/components/commons/table-commons';
import { UnitsRequire } from '@/components/unit-page/interface';
import { ResponseWithPayload, post } from '@/fetcherAxios';
import { API_UNIT } from '@/fetcherAxios/endpoint';

export interface UpdateStatusUnit {
  id: string;
  status: string;
}

export interface QueryInputRequest {
  internationalCode: string;
  description: string;
}
export interface RequestUnitTableDraft extends QueryInputRequest {
  paginateRequest: Pagination;
}

export const updateStatus = (data: UpdateStatusUnit) => {
  return post<UpdateStatusUnit, ResponseWithPayload<UpdateStatusUnit>>({
    data,
  })(API_UNIT.UPDATE_STATUS_UNIT);
};

export const getTable = (data: RequestUnitTableDraft) => {
  return post<RequestUnitTableDraft, ResponseWithPayload<UnitsRequire>>({
    data,
  })(API_UNIT.GET_UNIT_REQUEST);
};
