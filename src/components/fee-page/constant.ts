import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  feeNo: '',
  feeName: '',
  vatFee: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusFee: [],
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
  feeNo: {
    label: '',
    value: '',
  },
  feeName: {
    label: '',
    value: '',
  },
  vatFee: {
    label: '',
    value: '',
  },
  statusFee: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  feeNo: '',
  feeName: '',
  vatFee: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  feeNo: {
    label: '',
    value: '',
  },
  feeName: {
    label: '',
    value: '',
  },
  vatFee: {
    label: '',
    value: '',
  },
  statusFee: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  feeNo: '',
  feeName: '',
  vatFee: '',
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  feeNo: {
    label: '',
    value: '',
  },
  feeName: {
    label: '',
    value: '',
  },
  vatFee: {
    label: '',
    value: '',
  },
  statusFee: {
    label: '',
    value: [],
  },
};
