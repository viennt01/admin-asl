import COLORS from '@/constant/color';
import { Pagination } from '../commons/table-commons';

export interface PortsData {
  data: PortData[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface PortData {
  portID: string;
  countryID: string;
  portName: string;
  portCode: string;
  typePorts: TypePortID[];
  status: number;
  description: string;
  address: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export interface RequestPortsData {
  countryID?: string;
  portName?: string;
  portCode?: string;
  address?: string;
  typePortID?: string;
  paginateRequest: Pagination;
}
export interface TypePortID {
  typePortID: string;
}

export interface CountriesData {
  data: CountryData[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface CountryData {
  countryID: string;
  countryName: string;
  maCK: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  listCity: {
    cityID: string;
    countryID: string;
    cityName: string;
    maCK: string;
    dateInserted: string;
    insertedByUser: string;
    dateUpdated: string;
    updatedByUser: string;
  }[];
}

export interface PortDetailDataBody {
  id: string;
}

export const STATUS_COLORS = {
  1: COLORS.ACTIVE,
  2: COLORS.DEACTIVATE,
  3: COLORS.BLOCK,
};

export const STATUS_LABELS = {
  1: 'Active',
  2: 'Deactivate',
  3: 'Block',
};

export interface FormValues {
  portID: string;
  portName: string;
  portCode: string;
  countryID: string;
  typePorts: string[];
  status: number;
  address: string;
  description: string;
}

export type PortCreate = Omit<FormValues, 'portID' | 'status'>;

export type PortEdit = FormValues;

export interface TypePortData {
  typePortID: string;
  typePortName: string;
  description: string;
  status: number;
  insertedDate: string;
  insertedBy: string;
  updatedDate: string;
  updatedBy: string;
}
