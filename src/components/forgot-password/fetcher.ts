import { post, ResponseWithPayload } from '@/fetcher';
import { API_AUTHENTICATE } from '@/fetcher/endpoint';
import {
  SendOtpData,
  SendResetPasswordData,
  SendVerifyOtpData,
} from './interface';

export const sendOtp = (data: SendOtpData) => {
  return post<SendOtpData, ResponseWithPayload<undefined>>({
    data,
  })(API_AUTHENTICATE.SEND_OTP);
};

export const sendVerifyOtp = (data: SendVerifyOtpData) => {
  return post<SendVerifyOtpData, ResponseWithPayload<undefined>>({
    data,
  })(API_AUTHENTICATE.CONFIRM_OTP);
};

export const resetPassword = (data: SendResetPasswordData) => {
  return post<SendResetPasswordData, ResponseWithPayload<undefined>>({
    data,
  })(API_AUTHENTICATE.RESET_PASSWORD);
};
