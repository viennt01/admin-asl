import { ResponseWithPayload, post } from '@/fetcherAxios';
import { ConfirmOtpData, HeaderConfirmOtpData, dataRequire } from './interface';
import { API_AUTHENTICATE } from '@/fetcherAxios/endpoint';

export const ConfirmOtpFetch = (
  data: ConfirmOtpData,
  headers: HeaderConfirmOtpData
) => {
  return post<ConfirmOtpData, ResponseWithPayload<dataRequire>>({
    data,
    headers: {
      deviceName: headers.deviceName,
      ipAddress: headers.ipAddress,
    },
  })(API_AUTHENTICATE.CONFIRM_OTP);
};
