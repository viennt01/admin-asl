import { IPagination } from '@/components/commons/table/table-default';

export interface IQueryInputParamType {
  bookingNo: string;
  startDate?: number;
  endDate?: number;
}
export interface IQuerySelectParamType {
  statusBooking: string[];
}

export interface IRequestHistoryBooking
  extends IQueryInputParamType,
    IQuerySelectParamType {
  paginateRequest: IPagination;
}

export interface IDataHistoryBooking {
  bookingID: string;
  bookingNo: string;
  polName: string;
  podName: string;
  typeOfPOLName: string;
  typeOfPODName: string;
  commodityName: string;
  currency: string;
  typeOfService: string;
  typeOfSeaService: string;
  placeOfRecipt: string;
  placeOfDelivery: string;
  cargoReadyDated: number;
  cargoCutOffDated: number;
  note: string;
  statusBooking: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  isCancel: boolean;
  cancelDated: string;
  reasonCancel: string;
  isManualBooking: boolean;
}
export interface IDataHistoryTable
  extends Omit<IDataHistoryBooking, 'bookingID'> {
  key: string;
}
export interface IHistoryBookingRequire extends IPagination {
  data: IDataHistoryBooking[];
}
export interface IRequestStatusHistoryBooking {
  id: React.Key[];
  status: string;
}
