import COLORS from '@/constant/color';
import { Pagination } from '../commons/table-commons';

export const STATUS_MASTER_COLORS = {
  ACTIVE: COLORS.STATUS_CODE.ACTIVE,
  DEACTIVE: COLORS.STATUS_CODE.DEACTIVE,
};

export const STATUS_MATER_LABELS = {
  ACTIVE: 'ACTIVE',
  DEACTIVE: 'DEACTIVE',
};
//
export interface Unit {
  unitID: string;
  internationalCode: string;
  description: string;
  statusUnit: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
}

export interface LocationTable extends Omit<Unit, 'unitID'> {
  key: string;
  searchAll: string;
}

export interface LocationsRequire extends Pagination {
  data: Unit[];
}
//
export interface QueryInputParamType {
  searchAll: string;
  internationalCode: string;
  description: string;
}
export interface QuerySelectParamType {
  statusUnit: string;
}

export interface RequestLocationType
  extends QueryInputParamType,
    QuerySelectParamType {
  paginateRequest: Pagination;
}

export type SelectSearch = {
  [key in keyof QueryInputParamType]: {
    label: string;
    value: string;
  };
};

export interface UnitDetailDataBody {
  id: string;
}

export interface FormValues {
  unitID: string;
  internationalCode: string;
  descriptionVN: string;
  descriptionEN: string;
  status: string;
}

export interface UnitDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type UnitCreate = Omit<FormValues, 'unitID' | 'status'>;

export type UnitEdit = FormValues;
