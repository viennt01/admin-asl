import { Pagination } from '../commons/table/table-deafault';

export interface Commodity {
  commodityID: string;
  commodityName: string;
  statusCommodity: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
}

export interface CommodityTable extends Omit<Commodity, 'commodityID'> {
  key: string;
  searchAll: string;
}

export interface CommodityRequire extends Pagination {
  data: Commodity[];
}
//
export interface QueryInputParamType {
  searchAll: string;
  commodityName: string;
}
export interface QuerySelectParamType {
  statusCommodity: string[];
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

export interface CommodityDetailDataBody {
  id: string;
}

export interface FormValues {
  commodityID: string;
  commodityNameEN: string;
  commodityNameVN: string;
  statusCommodity: string;
}

export interface CommodityDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type CreateCommodity = Omit<FormValues, 'commodityID'>;

export type EditCommodity = FormValues;

export type DeleteCommodity = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  commodityName: string;
}
export interface QuerySelectDraft {
  status: string[];
}
export interface RequestCommodityTableDraft
  extends QueryInputDraft,
    QuerySelectDraft {
  paginateRequest: Pagination;
}

export type SelectDratSearch = {
  [key in keyof QueryInputDraft]: {
    label: string;
    value: string;
  };
};

//----------------------------------------------------------------

export interface UpdateStatusCommodity {
  id: string;
  status: string;
}

export interface QueryInputRequest {
  commodityName: string;
}
export interface RequestUnitTableRequest extends QueryInputRequest {
  paginateRequest: Pagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
