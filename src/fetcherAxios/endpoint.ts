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
  GET_PORTS: '/search-port',
  GET_PORT_DETAIL: '/get-detail-port',
  CREATE_PORT: '/add-new-port',
  EDIT_PORT: '/update-port',
};

export const API_MASTER_DATA = {
  GET_COUNTRY: '/get-all-country',
  GET_CITY: '/get-all-city-by-countryID',
  GET_TYPE_PORT: '/get-all-type-port',
};
