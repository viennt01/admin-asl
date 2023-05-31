export const ROUTERS = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  HOME: '/',
  BOOKING: '/booking',
  BOOKING_EDIT: (bookingId: string) => `/booking/edit/${bookingId}`,
  QUOTATION: '/quotation',
  QUOTATION_EDIT: (quotationId: string) => `/quotation/edit/${quotationId}`,
  CUSTOMER: '/parner/customer',
  CUSTOMER_EDIT: (customerId: string) => `/parner/customer/edit/${customerId}`,
  SUPPLIER: '/parner/supplier',
  SUPPLIER_EDIT: (supplierId: string) => `/parner/supplier/edit/${supplierId}`,
  PORT: '/master-data/port',
  PORT_EDIT: (portId: string) => `/master-data/port/edit/${portId}`,
  LOCATION: '/master-data/location',
  LOCATION_EDIT: (locationId: string) =>
    `/master-data/location/edit/${locationId}`,
  TYPE_OF_LOCATION: '/master-data/type-of-location',
  TYPE_OF_LOCATION_EDIT: (typeOfLocationId: string) =>
    `/master-data/type-of-location/edit/${typeOfLocationId}`,
  TYPES_OF_CONTAINER: '/master-data/type-of-container',
  TYPES_OF_CONTAINER_EDIT: (typeOfContainerId: string) =>
    `/master-data/type-of-container/edit/${typeOfContainerId}`,
  TYPES_OF_EXPENSES: '/master-data/type-of-expenses',
  TYPES_OF_EXPENSES_EDIT: (typeOfExpenseId: string) =>
    `/master-data/type-of-expenses/edit/${typeOfExpenseId}`,
  UNIT: '/master-data/unit',
  UNIT_EDIT: (unitId: string) => `/master-data/unit/edit/${unitId}`,
  CURRENCY: '/master-data/currency',
  CURRENCY_EDIT: (currencyId: string) =>
    `/master-data/currency/edit/${currencyId}`,
};
