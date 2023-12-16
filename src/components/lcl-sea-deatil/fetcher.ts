import { ResponseWithPayload, post } from '@/fetcherAxios';
import { IRequireDetailBooking, IDetailBooking } from './interface';
import { API_BOOKING } from '@/fetcherAxios/endpoint';

export const getDetailBooking = (data: IRequireDetailBooking) => {
  return post<IRequireDetailBooking, ResponseWithPayload<IDetailBooking>>({
    data,
  })(API_BOOKING.GET_SEA_BOOKING_BY_ID);
};
