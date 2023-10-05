import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  currencyName: '',
  exchangeRateToVND: '',
  exchangeRateToUSD: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusCurrency: [],
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
  currencyName: {
    label: '',
    value: '',
  },
  exchangeRateToVND: {
    label: '',
    value: '',
  },
  exchangeRateToUSD: {
    label: '',
    value: '',
  },
  statusCurrency: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  currencyName: '',
  exchangeRateToVND: '',
  exchangeRateToUSD: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  currencyName: {
    label: '',
    value: '',
  },
  exchangeRateToVND: {
    label: '',
    value: '',
  },
  exchangeRateToUSD: {
    label: '',
    value: '',
  },
  statusCurrency: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  searchAll: '',
  currencyName: '',
  exchangeRateToVND: '',
  exchangeRateToUSD: '',
};

export const initalSelectSearchRequest = {
  searchAll: {
    label: '',
    value: '',
  },
  currencyName: {
    label: '',
    value: '',
  },
  exchangeRateToVND: {
    label: '',
    value: '',
  },
  exchangeRateToUSD: {
    label: '',
    value: '',
  },
  statusCurrency: {
    label: '',
    value: [],
  },
};
