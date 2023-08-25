import { ResponseWithPayload, get, post } from '@/fetcherAxios';
import { API_MASTER_DATA, API_USER } from '@/fetcherAxios/endpoint';
import { CountriesType, TypePortData } from './interface';
import { Pagination } from '@/components/commons/table-commons';

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
  colorAvatar: string;
  defaultAvatar: string;
  userName: string;
  createdDate: string;
  updatedDate: string;
  newUser: boolean;
  listRole: number[];
}

export const getUserInfo = () => {
  return get<ResponseWithPayload<UserInfo>>({})(API_USER.CHECK_USER);
};

export const checkNewUser = () => {
  return post<undefined, ResponseWithPayload<undefined>>({})(
    API_USER.UPDATE_NEW_USER
  );
};

export const getListTypePort = () => {
  return get<ResponseWithPayload<TypePortData[]>>({})(
    API_MASTER_DATA.GET_TYPE_PORT
  );
};

export const getListCountry = (data: Pagination) => {
  return post<Pagination, ResponseWithPayload<CountriesType>>({
    data,
  })(API_MASTER_DATA.GET_COUNTRY);
};
