import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusCustomPricing: [],
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
  statusCustomPricing: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  searchAll: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: STATUS_ALL_LABELS.DRAFT,
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  statusCustomPricing: {
    label: '',
    value: '',
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  status: STATUS_ALL_LABELS.REQUEST,
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
};
