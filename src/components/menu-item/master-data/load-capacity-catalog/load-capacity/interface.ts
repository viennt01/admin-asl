import { IPagination } from '../../../../commons/table/table-default';

export interface ILoadCapacity {
  loadCapacityID: string;
  typeLoadCapacityID: string;
  typeLoadCapacityName: string;
  code: string;
  name: string;
  description: string;
  statusLoadCapacity: string;
  public: boolean;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface ILoadCapacityType {
  typeLoadCapacityID: string;
  typeLoadCapacityName: string;
}

export interface ILoadCapacityTable
  extends Omit<ILoadCapacity, 'loadCapacityID'> {
  key: string;
  searchAll: string;
}

export interface ILoadCapacityRequire extends IPagination {
  data: ILoadCapacity[];
}

export interface IQueryInputParamType {
  searchAll: string;
  code: string;
  name: string;
  description: string;
}
export interface IQuerySelectParamType {
  statusLoadCapacity: string[];
  typeLoadCapacityID: string;
}

export interface IRequestLoadCapacity
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

export interface ILoadCapacityDetailDataBody {
  id: string;
}

export interface IFormValues {
  loadCapacityID: string;
  code: string;
  name: string;
  typeLoadCapacityID: string;
  descriptionEN: string;
  descriptionVN: string;
  statusLoadCapacity: string;
}

export interface ILoadCapacityDetail extends IFormValues {
  typeLoadCapacityName: string;
  public: boolean;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export type ICreateLoadCapacity = Omit<IFormValues, 'loadCapacityID'>;

export type IEditLoadCapacity = IFormValues;

export type IDeleteLoadCapacity = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface IQueryInputDraft {
  code: string;
  name: string;
  description: string;
}
export interface IQuerySelectDraft {
  status: string[];
  typeLoadCapacityID: string;
}
export interface IRequestLoadCapacityTableDraft
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

export interface ILoadCapacityTableRequest
  extends Omit<ILoadCapacity, 'loadCapacityID'> {
  key: string;
}
export interface IUpdateStatusLoadCapacity {
  id: React.Key[];
  status: string;
}

export interface IQueryInputRequest {
  code: string;
  name: string;
  description: string;
}
export interface IQuerySelectRequest {
  typeLoadCapacityID: string;
}

export type ISelectSearchRequest = {
  [key in keyof IQueryInputRequest]: {
    label: string;
    value: string;
  };
};
export interface IRequestLoadCapacityTableRequest
  extends IQueryInputRequest,
    IQuerySelectRequest {
  paginateRequest: IPagination;
}
// export table
export interface IRequestExportData {
  ids: React.Key[];
  status: string[];
}
