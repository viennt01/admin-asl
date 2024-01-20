import { ResponseWithPayload, get, post } from '@/fetcherAxios';
import {
  API_LOCATION_TYPE,
  API_MASTER_DATA,
  API_NOTIFICATION,
  API_USER,
} from '@/fetcherAxios/endpoint';
import { CityType, CountriesType, TypePortData } from './interface';
import { IPagination } from '@/components/commons/table/table-default';

export interface UserInfo {
  idUser: string;
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
  newUser: boolean;
  listRole: string[];
  dateInserted: string;
  dateUpdated: string;
  insertedByUser: string;
  languageID: string;
  taxCode: string;
  totalBank: string;
  totalCommodity: string;
  totalCurrency: string;
  totalFee: string;
  // totalFeeGroup: string; //
  totalLocation: string;
  totalTypeContainer: string;
  totalTypeFeeGroup: string;
  totalTypeLocation: string;
  totalUnit: string;
  updatedByUser: string;
  userID: string;
  note: string;
  partnerID: string;

  totalAirPricing: string;
  totalAirQuotation: string;
  totalBookingCancelled: string;
  totalBookingCompleted: string;
  totalBookingPending: string;
  totalBookingProcessing: string;
  totalCustomsPricing: string;
  totalCustomsQuotation: string;
  totalLoadCapacity: string;
  totalOtherChargesGroupPricing: string;
  totalOtherChargesGroupQuotation: string;
  totalPartner: string;
  totalSeaPricing: string;
  totalSeaQuotation: string;
  totalStaff: string;
  totalTruckingPricing: string;
  totalTruckingQuotation: string;
  totalTypeCustoms: string;
  totalTypeFee: string;
  totalTypeOfLoadCapacity: string;
  totalTypeUnit: string;
  totalBookingRequest: string;
}

export const getUserInfo = () => {
  return get<ResponseWithPayload<UserInfo>>({})(API_USER.CHECK_USER);
};

export const checkNewUser = () => {
  return post<undefined, ResponseWithPayload<undefined>>({})(
    API_USER.UPDATE_NEW_USER
  );
};

export const getListTypeLocations = () => {
  return get<ResponseWithPayload<TypePortData[]>>({})(
    API_LOCATION_TYPE.GET_TYPE_LOCATION
  );
};

export const getListCity = (data: IPagination) => {
  return post<IPagination, ResponseWithPayload<CityType>>({ data })(
    API_MASTER_DATA.GET_ALL_CITY
  );
};

export const getListCountry = (data: IPagination) => {
  return post<IPagination, ResponseWithPayload<CountriesType>>({
    data,
  })(API_MASTER_DATA.GET_COUNTRY);
};
export const confirmNotification = (id: string) => {
  return post<{ id: string }, ResponseWithPayload<string>>({
    data: {
      id,
    },
  })(API_NOTIFICATION.CONFIRM_READ);
};
