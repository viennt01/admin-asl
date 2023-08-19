import COLORS from '@/constant/color';
import { Pagination } from '../commons/table-commons';

export const STATUS_COLORS = {
  // 1: COLORS.STATUS_CODE.BLOCK,
  2: COLORS.STATUS_CODE.ACTIVE,
  3: COLORS.STATUS_CODE.DEACTIVATE,
};

export const STATUS_LABELS = {
  // 1: 'Draft',
  2: 'Active',
  3: 'Deactivate',
};

export interface StatusItem {
  text: string;
  value: number;
}
//
export interface UnitType {
  unitID: string;
  internationalCode: string;
  description: string;
  status: number;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export interface LocationTable extends Omit<UnitType, 'unitID'> {
  key: string;
  searchAll: string;
}

export interface LocationsRequire extends Pagination {
  data: UnitType[];
}
//
export interface QueryInputParamType {
  searchAll: string;
  internationalCode: string;
  description: string;
}
export interface QuerySelectParamType {
  status: number;
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
