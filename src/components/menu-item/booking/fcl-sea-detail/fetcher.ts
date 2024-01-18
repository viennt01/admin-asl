import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  IRequireDetailBooking,
  IDetailBooking,
  IRequireSendListEmail,
} from './interface';
import { API_BOOKING } from '@/fetcherAxios/endpoint';

export const getDetailBooking = (data: IRequireDetailBooking) => {
  return post<IRequireDetailBooking, ResponseWithPayload<IDetailBooking>>({
    data,
  })(API_BOOKING.GET_SEA_BOOKING_BY_ID);
};

//send email
export const sendListEmail = (data: IRequireSendListEmail) => {
  return post<IRequireSendListEmail, ResponseWithPayload<string>>({
    data,
  })(API_BOOKING.SEND_FILE_IN_EMAIL_BOOKING_BY_USER);
};
