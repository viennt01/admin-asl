import { UserInfo } from '@/layout/fetcher';
import React, { useEffect, useState } from 'react';

interface AppContext {
  userInfo?: UserInfo;
  setUserInfo?: (userInfo: UserInfo) => void;
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
  listRole: [0],
  dateInserted: '',
  dateUpdated: '',
  insertedByUser: '',
  languageID: '',
  taxCode: '',
  totalBank: '',
  totalCommodity: '',
  totalCurrency: '',
  totalFee: '',
  totalFeeGroup: '',
  totalLocation: '',
  totalTypeContainer: '',
  totalTypeFeeGroup: '',
  totalTypeLocation: '',
  totalUnit: '',
  updatedByUser: '',
  userID: '',
  note: '',
  partnerID: '',
};

const INITIAL_VALUE_CONTEXT = {
  userInfo: INITIAL_VALUE_USER_INFO,
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
  useEffect(() => {
    setValueContext((prev) => ({
      ...prev,
      setUserInfo,
    }));
  }, []);
  return (
    <AppContext.Provider value={valueContext}>{children}</AppContext.Provider>
  );
}
