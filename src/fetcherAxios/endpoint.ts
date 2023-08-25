export const API_AUTHENTICATE = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  REFRESH_TOKEN: '/refresh-token',
};

export const API_USER = {
  CHECK_USER: '/check-user',
  UPDATE_NEW_USER: '/change-status-new-user',
};

export const API_LOCATION = {
  GET_LOCATION_SEARCH: '/search-location',
  GET_PORT_DETAIL: '/get-detail-port',
  CREATE_PORT: '/add-new-port',
  EDIT_PORT: '/update-port',
  DELETE_PORT: '/delete-port',
};

export const API_UNIT = {
  GET_UNIT_SEARCH: '/search-unit',
  GET_UNIT_DETAIL: '/get-unit',
  CREATE_UNIT: '/add-unit',
  EDIT_UNIT: '/update-unit',
  DELETE_UNIT: '/delete-unit',
  UPDATE_STATUS_UNIT: '/update-status-unit',
  GET_UNIT_DRAFT: '/get-unit-with-status-and-id-User',
  GET_UNIT_REQUEST: '/get-unit-with-status-request',
};

export const API_MASTER_DATA = {
  GET_COUNTRY: '/get-all-country',
  GET_CITY: '/get-all-city-by-countryID',
  GET_TYPE_PORT: '/get-all-type-port',
};
