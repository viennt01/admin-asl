import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  typeFeeGroupNo: '',
  typeFeeGroupName: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusTypeFeeGroup: [],
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
  typeFeeGroupNo: {
    label: '',
    value: '',
  },
  typeFeeGroupName: {
    label: '',
    value: '',
  },
  statusTypeFeeGroup: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  typeFeeGroupNo: '',
  typeFeeGroupName: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  typeFeeGroupNo: {
    label: '',
    value: '',
  },
  typeFeeGroupName: {
    label: '',
    value: '',
  },
  statusTypeFeeGroup: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  typeFeeGroupNo: '',
  typeFeeGroupName: '',
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  typeFeeGroupNo: {
    label: '',
    value: '',
  },
  typeFeeGroupName: {
    label: '',
    value: '',
  },
};
