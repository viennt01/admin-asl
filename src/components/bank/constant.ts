import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  bankNo: '',
  bankName: '',
  accountNumberVND: '',
  accountNumberUSD: '',
  phoneNumber: '',
  email: '',
  address: '',
  bankBranch: '',
  note: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusBank: [],
};

export const initalValueDisplayColumnMaster = {
  operation: {
    order: 0,
    fixed: 'left' as const,
  },
  index: {
    order: 1,
    fixed: 'left' as const,
  },
};

export const initalSelectSearchMaster = {
  searchAll: {
    label: '',
    value: '',
  },
  bankNo: {
    label: '',
    value: '',
  },
  bankName: {
    label: '',
    value: '',
  },
  accountNumberVND: {
    label: '',
    value: '',
  },
  accountNumberUSD: {
    label: '',
    value: '',
  },
  phoneNumber: {
    label: '',
    value: '',
  },
  email: {
    label: '',
    value: '',
  },
  address: {
    label: '',
    value: '',
  },
  bankBranch: {
    label: '',
    value: '',
  },
  note: {
    label: '',
    value: '',
  },
  statusBank: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  bankNo: '',
  bankName: '',
  accountNumberVND: '',
  accountNumberUSD: '',
  phoneNumber: '',
  email: '',
  address: '',
  bankBranch: '',
  note: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  bankNo: {
    label: '',
    value: '',
  },
  bankName: {
    label: '',
    value: '',
  },
  accountNumberVND: {
    label: '',
    value: '',
  },
  accountNumberUSD: {
    label: '',
    value: '',
  },
  phoneNumber: {
    label: '',
    value: '',
  },
  email: {
    label: '',
    value: '',
  },
  address: {
    label: '',
    value: '',
  },
  bankBranch: {
    label: '',
    value: '',
  },
  note: {
    label: '',
    value: '',
  },
  statusBank: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  bankNo: '',
  bankName: '',
  accountNumberVND: '',
  accountNumberUSD: '',
  phoneNumber: '',
  email: '',
  address: '',
  bankBranch: '',
  note: '',
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  bankNo: {
    label: '',
    value: '',
  },
  bankName: {
    label: '',
    value: '',
  },
  accountNumberVND: {
    label: '',
    value: '',
  },
  accountNumberUSD: {
    label: '',
    value: '',
  },
  phoneNumber: {
    label: '',
    value: '',
  },
  email: {
    label: '',
    value: '',
  },
  address: {
    label: '',
    value: '',
  },
  bankBranch: {
    label: '',
    value: '',
  },
  note: {
    label: '',
    value: '',
  },
  statusBank: {
    label: '',
    value: [],
  },
};
