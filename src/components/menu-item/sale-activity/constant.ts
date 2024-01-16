import { STATUS } from './interface';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
};

export const initalValueQuerySelectParamsMaster = {
  saleActivityTypes: [],
  statusSaleActivity: [STATUS.FINISH, STATUS.COMING],
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
  saleActivityTypes: {
    label: '',
    value: [],
  },
  statusSaleActivity: {
    label: '',
    value: [],
  },
};
