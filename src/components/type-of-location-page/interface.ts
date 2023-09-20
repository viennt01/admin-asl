import { Pagination } from '../commons/table/table-deafault';

export interface LocationType {
  typeLocationID: string;
  typeLocationName: string;
  description: string;
  statusTypeLocation: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
}

export interface LocationTypeTable
  extends Omit<LocationType, 'typeLocationID'> {
  key: string;
  searchAll: string;
}

export interface LocationTypeRequire extends Pagination {
  data: LocationType[];
}

export interface QueryInputParamType {
  searchAll: string;
  typeLocationName: string;
  description: string;
}
export interface QuerySelectParamType {
  statusTypeLocation: string[];
}

export interface RequestLocationTypeType
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

export interface LocationTypeDetailDataBody {
  id: string;
}

export interface FormValues {
  typeLocationID: string;
  typeLocationNameEN: string;
  typeLocationNameVN: string;
  descriptionEN: string;
  descriptionVN: string;
  statusTypeLocation: string;
}

export interface LocationTypeDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type LocationTypeCreate = Omit<FormValues, 'typeLocationID'>;

export type LocationTypeEdit = FormValues;

export type LocationTypeDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  typeLocationName: string;
  description: string;
}
export interface QuerySelectDraft {
  status: string[];
}
export interface RequestLocationTypeTableDraft
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

export interface UpdateStatusLocationType {
  id: string;
  status: string;
}

export interface QueryInputRequest {
  typeLocationName: string;
  description: string;
}
export interface RequestLocationTypeTableRequest extends QueryInputRequest {
  paginateRequest: Pagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
