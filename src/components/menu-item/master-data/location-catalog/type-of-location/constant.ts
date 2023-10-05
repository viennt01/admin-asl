import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  typeLocationName: '',
  description: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusTypeLocation: [],
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
  typeLocationName: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
  statusLocation: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  typeLocationName: '',
  description: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  typeLocationName: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
  statusTypeLocation: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  typeLocationName: '',
  description: '',
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  typeLocationName: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
  statusTypeLocation: {
    label: '',
    value: [],
  },
};
