export interface LoginData {
  email: string;
  password: string;
}
export interface DataLogin {
  accessToken: string;
  refreshToken: string;
}
export interface HeadersLogin {
  ipAddress: string;
  deviceName: string;
}

export interface DataActiveAccount {
  email: string;
}

export interface RequestCheckTaxCode {
  taxCode: string;
}
export interface RequireCheckTaxCode {
  companyName: string;
  address: string;
}
