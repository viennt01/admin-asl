export const API_AUTHENTICATE = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  REFRESH_TOKEN: '/refresh-token',
};

export const API_USER = {
  CHECK_USER: '/check-user',
  UPDATE_NEW_USER: '/change-status-new-user',
};

export const API_PORT = {
  GET_PORTS: '/get-all-port',
  GET_PORTS_SEARCH: '/search-port',
  GET_PORT_DETAIL: '/get-detail-port',
  CREATE_PORT: '/add-new-port',
  EDIT_PORT: '/update-port',
  DELETE_PORT: '/delete-port',
};

export const API_UNIT = {
  // GET_PORTS: '/get-all-port',
  GET_UNIT_SEARCH: '/search-unit',
  // GET_PORT_DETAIL: '/get-detail-port',
  // CREATE_PORT: '/add-new-port',
  // EDIT_PORT: '/update-port',
  // DELETE_PORT: '/delete-port',
};

export const API_MASTER_DATA = {
  GET_COUNTRY: '/get-all-country',
  GET_CITY: '/get-all-city-by-countryID',
  GET_TYPE_PORT: '/get-all-type-port',
};
