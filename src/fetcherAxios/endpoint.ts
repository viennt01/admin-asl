export const API_AUTHENTICATE = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  REFRESH_TOKEN: '/refresh-token',
};

export const API_USER = {
  CHECK_USER: '/check-user',
  UPDATE_NEW_USER: '/change-status-new-user',
};

export const API_UNIT = {
  GET_SEARCH: '/search-unit',
  GET_DETAIL: '/get-unit',
  CREATE: '/add-unit',
  EDIT: '/update-unit',
  DELETE: '/delete-unit',
  UPDATE_STATUS: '/update-status-unit',
  GET_DRAFT: '/get-unit-with-status-and-id-User',
  GET_REQUEST: '/get-unit-with-status-request',
};

export const API_SEA_PRICING = {
  GET_SEARCH: '/search-sea-pricing',
  GET_DETAIL: '/get-sea-pricing-by-id',
  CREATE: '/add-unit',
  EDIT: '/update-unit',
  DELETE: '/delete-unit',
  UPDATE_STATUS: '/update-status-unit',
  GET_DRAFT: '/get-unit-with-status-and-id-User',
  GET_REQUEST: '/get-unit-with-status-request',
};

export const API_CONTAINER_TYPE = {
  GET_SEARCH: '/search-container-type',
  GET_DETAIL: '/get-container-type',
  CREATE: '/add-container-type',
  EDIT: '/update-container-type',
  DELETE: '/delete-container-type',
  UPDATE_STATUS: '/update-status-container-type',
  GET_DRAFT: '/get-container-type-with-status-and-id-User',
  GET_REQUEST: '/get-container-type-with-status-request',
};

export const API_CURRENCY = {
  GET_SEARCH: '/search-currency',
  GET_DETAIL: '/get-currency',
  CREATE: '/add-currency',
  EDIT: '/update-currency',
  DELETE: '/delete-currency',
  UPDATE_STATUS: '/update-status-currency',
  GET_DRAFT: '/get-currency-with-status-and-id-User',
  GET_REQUEST: '/get-currency-with-status-request',
};

export const API_BANK = {
  GET_SEARCH: '/search-bank',
  GET_DETAIL: '/get-bank',
  CREATE: '/add-bank',
  EDIT: '/update-bank',
  DELETE: '/delete-bank',
  UPDATE_STATUS: '/update-status-bank',
  GET_DRAFT: '/get-bank-with-status-and-id-User',
  GET_REQUEST: '/get-bank-with-status-request',
};

export const API_LOCATION_TYPE = {
  GET_SEARCH: '/search-type-location',
  GET_DETAIL: '/get-type-location',
  CREATE: '/add-type-location',
  EDIT: '/update-type-location',
  DELETE: '/delete-type-location',
  UPDATE_STATUS: '/update-status-type-location',
  GET_DRAFT: '/get-type-location-with-status-and-id-User',
  GET_REQUEST: '/get-type-location-with-status-request',
  GET_TYPE_LOCATION: '/get-all-type-location',
};

export const API_LOCATION = {
  GET_SEARCH: '/search-location',
  GET_DETAIL: '/get-location',
  CREATE: '/add-location',
  EDIT: '/update-location',
  DELETE: '/delete-location',
  UPDATE_STATUS: '/update-status-location',
  GET_DRAFT: '/get-location-with-status-and-id-User',
  GET_REQUEST: '/get-location-with-status-request',
};

export const API_MASTER_DATA = {
  GET_COUNTRY: '/get-all-country',
  GET_CITY: '/get-all-city-by-countryID',
  GET_ALL_CITY: '/get-all-city',
};
