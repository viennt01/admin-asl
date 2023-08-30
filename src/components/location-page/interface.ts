import COLORS from '@/constant/color';
import { Pagination } from '../commons/table/table-deafault';

export const STATUS_COLORS = {
  1: COLORS.STATUS_CODE.ACTIVE,
  2: COLORS.STATUS_CODE.DEACTIVE,
};

export const STATUS_LABELS = {
  1: 'Active',
  2: 'Deactivate',
};

export interface Location {
  locationID: string;
  cityID: string;
  cityName: string;
  locationCode: string;
  locationName: string;
  typeLocations: TypeLocations[];
  statusLocation: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  dateDeleted: string;
  deleteByUser: string;
  isDelete: boolean;
}

export interface TypeLocations {
  typeLocationID: string;
  typeLocationName: string;
  description: string;
}

export interface LocationDataTable extends Omit<Location, 'locationID'> {
  key: string;
  searchAll: string;
}

export interface LocationsData extends Pagination {
  data: Location[];
}

export interface QueryInputParamType {
  searchAll: string;
}
export interface QuerySelectParamType {
  statusLocation: string;
  cityID: string;
  typeLocations: string[];
}

export interface RequestLocationType
  extends QueryInputParamType,
    QuerySelectParamType {
  paginateRequest: Pagination;
}

export interface PortDetailDataBody {
  id: string;
}

export interface FormValues {
  portID: string;
  portName: string;
  portCode: string;
  countryID: string;
  typePorts: string[];
  status: number;
  description: string;
}

export type PortCreate = Omit<FormValues, 'portID' | 'status'>;

export type PortEdit = FormValues;

export type PortDelete = {
  portIds: React.Key[];
};

export type SelectSearch = {
  [key in keyof QueryInputParamType]: {
    label: string;
    value: string;
  };
};
