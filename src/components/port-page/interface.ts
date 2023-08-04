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
  status: number;
  insertedDate: string;
  insertedBy: string;
  updatedDate: string;
  updatedBy: string;
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
  insertedDate: string;
  insertedBy: string;
  updatedDate: string;
  updatedBy: string;
}

export interface CityData {
  cityID: string;
  countryID: string;
  cityName: string;
  maCK: string;
  dateInserted: string;
  insertedBy: string;
  dateUpdated: string;
  updatedBy: string;
}

export interface CityDataBody {
  id: string;
}

export interface PortDetailDataBody {
  id: string;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
}

export const STATUS_COLORS = {
  1: '#00A651',
  2: '#fffbe6',
  3: '#ED1C27',
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
  status: number;
  address: string;
  company: string;
}

export interface PortCreate {
  portID: string;
  countryID: string;
  portName: string;
  portCode: string;
  address: string;
  company: string;
}

export interface PortEdit {
  portID: string;
  countryID: string;
  portName: string;
  portCode: string;
  address: string;
  company: string;
  status: number;
}
