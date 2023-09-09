import { Pagination } from '../commons/table/table-deafault';
import COLORS from '@/constant/color';

export const STATUS_MASTER_COLORS = {
  ACTIVE: COLORS.STATUS_CODE.ACTIVE,
  DEACTIVE: COLORS.STATUS_CODE.DEACTIVE,
};

export const STATUS_MATER_LABELS = {
  ACTIVE: 'ACTIVE',
  DEACTIVE: 'DEACTIVE',
};
//
export interface Location {
  locationID: string;
  cityID: string;
  cityName: string;
  locationCode: string;
  locationName: string;
  statusLocation: string;
  typeLocations: TypeLocations[];
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
}

export interface TypeLocations {
  typeLocationID: string;
  typeLocationName: string;
  description: string;
}

export interface LocationTable extends Omit<Location, 'locationID'> {
  key: string;
  searchAll: string;
}

export interface LocationTypeRequire extends Pagination {
  data: Location[];
}

export interface QueryInputParamType {
  searchAll: string;
  locationCode: string;
  locationName: string;
}
export interface QuerySelectParamType {
  statusLocation: string[];
  typeLocations: string[];
  cityID: string;
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
  typeLocationName: string;
  description: string;
  statusLocation: string;
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
  locationCode: string;
  locationName: string;
}
export interface QuerySelectDraft {
  status: string[];
  typeLocations: string[];
  cityID: string;
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

export interface LocationTableRequest extends Omit<Location, 'locationID'> {
  key: string;
}
export interface UpdateStatusLocation {
  id: string;
  status: string;
}

export interface QueryInputRequest {
  locationCode: string;
  locationName: string;
}
export interface QuerySelectRequest {
  cityID: string;
  typeLocations: string[];
}

export type SelectSearchRequest = {
  [key in keyof QueryInputRequest]: {
    label: string;
    value: string;
  };
};
export interface RequestLocationTypeTableRequest
  extends QueryInputRequest,
    QuerySelectRequest {
  paginateRequest: Pagination;
}
