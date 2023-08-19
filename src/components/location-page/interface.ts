import COLORS from '@/constant/color';
import { Pagination } from '../commons/table-commons';

export const STATUS_COLORS = {
  1: COLORS.STATUS_CODE.ACTIVE,
  2: COLORS.STATUS_CODE.DEACTIVATE,
};

export const STATUS_LABELS = {
  1: 'Active',
  2: 'Deactivate',
};

export interface PortType {
  portID: string;
  countryID: string;
  portName: string;
  portCode: string;
  typePorts: TypePorts[];
  status: number;
  description: string;
  address: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  countryName: string;
}

export interface TypePorts {
  typePortID: string;
  typePortName: string;
}

export interface PortDataTable extends Omit<PortType, 'portID'> {
  key: string;
  searchAll: string;
  typePort: string;
}

export interface PortsData extends Pagination {
  data: PortType[];
}

export interface QueryParamType {
  searchAll: string;
  countryID: string;
  portName: string;
  portCode: string;
  address: string;
  typePort: string;
}

export interface RequestPortsType extends QueryParamType {
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
  [key in keyof QueryParamType]: {
    label: string;
    value: string;
  };
};
