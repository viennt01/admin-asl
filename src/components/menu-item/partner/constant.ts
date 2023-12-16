import { STATUS_ALL_LABELS } from '@/constant/form';
import { ROLE } from '@/constant/permission';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  rolePartner: ROLE.AGENT,
};

export const initalValueQuerySelectParamsMaster = {
  status: [],
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
  rolePartner: {
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
  rolePartner: '',
};

export const initalValueQuerySelectParamsRequest = {
  status: [STATUS_ALL_LABELS.REQUEST],
};

export const initalValueDisplayColumnRequest = {
  operation: {
    order: 0,
    fixed: 'left' as const,
  },
  index: {
    order: 1,
    fixed: 'left' as const,
  },
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  rolePartner: {
    label: '',
    value: '',
  },
  status: {
    label: '',
    value: [],
  },
};

export const initalValueQueryInputParamsLiner = {
  searchAll: '',
  rolePartner: ROLE.LINER,
};

export const initalValueQueryInputParamsCustomers = {
  searchAll: '',
  rolePartner: ROLE.CUSTOMER,
};
