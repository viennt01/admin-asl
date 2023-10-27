import { IPagination } from '../../../../commons/table/table-default';

export interface ILoadCapacityType {
  typeLoadCapacityID: string;
  typeLoadCapacityCode: string;
  typeLoadCapacityName: string;
  description: string;
  statusTypeLoadCapacity: string;
  public: boolean;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface ILoadCapacityTypeTable
  extends Omit<ILoadCapacityType, 'typeLoadCapacityID'> {
  key: string;
  searchAll: string;
}

export interface ILoadCapacityTypeRequire extends IPagination {
  data: ILoadCapacityType[];
}

export interface IQueryInputParamType {
  searchAll: string;
}
export interface IQuerySelectParamType {
  statusTypeLoadCapacity: string[];
}

export interface IRequestLoadCapacityTypeType
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

export interface ILoadCapacityTypeDetailDataBody {
  id: string;
}

export interface FormValues {
  typeLoadCapacityID: string;
  typeLoadCapacityCode: string;
  typeLoadCapacityNameEN: string;
  typeLoadCapacityNameVN: string;
  descriptionEN: string;
  descriptionVN: string;
  statusTypeLoadCapacity: string;
  public: boolean;
}

export interface ILoadCapacityTypeDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export type ILoadCapacityTypeCreate = Omit<FormValues, 'typeLoadCapacityID'>;

export type ILoadCapacityTypeEdit = FormValues;

export type ILoadCapacityTypeDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface IQueryInputDraft {
  searchAll: string;
  typeLoadCapacityCode: string;
  typeLoadCapacityName: string;
  description: string;
}
export interface IQuerySelectDraft {
  status: string[];
}
export interface IRequestLoadCapacityTypeTableDraft
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

export interface IUpdateStatusLoadCapacityType {
  id: React.Key[];
  status: string;
}

export interface IQueryInputRequest {
  typeLoadCapacityCode: string;
  typeLoadCapacityName: string;
  description: string;
}

export interface IRequestLoadCapacityTypeTableRequest
  extends IQueryInputRequest {
  paginateRequest: IPagination;
}

export type ISelectSearchRequest = {
  [key in keyof IQueryInputRequest]: {
    label: string;
    value: string;
  };
};

// export table
export interface IRequestExportData {
  ids: React.Key[];
  status: string[];
}
