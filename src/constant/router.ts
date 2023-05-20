export const ROUTERS = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  HOME: '/',
  BOOKING: '/booking',
  PRICE: '/price',
  CUSTOMER: '/participant/customer',
  SUPPLIER: '/participant/supplier',
  DEPOT: '/master-data/depot',
  DEPOT_EDIT: (depotId: string) => `/master-data/depot/edit/${depotId}`,
  LOCATION: '/master-data/location',
  LOCATION_EDIT: (locationId: string) =>
    `/master-data/location/edit/${locationId}`,
  TYPES_OF_CONTAINER: '/master-data/container',
  TYPES_OF_CONTAINER_EDIT: (typeOfContainerId: string) =>
    `/master-data/container/edit/${typeOfContainerId}`,
  TYPES_OF_EXPENSES: '/master-data/cost-type',
  TYPES_OF_EXPENSES_EDIT: (typeOfExpenseId: string) =>
    `/master-data/cost-type/edit/${typeOfExpenseId}`,
  UNIT_OF_MEASUREMENT: '/master-data/calculation-unit',
  UNIT_OF_MEASUREMENT_EDIT: (unitOfMasurementId: string) =>
    `/master-data/calculation-unit/edit/${unitOfMasurementId}`,
  CURRENCY: '/master-data/currency',
  CURRENCY_EDIT: (currencyId: string) =>
    `/master-data/currency/edit/${currencyId}`,
};
