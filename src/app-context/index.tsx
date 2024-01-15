import AppWebsocket from '@/fetcher/ws';
import { UserInfo } from '@/layout/fetcher';
import { INotification } from '@/layout/interface';
import React, { useEffect, useState } from 'react';

interface AppContext {
  userInfo?: UserInfo;
  setUserInfo?: (userInfo: UserInfo) => void;
  role: string;
  setRole?: (role: string) => void;
  appWebbsocket?: AppWebsocket;
  setAppWebsocket?: (appWebbsocket: AppWebsocket) => void;
  notification: INotification;
  setNotification?: (notification: INotification) => void;
}

export const INITIAL_VALUE_USER_INFO = {
  idUser: '',
  employeeCode: '',
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  hasVerifiedEmail: false,
  birthday: '',
  address: '',
  citizenIdentification: '',
  visa: '',
  nationality: '',
  workingBranch: '',
  phoneNumber: '',
  hasVerifiedPhone: false,
  avatar: '',
  colorAvatar: '',
  defaultAvatar: '',
  newUser: false,
  listRole: ['AGENT'],
  dateInserted: '',
  dateUpdated: '',
  insertedByUser: '',
  languageID: '',
  taxCode: '',
  totalBank: '',
  totalCommodity: '',
  totalCurrency: '',
  totalFee: '',
  // totalFeeGroup: '',
  totalLocation: '',
  totalTypeContainer: '',
  totalTypeFeeGroup: '',
  totalTypeLocation: '',
  totalUnit: '',
  updatedByUser: '',
  userID: '',
  note: '',
  partnerID: '',
  totalAirPricing: '', //
  totalAirQuotation: '', //
  totalBookingCancelled: '',
  totalBookingCompleted: '',
  totalBookingPending: '', //
  totalBookingProcessing: '',
  totalCustomsPricing: '', //
  totalCustomsQuotation: '', //
  totalLoadCapacity: '', //
  totalOtherChargesGroupPricing: '', //
  totalOtherChargesGroupQuotation: '', //
  totalPartner: '', //
  totalSeaPricing: '', //
  totalSeaQuotation: '', //
  totalStaff: '', //
  totalTruckingPricing: '', //
  totalTruckingQuotation: '', //
  totalTypeCustoms: '', //
  totalTypeFee: '', //
  totalTypeOfLoadCapacity: '', //
  totalTypeUnit: '', //
};
export const INITIAL_VALUE_NOTIFICATION = {
  totalNotification: '0',
  totalNewNotification: '0',
  notificationDTOs: [
    {
      notificationID: '',
      title: '',
      content: '',
      objectID: '',
      typeObject: '',
      isRead: false,
      dateInserted: 1,
      colorAvatar: '',
      avatar: '',
      defaultAvatar: '',
      fullName: '',
    },
  ],
};
const INITIAL_VALUE_CONTEXT = {
  userInfo: INITIAL_VALUE_USER_INFO,
  role: 'AGENT',
  notification: INITIAL_VALUE_NOTIFICATION,
};

export const AppContext = React.createContext<AppContext>(
  INITIAL_VALUE_CONTEXT
);

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [valueContext, setValueContext] = useState(INITIAL_VALUE_CONTEXT);

  const setUserInfo = (userInfo: UserInfo) => {
    setValueContext((prev) => ({ ...prev, userInfo }));
  };

  const setRole = (role: string) => {
    setValueContext((prev) => ({ ...prev, role }));
  };

  const setAppWebsocket = (appWebbsocket: AppWebsocket) => {
    setValueContext((prev) => ({ ...prev, appWebbsocket }));
  };

  const setNotification = (notification: INotification) => {
    setValueContext((prev) => ({ ...prev, notification }));
  };
  useEffect(() => {
    setValueContext((prev) => ({
      ...prev,
      setUserInfo,
      setRole,
      setAppWebsocket,
      setNotification,
    }));
  }, []);
  return (
    <AppContext.Provider value={valueContext}>{children}</AppContext.Provider>
  );
}
