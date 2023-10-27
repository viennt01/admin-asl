import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  code: '',
  name: '',
  description: '',
};

export const initalValueQuerySelectParamsMaster = {
  typeLoadCapacityID: '',
  statusLoadCapacity: [],
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
  code: {
    label: '',
    value: '',
  },
  name: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
  typeLoadCapacityID: {
    label: '',
    value: '',
  },
  statusLoadCapacity: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  code: '',
  name: '',
  description: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
  typeLoadCapacityID: '',
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  code: {
    label: '',
    value: '',
  },
  name: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
  typeLoadCapacityID: {
    label: '',
    value: '',
  },
  statusLoadCapacity: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  code: '',
  name: '',
  description: '',
};

export const initalValueQuerySelectParamsRequest = {
  typeLoadCapacityID: '',
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  code: {
    label: '',
    value: '',
  },
  name: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
  typeLoadCapacityID: {
    label: '',
    value: '',
  },
  statusLoadCapacity: {
    label: '',
    value: [],
  },
};
