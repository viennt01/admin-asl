import { IPagination } from '@/components/commons/table/table-default';
import COLORS from '@/constant/color';
import { Dayjs } from 'dayjs';

export enum TYPE_TABS {
  GET_SALE_ACTIVITY = 'GET_PARTNER_BY_AGENT',
}

export enum STATUS {
  FINISH = 'FINISH',
  COMING = 'COMING',
}
export const STATUS_ALL_COLORS_SALE = {
  COMING: COLORS.STATUS_CODE.ACTIVE,
  FINISH: COLORS.STATUS_CODE.DEACTIVE,
};
export interface ISaleActivity {
  saleActivityID: string;
  saleActivityTypeName: string;
  aslPersonalContactName: string;
  companyName: string;
  timeActivitySaleActivity: string;
  description: string;
  timeNextAppointmentSaleActivity: string;
  statusSaleActivity: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface ISaleActivityTable
  extends Omit<ISaleActivity, 'saleActivityID'> {
  key: string;
  searchAll: string;
}

export interface ISaleActivityRequire extends IPagination {
  data: ISaleActivity[];
}
//
export interface IQueryInputParamType {
  searchAll: string;
}
export interface IQuerySelectParamType {
  saleActivityTypes: string[];
  statusSaleActivity: string[];
}
export interface IRequestPartnerType
  extends IQueryInputParamType,
    IQuerySelectParamType {
  paginateRequest: IPagination;
}
export type ISelectSearch = {
  [key in keyof IQueryInputParamType]: {
    label: string;
    value: string;
  };
};
export interface ISaleActivityDetailDataBody {
  id: string;
}

export interface IFormValues {
  saleActivityTypeID: string;
  partnerID: string;
  timeActivitySaleActivity: Dayjs;
  descriptionEN: string;
  descriptionVN: string;
  statusSaleActivity: string;
  listUserID: string[];
}

export interface IDetailType extends IFormValues {
  timeNextAppointmentSaleActivity: string;
  saleActivityID: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface ISaleActivityCreate
  extends Omit<IFormValues, 'timeActivitySaleActivity'> {
  timeActivitySaleActivity: number;
}

export interface ISaleActivityEdit
  extends Omit<IFormValues, 'timeActivitySaleActivity'> {
  saleActivityID: string;
  timeActivitySaleActivity: number;
}

export type ISaleActivityDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface UpdateStatusUnit {
  id: React.Key[];
  status: string;
}
