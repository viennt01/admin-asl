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

export interface Pagination {
  currentPage: number;
  pageSize: number;
}

export const STATUS_COLORS = {
  1: '#00A651',
  2: '#ED1C27',
};

export const STATUS_LABELS = {
  1: 'Active',
  2: 'In Active',
};
