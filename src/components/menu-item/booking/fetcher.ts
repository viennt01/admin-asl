import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  IHistoryBookingRequire,
  IRequestHistoryBooking,
  IRequestStatusHistoryBooking,
} from './interface';
import { API_BOOKING } from '@/fetcherAxios/endpoint';

export enum TYPE_STATUS_BOOKING {
  'REQUEST' = 'REQUEST',
  'PENDING_CONFIRMATION' = 'PENDING',
  'PROCESSING' = 'PROCESSING',
  'COMPLETED' = 'COMPLETED',
  'CANCELLED' = 'CANCELLED',
}

export const getHistoryBooking = (data: IRequestHistoryBooking) => {
  return post<
    IRequestHistoryBooking,
    ResponseWithPayload<IHistoryBookingRequire>
  >({
    data,
  })(API_BOOKING.GET_HISTORY_BOOKING_BY_ASL_P);
};
export const updateStatusBooking = (data: IRequestStatusHistoryBooking) => {
  return post<IRequestStatusHistoryBooking, ResponseWithPayload<string>>({
    data,
  })(API_BOOKING.UPDATE_STATUS_BOOKING);
};
