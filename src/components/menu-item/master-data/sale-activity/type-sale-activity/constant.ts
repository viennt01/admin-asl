import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusSaleActivityType: [],
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
  statusSaleActivityType: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  searchAll: '',
};

export const initalValueQuerySelectParamsDraft = {
  statusSaleActivityType: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  statusSaleActivityType: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  statusSaleActivityType: [STATUS_ALL_LABELS.REQUEST],
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  statusSaleActivityType: {
    label: '',
    value: [],
  },
};
