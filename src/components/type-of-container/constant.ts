import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  containerTypeCode: '',
  name: '',
  details: '',
  teus: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusContainerType: [],
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
  containerTypeCode: {
    label: '',
    value: '',
  },
  name: {
    label: '',
    value: '',
  },
  details: {
    label: '',
    value: '',
  },
  teus: {
    label: '',
    value: '',
  },
  statusContainerType: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  searchAll: '',
  containerTypeCode: '',
  name: '',
  details: '',
  teus: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  containerTypeCode: {
    label: '',
    value: '',
  },
  name: {
    label: '',
    value: '',
  },
  details: {
    label: '',
    value: '',
  },
  teus: {
    label: '',
    value: '',
  },
  statusContainerType: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  containerTypeCode: '',
  name: '',
  details: '',
  teus: '',
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  containerTypeCode: {
    label: '',
    value: '',
  },
  name: {
    label: '',
    value: '',
  },
  details: {
    label: '',
    value: '',
  },
  teus: {
    label: '',
    value: '',
  },
  statusContainerType: {
    label: '',
    value: '',
  },
};
