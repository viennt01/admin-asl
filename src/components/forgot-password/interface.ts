export enum LAYOUT_TYPE {
  SEND_OTP = 'SEND_OTP',
  CONFIRM_OTP = 'CONFIRM_OTP',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

export interface SendOtpData {
  email: string;
}

export interface SendVerifyOtpData {
  email: string;
  otpCode: string;
}

export interface SendResetPasswordData {
  email: string;
  password: string;
  comfirmPassword: string;
}
