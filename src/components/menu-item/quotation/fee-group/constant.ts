import { STATUS_ALL_LABELS } from '@/constant/form';
import { TYPE_FEE_GROUP } from './interface';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
};

export const initalValueQuerySelectParamsMaster = {
  status: [],
  typeFeeGroupName: [
    TYPE_FEE_GROUP.SEA_QUOTATION,
    TYPE_FEE_GROUP.CUSTOM_QUOTATION,
    TYPE_FEE_GROUP.TRUCKING_QUOTATION,
  ],
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
  feeGroupNo: {
    label: '',
    value: '',
  },
  feeGroupName: {
    label: '',
    value: '',
  },
  statusFeeGroup: {
    label: '',
    value: [],
  },
  typeFeeGroupID: {
    label: '',
    value: '',
  },
};

//draft
export const initalValueQueryInputParamsDraft = {};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
  typeFeeGroupName: [
    TYPE_FEE_GROUP.SEA_QUOTATION,
    TYPE_FEE_GROUP.CUSTOM_QUOTATION,
    TYPE_FEE_GROUP.TRUCKING_QUOTATION,
  ],
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  feeGroupNo: {
    label: '',
    value: '',
  },
  feeGroupName: {
    label: '',
    value: '',
  },
  statusFeeGroup: {
    label: '',
    value: [],
  },
  typeFeeGroupID: {
    label: '',
    value: '',
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  typeFeeGroupName: [
    TYPE_FEE_GROUP.SEA_QUOTATION,
    TYPE_FEE_GROUP.CUSTOM_QUOTATION,
    TYPE_FEE_GROUP.TRUCKING_QUOTATION,
  ],
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  feeGroupNo: {
    label: '',
    value: '',
  },
  feeGroupName: {
    label: '',
    value: '',
  },
  statusFeeGroup: {
    label: '',
    value: [],
  },
  typeFeeGroupID: {
    label: '',
    value: '',
  },
};
