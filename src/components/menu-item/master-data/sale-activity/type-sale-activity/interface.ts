import { IPagination } from '../../../../commons/table/table-default';

export enum TYPE_TABS {
  GET_TYPE_SALE_ACTIVITY_BY_MASTER_DATA = 'GET_TYPE_SALE_ACTIVITY_BY_MASTER_DATA',
  GET_TYPE_SALE_ACTIVITY_BY_REQUEST_DATA = 'GET_TYPE_SALE_ACTIVITY_BY_REQUEST_DATA',
  GET_TYPE_SALE_ACTIVITY_BY_DRAFT_DATA = 'GET_TYPE_SALE_ACTIVITY_BY_DRAFT_DATA',
}

export interface ITypeDeclaration {
  saleActivityTypeID: string;
  name: string;
  description: string;
  statusSaleActivityType: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface ITypeDeclarationTable
  extends Omit<ITypeDeclaration, 'saleActivityTypeID'> {
  key: string;
  searchAll: string;
}

export interface ITypeDeclarationRequire extends IPagination {
  data: ITypeDeclaration[];
}
//
export interface ITypeQueryInputParamType {
  searchAll: string;
}
export interface ITypeQuerySelectParamType {
  statusSaleActivityType: string[];
}

export interface IRequestTypeDeclarationType
  extends ITypeQueryInputParamType,
    ITypeQuerySelectParamType {
  paginateRequest: IPagination;
}

export type ISelectSearch = {
  [key in keyof ITypeQueryInputParamType]: {
    label: string;
    value: string;
  };
};

export interface ITypeSaleActivityDetailDataBody {
  id: string;
}

export interface IFormValues {
  saleActivityTypeID: string;
  nameEN: string;
  nameVN: string;
  descriptionEN: string;
  descriptionVN: string;
  statusSaleActivityType: string;
}

export interface ITypeSaleActivityDetailType extends IFormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export type ITypeSaleActivityCreate = Omit<IFormValues, 'saleActivityTypeID'>;

export type ITypeSaleActivityEdit = IFormValues;

export type ITypeSaleActivityDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface IQueryInputDraft {
  searchAll: string;
}
export interface IQuerySelectDraft {
  statusSaleActivityType: string[];
}
export interface IRequestSaleActivityTableDraft
  extends IQueryInputDraft,
    IQuerySelectDraft {
  paginateRequest: IPagination;
}

export type ISelectDratSearch = {
  [key in keyof IQueryInputDraft]: {
    label: string;
    value: string;
  };
};

//----------------------------------------------------------------

export interface IUpdateStatusDeclaration {
  id: React.Key[];
  status: string;
}

export interface IQueryInputRequest {
  searchAll: string;
  statusSaleActivityType: string[];
}

export interface IRequestDeclarationTableRequest extends IQueryInputRequest {
  paginateRequest: IPagination;
}
// export table
export interface IRequestExportData {
  ids: React.Key[];
  status: string[];
}
