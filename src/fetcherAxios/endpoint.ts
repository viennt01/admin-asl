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

export const API_TYPE_UNIT = {
  GET_SEARCH: '/search-type-unit',
  GET_DETAIL: '/get-type-unit',
  CREATE: '/add-type-unit',
  EDIT: '/update-type-unit',
  DELETE: '/delete-type-unit',
  UPDATE_STATUS: '/update-status-type-unit',
  GET_DRAFT: '/get-type-unit-with-status-and-id-User',
  GET_REQUEST: '/get-type-unit-with-status-request',
  DOWNLOAD_EXAMPLE_FILE: '/download-type-unit-excel',
  IMPORT: '/import-type-unit-with-excel',
  EXPORT: '/export-type-unit-with-excel',
  GET_ALL: '/get-all-type-unit',
};

export const API_TYPE_DECLARATION = {
  GET_SEARCH: '/search-type-delaracrion',
  GET_DETAIL: '/get-type-delaracrion',
  CREATE: '/add-type-delaracrion',
  EDIT: '/update-type-delaracrion',
  DELETE: '/delete-type-delaracrion',
  UPDATE_STATUS: '/update-status-type-delaracrion',
  GET_DRAFT: '/get-type-delaracrion-with-status-and-id-User',
  GET_REQUEST: '/get-type-delaracrion-with-status-request',
  DOWNLOAD_EXAMPLE_FILE: '/download-type-delaracrion-excel',
  IMPORT: '/import-type-delaracrion-with-excel',
  EXPORT: '/export-type-delaracrion-with-excel',
  GET_ALL: '/get-all-type-delaracrion',
};

export const API_SEA_QUOTATION = {
  GET_SEARCH: '/search-sea-quotation',
  GET_DETAIL: '/get-sea-quotation-by-id',
  CREATE: '/add-sea-quotation',
  CREATE_WITH_PRICING: '/add-sea-quotation-by-pricing',
  EDIT: '/update-sea-quotation',
  DELETE: '/delete-sea-quotation',
  UPDATE_STATUS: '/update-status-sea-quotation',
  GET_DRAFT: '/search-sea-quotation-by-user',
  GET_REQUEST: '/search-sea-quotation',
  DOWNLOAD_EXAMPLE_FILE: '/download-sea-quotation-excel',
  IMPORT: '/import-sea-quotation-with-excel',
  EXPORT: '/export-sea-quotation-with-excel',
};

export const API_TRUCKING_QUOTATION = {
  GET_SEARCH: '/search-trucking-quotation',
  GET_DETAIL: '/get-trucking-quotation-by-id',
  CREATE: '/add-trucking-quotation',
  CREATE_WITH_PRICING: '/add-trucking-quotation-by-pricing',
  EDIT: '/update-trucking-quotation',
  DELETE: '/delete-trucking-quotation',
  UPDATE_STATUS: '/update-status-trucking-quotation',
  GET_DRAFT: '/search-trucking-quotation-by-user',
  GET_REQUEST: '/search-trucking-quotation',
  DOWNLOAD_EXAMPLE_FILE: '/download-trucking-quotation-excel',
  IMPORT: '/import-trucking-quotation-with-excel',
  EXPORT: '/export-trucking-quotation-with-excel',
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

export const API_TRUCKING_PRICING = {
  GET_SEARCH: '/search-trucking-pricing',
  GET_DETAIL: '/get-trucking-pricing-by-id',
  CREATE: '/add-trucking-pricing',
  EDIT: '/update-trucking-pricing',
  DELETE: '/delete-trucking-pricing',
  UPDATE_STATUS: '/update-status-trucking-pricing',
  GET_DRAFT: '/search-trucking-pricing-with-status',
  GET_REQUEST: '/search-trucking-pricing-with-status',
  DOWNLOAD_EXAMPLE_FILE: '/download-trucking-pricing-excel',
  IMPORT: '/import-trucking-pricing-with-excel',
  EXPORT: '/export-trucking-pricing-with-excel',
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

export const API_CUSTOM_PRICING = {
  GET_SEARCH: '/search-custom-pricing',
  GET_DETAIL: '/get-custom-pricing-by-id',
  CREATE: '/add-custom-pricing',
  EDIT: '/update-custom-pricing',
  DELETE: '/delete-custom-pricing',
  UPDATE_STATUS: '/update-status-custom-pricing',
  GET_DRAFT: '/search-custom-pricing-with-status',
  GET_REQUEST: '/search-custom-pricing-with-status',
  DOWNLOAD_EXAMPLE_FILE: '/download-custom-pricing-excel',
  IMPORT: '/import-custom-pricing-with-excel',
  EXPORT: '/export-custom-pricing-with-excel',
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

export const API_CUSTOMS_QUOTATION = {
  GET_SEARCH: '/search-custom-quotation',
  GET_DETAIL: '/get-custom-quotation-by-id',
  CREATE: '/add-custom-quotation',
  CREATE_WITH_PRICING: '/add-custom-quotation-by-pricing',
  EDIT: '/update-custom-quotation',
  DELETE: '/delete-custom-quotation',
  UPDATE_STATUS: '/update-status-custom-quotation',
  GET_DRAFT: '/search-custom-quotation-by-user',
  GET_REQUEST: '/search-custom-quotation',
  DOWNLOAD_EXAMPLE_FILE: '/download-custom-quotation-excel',
  IMPORT: '/import-custom-quotation-with-excel',
  EXPORT: '/export-custom-quotation-with-excel',
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

export const API_LOAD_CAPACITY_TYPE = {
  GET_SEARCH: '/search-type-load-capacity',
  GET_DETAIL: '/get-type-load-capacity',
  CREATE: '/add-type-load-capacity',
  EDIT: '/update-type-load-capacity',
  DELETE: '/delete-type-load-capacity',
  UPDATE_STATUS: '/update-status-type-load-capacity',
  GET_DRAFT: '/get-type-load-capacity-with-status-and-id-User',
  GET_REQUEST: '/get-type-load-capacity-with-status-request',
  GET_TYPE_LOAD_CAPACITY: '/get-all-type-load-capacity',
  DOWNLOAD_EXAMPLE_FILE: '/download-type-load-capacity-excel',
  IMPORT: '/import-type-load-capacity-with-excel',
  EXPORT: '/export-type-load-capacity-with-excel',
  GET_ALL: '/get-all-type-load-capacity',
};

export const API_LOAD_CAPACITY = {
  GET_SEARCH: '/search-load-capacity',
  GET_DETAIL: '/get-load-capacity',
  CREATE: '/add-load-capacity',
  EDIT: '/update-load-capacity',
  DELETE: '/delete-load-capacity',
  UPDATE_STATUS: '/update-status-load-capacity',
  GET_DRAFT: '/get-load-capacity-with-status-and-id-User',
  GET_REQUEST: '/get-load-capacity-with-status-request',
  DOWNLOAD_EXAMPLE_FILE: '/download-load-capacity-excel',
  IMPORT: '/import-load-capacity-with-excel',
  GET_ALL: '/get-all-load-capacity',
  EXPORT: '/export-load-capacity-with-excel',
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
  GET_ALL: '/get-all-type-fee-group',
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
  GET_ALL_FEE_WITH_FEE_GROUP: '/get-all-fee-with-fee-group',
  UPDATE_FEE_WITH_FEE_GROUP: '/update-fee-in-fee-group',
  DELETE_FEE_WITH_FEE_GROUP: '/delete-fee-in-fee-group',
};

export const API_PARTNER = {
  GET_ALL_PARTNER_GROUP: '/get-all-group-partner',
  GET_ALL_PARTNER: '/get-all-partner',
  GET_ALL_PARTNER_BY_IDS: '/get-partner-by-list-id',
  GET_ALL_PARTNER_BY_GROUPS_ID: '/get-partner-with-group-partner',
  GET_SEARCH: '/search-partner',
  GET_DETAIL: '/get-partner',
  CREATE: '/add-partner',
  EDIT: '/update-partner',
  DELETE: '/delete-partner',
  UPDATE_STATUS: '/update-status-partner',
  GET_DRAFT: '/get-partner-with-status-and-id-User',
  GET_REQUEST: '/get-partner-with-status-request',
  DOWNLOAD_EXAMPLE_FILE: '/download-partner-excel',
  IMPORT: '/import-partner-with-excel',
  EXPORT: '/export-partner-with-excel',
  GET_ALL: '/get-all-partner',
};
export const API_PARTNER_ROLE = {
  GET_ALL: '/get-all-partner-role',
};
export const API_TRANSACTION_TYPE = {
  GET_ALL: '/get-all-transaction-type',
};
export const API_GENDER = {
  GET_ALL: '/get-all-gender',
};
export const API_LANGUAGE = {
  GET_ALL: '/get-all-language',
};
export const API_ROLE = {
  GET_ALL_ROLE_STAFF: '/get-role-staff',
};
export const API_STAFF = {
  GET_SEARCH: '/search-staff',
  GET_DETAIL: '/get-staff',
  CREATE: '/add-staff',
  EDIT: '/update-staff',
  DELETE: '/delete-staff',
  UPDATE_STATUS: '/update-status-staff',
  GET_DRAFT: '/get-staff-with-status-and-id-User',
  GET_REQUEST: '/get-staff-with-status-request',
  DOWNLOAD_EXAMPLE_FILE: '/download-staff-excel',
  IMPORT: '/import-staff-with-excel',
  EXPORT: '/export-staff-with-excel',
  GET_ALL: '/get-all-staff',
};
