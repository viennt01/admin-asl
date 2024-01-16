import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  ISaleActivityRequire,
  IRequestPartnerType,
  ISaleActivityCreate,
  ISaleActivityDelete,
  ISaleActivityDetailDataBody,
  IDetailType,
  ISaleActivityEdit,
  UpdateStatusUnit,
} from './interface';
import { API_SALE_ACTIVITY } from '@/fetcherAxios/endpoint';

export const getUnitSearch = (data: IRequestPartnerType) => {
  return post<IRequestPartnerType, ResponseWithPayload<ISaleActivityRequire>>({
    data,
  })(API_SALE_ACTIVITY.GET_SEARCH);
};

export const getUnitDetail = (id: string) => {
  return post<ISaleActivityDetailDataBody, ResponseWithPayload<IDetailType>>({
    data: {
      id,
    },
  })(API_SALE_ACTIVITY.GET_DETAIL);
};

export const createUnit = (data: ISaleActivityCreate) => {
  return post<ISaleActivityCreate, ResponseWithPayload<ISaleActivityCreate>>({
    data,
  })(API_SALE_ACTIVITY.CREATE);
};

export const editUnit = (data: ISaleActivityEdit) => {
  return post<ISaleActivityEdit, ResponseWithPayload<ISaleActivityEdit>>({
    data,
  })(API_SALE_ACTIVITY.EDIT);
};

export const deleteUnit = (data: React.Key[]) => {
  return post<ISaleActivityDelete, ResponseWithPayload<ISaleActivityDelete>>({
    data: {
      ids: data,
    },
  })(API_SALE_ACTIVITY.DELETE);
};
//----------------------------------------------------------------
export const updateStatus = (data: UpdateStatusUnit) => {
  return post<UpdateStatusUnit, ResponseWithPayload<UpdateStatusUnit>>({
    data,
  })(API_SALE_ACTIVITY.UPDATE_STATUS);
};
