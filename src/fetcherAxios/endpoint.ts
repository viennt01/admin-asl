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
  GET_SEARCH: '/search-unit',
  GET_DETAIL: '/get-unit',
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

export const API_MASTER_DATA = {
  GET_COUNTRY: '/get-all-country',
  GET_CITY: '/get-all-city-by-countryID',
  GET_TYPE_PORT: '/get-all-type-port',
};
