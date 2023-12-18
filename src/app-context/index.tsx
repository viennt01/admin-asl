import { UserInfo } from '@/layout/fetcher';
import React, { useEffect, useState } from 'react';

interface AppContext {
  userInfo?: UserInfo;
  setUserInfo?: (userInfo: UserInfo) => void;
  role: string;
  setRole?: (role: string) => void;
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

const INITIAL_VALUE_CONTEXT = {
  userInfo: INITIAL_VALUE_USER_INFO,
  role: 'AGENT',
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
  useEffect(() => {
    setValueContext((prev) => ({
      ...prev,
      setUserInfo,
      setRole,
    }));
  }, []);
  return (
    <AppContext.Provider value={valueContext}>{children}</AppContext.Provider>
  );
}
