import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  typeFeeNo: '',
  typeFeeName: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusTypeFee: [],
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
  typeFeeNo: {
    label: '',
    value: '',
  },
  typeFeeName: {
    label: '',
    value: '',
  },
  statusTypeFee: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  typeFeeNo: '',
  typeFeeName: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  typeFeeNo: {
    label: '',
    value: '',
  },
  typeFeeName: {
    label: '',
    value: '',
  },
  statusTypeFee: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  typeFeeNo: '',
  typeFeeName: '',
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  typeFeeNo: {
    label: '',
    value: '',
  },
  typeFeeName: {
    label: '',
    value: '',
  },
  statusTypeFee: {
    label: '',
    value: [],
  },
};
