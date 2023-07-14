import { post, postSendFormData, ResponseWithPayload } from '@/fetcher';
import { API_AUTHENTICATE } from '@/fetcher/endpoint';
import { SendVerifyOtpData } from './interface';

export const sendOtp = (data: FormData) => {
  return postSendFormData<ResponseWithPayload<undefined>>({ data })(
    API_AUTHENTICATE.SEND_OTP
  );
};

export const sendVerifyOtp = (data: SendVerifyOtpData) => {
  return post<SendVerifyOtpData, ResponseWithPayload<undefined>>({
    data,
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  })(API_AUTHENTICATE.CONFIRM_OTP);
};

export const resetPassword = (data: FormData) => {
  return postSendFormData<ResponseWithPayload<undefined>>({ data })(
    API_AUTHENTICATE.RESET_PASSWORD
  );
};
