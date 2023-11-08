import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  typeUnitName: '',
  description: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusTypeUnit: [],
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
  typeUnitName: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
  statusTypeUnit: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  typeUnitName: '',
  description: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
};

export const initalSelectSearchDraft = {
  typeUnitName: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
  status: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  typeUnitName: '',
  description: '',
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  typeUnitName: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
};
