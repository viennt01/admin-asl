import { IPagination } from '../../../../commons/table/table-default';

export interface Location {
  locationID: string;
  cityID: string;
  cityName: string;
  countryName: string;
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

export interface LocationTypeRequire extends IPagination {
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
  paginateRequest: IPagination;
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
  locationID: string;
  cityID: string;
  cityName: string;
  locationCode: string;
  locationNameEN: string;
  locationNameVN: string;
  statusLocation: string;
  public: boolean;
  typeLocations: string[];
}

export interface LocationTypeDetailType {
  locationID: string;
  cityID: string;
  cityName: string;
  locationCode: string;
  locationNameEN: string;
  locationNameVN: string;
  statusLocation: string;
  typeLocations: TypeLocations[];
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type LocationTypeCreate = Omit<FormValues, 'locationID'>;

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
  paginateRequest: IPagination;
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
  id: React.Key[];
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
  paginateRequest: IPagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
