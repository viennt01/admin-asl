import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  typeDelaracrionCode: '',
  typeDelaracrionName: '',
  description: '',
};

export const initalValueQuerySelectParamsMaster = {
  transactionTypeID: '',
  statusTypeDelaracrion: [],
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
  typeDelaracrionCode: {
    label: '',
    value: '',
  },
  typeDelaracrionName: {
    label: '',
    value: '',
  },
  transactionTypeID: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
  statusTypeDelaracrion: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  typeDelaracrionCode: '',
  typeDelaracrionName: '',
  description: '',
};

export const initalValueQuerySelectParamsDraft = {
  transactionTypeID: '',
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  typeDelaracrionCode: {
    label: '',
    value: '',
  },
  typeDelaracrionName: {
    label: '',
    value: '',
  },
  transactionTypeID: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
  statusTypeDelaracrion: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  transactionTypeID: '',
  typeDelaracrionCode: '',
  typeDelaracrionName: '',
  description: '',
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  typeDelaracrionCode: {
    label: '',
    value: '',
  },
  typeDelaracrionName: {
    label: '',
    value: '',
  },
  transactionTypeID: {
    label: '',
    value: '',
  },
  description: {
    label: '',
    value: '',
  },
};
