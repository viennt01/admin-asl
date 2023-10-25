import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusTypeLoadCapacity: [],
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
  statusTypeLoadCapacity: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  searchAll: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  statusTypeLoadCapacity: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
};
export const initalValueQuerySelectParamsRequest = {
  status: [STATUS_ALL_LABELS.REQUEST],
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  statusTypeLoadCapacity: {
    label: '',
    value: [],
  },
};
