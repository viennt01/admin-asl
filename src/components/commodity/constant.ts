import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  commodityName: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusCommodity: [],
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
  commodityName: {
    label: '',
    value: '',
  },
  statusCommodity: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  commodityName: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
};

export const initalSelectSearchDraft = {
  commodityName: {
    label: '',
    value: '',
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  commodityName: '',
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  commodityName: {
    label: '',
    value: '',
  },
  statusCommodity: {
    label: '',
    value: [],
  },
};
