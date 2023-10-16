export const API_AUTHENTICATE = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  REFRESH_TOKEN: '/refresh-token',
  CONFIRM_OTP: '/confirm-otp-with-login',
};

export const API_USER = {
  CHECK_USER: '/check-user',
  UPDATE_NEW_USER: '/change-status-new-user',
  GET_SEARCH: '/search-user',
  GET_DETAIL: '/get-user',
  UPDATE_STATUS: '/update-status-user',
  EXPORT: '/export-user-with-excel',
};

export const API_COLUMN = {
  GET_COLUMN_TABLE_NAME: '/get-column-fixed',
  UPDATE_COLUMN_TABLE_NAME: '/update-column-fixed',
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
  DOWNLOAD_EXAMPLE_FILE: '/download-unit-excel',
  IMPORT: '/import-unit-with-excel',
  EXPORT: '/export-unit-with-excel',
  GET_ALL: '/get-all-unit',
};

export const API_SEA_PRICING = {
  GET_SEARCH: '/search-sea-pricing',
  GET_DETAIL: '/get-sea-pricing-by-id',
  CREATE: '/add-sea-pricing',
  EDIT: '/update-sea-pricing',
  DELETE: '/delete-sea-pricing',
  UPDATE_STATUS: '/update-status-sea-pricing',
  GET_DRAFT: '/search-sea-pricing-with-status',
  GET_REQUEST: '/search-sea-pricing-with-status',
  DOWNLOAD_EXAMPLE_FILE: '/download-sea-pricing-excel',
  IMPORT: '/import-sea-pricing-with-excel',
  EXPORT: '/export-sea-pricing-with-excel',
};

export const API_AIR_PRICING = {
  GET_SEARCH: '/search-air-pricing',
  GET_DETAIL: '/get-air-pricing-by-id',
  CREATE: '/add-air-pricing',
  EDIT: '/update-air-pricing',
  DELETE: '/delete-air-pricing',
  UPDATE_STATUS: '/update-status-air-pricing',
  GET_DRAFT: '/search-air-pricing-with-status',
  GET_REQUEST: '/search-air-pricing-with-status',
  DOWNLOAD_EXAMPLE_FILE: '/download-air-pricing-excel',
  IMPORT: '/import-air-pricing-with-excel',
  EXPORT: '/export-air-pricing-with-excel',
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
  DOWNLOAD_EXAMPLE_FILE: '/download-container-type-excel',
  IMPORT: '/import-container-type-with-excel',
  EXPORT: '/export-container-type-with-excel',
  GET_ALL: '/get-all-container-type',
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
  DOWNLOAD_EXAMPLE_FILE: '/download-currency-excel',
  IMPORT: '/import-currency-with-excel',
  GET_ALL: '/get-all-currency',
  EXPORT: '/export-currency-with-excel',
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
  DOWNLOAD_EXAMPLE_FILE: '/download-bank-excel',
  IMPORT: '/import-bank-with-excel',
  EXPORT: '/export-bank-with-excel',
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
  DOWNLOAD_EXAMPLE_FILE: '/download-type-location-excel',
  IMPORT: '/import-type-location-with-excel',
  EXPORT: '/export-type-location-with-excel',
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
  DOWNLOAD_EXAMPLE_FILE: '/download-location-excel',
  IMPORT: '/import-location-with-excel',
  GET_ALL: '/get-all-location',
  EXPORT: '/export-location-with-excel',
};

export const API_COMMODITY = {
  GET_SEARCH: '/search-commodity',
  GET_DETAIL: '/get-commodity',
  CREATE: '/add-commodity',
  EDIT: '/update-commodity',
  DELETE: '/delete-commodity',
  UPDATE_STATUS: '/update-status-commodity',
  GET_DRAFT: '/get-commodity-with-status-and-id-User',
  GET_REQUEST: '/get-commodity-with-status-request',
  IMPORT: '/import-commodity-with-excel',
  DOWNLOAD_EXAMPLE_FILE: '/download-commodity-excel',
  GET_ALL: '/get-all-commodity',
  EXPORT: '/export-commodity-with-excel',
};

export const API_MASTER_DATA = {
  GET_COUNTRY: '/get-all-country',
  GET_CITY: '/get-all-city-by-countryID',
  GET_ALL_CITY: '/get-all-city',
};

export const API_FEE = {
  GET_SEARCH: '/search-fee',
  GET_DETAIL: '/get-fee',
  CREATE: '/add-fee',
  EDIT: '/update-fee',
  DELETE: '/delete-fee',
  UPDATE_STATUS: '/update-status-fee',
  GET_DRAFT: '/get-fee-with-status-and-id-User',
  GET_REQUEST: '/get-fee-with-status-request',
  DOWNLOAD_EXAMPLE_FILE: '/download-fee-excel',
  IMPORT: '/import-fee-with-excel',
  GET_ALL: '/get-all-fee',
  EXPORT: '/export-fee-with-excel',
  GET_ALL_FEE_WITH_FEE_GROUP: '/get-all-fee-with-fee-group',
};

export const API_TYPE_FEE = {
  GET_SEARCH: '/search-type-fee',
  GET_DETAIL: '/get-type-fee',
  CREATE: '/add-type-fee',
  EDIT: '/update-type-fee',
  DELETE: '/delete-type-fee',
  UPDATE_STATUS: '/update-status-type-fee',
  GET_DRAFT: '/get-type-fee-with-status-and-id-User',
  GET_REQUEST: '/get-type-fee-with-status-request',
  DOWNLOAD_EXAMPLE_FILE: '/download-type-fee-excel',
  IMPORT: '/import-type-fee-with-excel',
  GET_ALL: '/get-all-type-fee',
  EXPORT: '/export-type-fee-with-excel',
};

export const API_TYPE_FEE_GROUP = {
  GET_SEARCH: '/search-type-fee-group',
  GET_DETAIL: '/get-type-fee-group',
  CREATE: '/add-type-fee-group',
  EDIT: '/update-type-fee-group',
  DELETE: '/delete-type-fee-group',
  UPDATE_STATUS: '/update-status-type-fee-group',
  GET_DRAFT: '/get-type-fee-group-with-status-and-id-User',
  GET_REQUEST: '/get-type-fee-group-with-status-request',
  DOWNLOAD_EXAMPLE_FILE: '/download-type-fee-group-excel',
  IMPORT: '/import-type-fee-group-with-excel',
  EXPORT: '/export-type-fee-group-with-excel',
};

export const API_FEE_GROUP = {
  GET_SEARCH: '/search-fee-group',
  GET_ALL: '/get-all-fee-group',
  GET_DETAIL: '/get-fee-group',
  CREATE: '/add-fee-group',
  EDIT: '/update-fee-group',
  DELETE: '/delete-fee-group',
  UPDATE_STATUS: '/update-status-fee-group',
  GET_DRAFT: '/get-fee-group-with-status-and-id-User',
  GET_REQUEST: '/get-fee-group-with-status-request',
  DOWNLOAD_EXAMPLE_FILE: '/download-fee-group-excel',
  IMPORT: '/import-fee-group-with-excel',
  EXPORT: '/export-fee-group-with-excel',
};
