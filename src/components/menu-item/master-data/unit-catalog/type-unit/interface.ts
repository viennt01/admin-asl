import { IPagination } from '../../../../commons/table/table-default';

export interface ITypeUnit {
  typeUnitID: string;
  typeUnitName: string;
  description: string;
  statusTypeUnit: string;
  public: boolean;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface ITypeUnitTable extends Omit<ITypeUnit, 'typeUnitID'> {
  key: string;
  searchAll: string;
}

export interface ITypeUnitsRequire extends IPagination {
  data: ITypeUnit[];
}
//
export interface ITypeQueryInputParamType {
  searchAll: string;
  typeUnitName: string;
  description: string;
}
export interface ITypeQuerySelectParamType {
  statusTypeUnit: string[];
}

export interface IRequestTypeUnitType
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

export interface ITypeUnitDetailDataBody {
  id: string;
}

export interface IFormValues {
  typeUnitID: string;
  typeUnitNameEN: string;
  typeUnitNameVN: string;
  descriptionEN: string;
  descriptionVN: string;
  statusTypeUnit: string;
}

export interface ITypeUnitDetailType extends IFormValues {
  public: true;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export type ITypeUnitCreate = Omit<IFormValues, 'typeUnitID'>;

export type ITypeUnitEdit = IFormValues;

export type ITypeUnitDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface IQueryInputDraft {
  typeUnitName: string;
  description: string;
}
export interface IQuerySelectDraft {
  status: string[];
}
export interface IRequestUnitTableDraft
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

export interface IUpdateStatusUnit {
  id: React.Key[];
  status: string;
}

export interface IQueryInputRequest {
  typeUnitName: string;
  description: string;
}

export interface IRequestUnitTableRequest extends IQueryInputRequest {
  paginateRequest: IPagination;
}
// export table
export interface IRequestExportData {
  ids: React.Key[];
  status: string[];
}
