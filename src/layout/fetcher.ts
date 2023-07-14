import { ResponseWithPayload, get } from '@/fetcherAxios';
import { API_USER } from '@/fetcherAxios/endpoint';

export interface UserInfo {
  idUser: string;
  idLanguage: string;
  idGender: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  hasVerifiedEmail: boolean;
  birthday: string;
  address: string;
  citizenIdentification: string;
  visa: string;
  nationality: string;
  workingBranch: string;
  phoneNumber: string;
  hasVerifiedPhone: boolean;
  avatar: string;
  userName: string;
  createdDate: string;
  updatedDate: string;
  listRole: number[];
}

export const getUserInfo = () => {
  return get<ResponseWithPayload<UserInfo>>({})(API_USER.CHECK_USER);
};
