import { STATUS_ALL_LABELS } from '@/constant/form';

export const initalValueQueryInputParamsMaster = {
  searchAll: '',
  locationCode: '',
  locationName: '',
};

export const initalValueQuerySelectParamsMaster = {
  statusLocation: [],
  typeLocations: [],
  cityID: '',
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
  locationCode: {
    label: '',
    value: '',
  },
  locationName: {
    label: '',
    value: '',
  },
  typeLocations: {
    label: '',
    value: [],
  },
  statusLocation: {
    label: '',
    value: [],
  },
};

//draft
export const initalValueQueryInputParamsDraft = {
  searchAll: '',
  locationCode: '',
  locationName: '',
};

export const initalValueQuerySelectParamsDraft = {
  status: [STATUS_ALL_LABELS.DRAFT, STATUS_ALL_LABELS.REJECT],
  typeLocations: [],
  cityID: '',
};

export const initalSelectSearchDraft = {
  searchAll: {
    label: '',
    value: '',
  },
  locationCode: {
    label: '',
    value: '',
  },
  locationName: {
    label: '',
    value: '',
  },
  typeLocations: {
    label: '',
    value: [],
  },
  statusLocation: {
    label: '',
    value: [],
  },
};

//request
export const initalValueQueryInputParamsRequest = {
  locationCode: '',
  locationName: '',
};

export const initalValueQuerySelectParamsRequest = {
  typeLocations: [],
  cityID: '',
};

export const initalSelectSearchRequest = {
  locationCode: {
    label: '',
    value: '',
  },
  locationName: {
    label: '',
    value: '',
  },
  cityID: {
    label: '',
    value: '',
  },
  typeLocations: {
    label: '',
    value: [],
  },
};
