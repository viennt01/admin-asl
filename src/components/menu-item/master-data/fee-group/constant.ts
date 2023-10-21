import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  feeGroupNo: '',
  feeGroupName: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusFeeGroup: [],
  typeFeeGroupID: '',
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
  feeGroupNo: {
    label: '',
    value: '',
  },
  feeGroupName: {
    label: '',
    value: '',
  },
  statusFeeGroup: {
    label: '',
    value: [],
  },
  typeFeeGroupID: {
    label: '',
    value: '',
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  feeGroupNo: '',
  feeGroupName: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
  typeFeeGroupID: '',
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  feeGroupNo: {
    label: '',
    value: '',
  },
  feeGroupName: {
    label: '',
    value: '',
  },
  statusFeeGroup: {
    label: '',
    value: [],
  },
  typeFeeGroupID: {
    label: '',
    value: '',
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  feeGroupNo: '',
  feeGroupName: '',
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  feeGroupNo: {
    label: '',
    value: '',
  },
  feeGroupName: {
    label: '',
    value: '',
  },
  statusFeeGroup: {
    label: '',
    value: [],
  },
  typeFeeGroupID: {
    label: '',
    value: '',
  },
};
