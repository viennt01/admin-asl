export const ROUTERS = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  HOME: '/',
  FORGOT_PASSWORD: '/forgot-password',
  BOOKING: '/booking',
  BOOKING_EDIT: (bookingId: string) => `/booking/edit/${bookingId}`,
  SEA_QUOTATION: '/quotation-sea',
  SEA_QUOTATION_EDIT: (quotationSeaId: string) =>
    `/quotation-sea/edit/${quotationSeaId}`,
  AIR_QUOTATION: '/quotation-air',
  AIR_QUOTATION_EDIT: (quotationAirId: string) =>
    `/quotation-air/edit/${quotationAirId}`,
  CUSTOMS_QUOTATION: '/quotation-customs',
  CUSTOMS_QUOTATION_EDIT: (quotationCustomsId: string) =>
    `/quotation-customs/edit/${quotationCustomsId}`,
  TRUCKING_QUOTATION: '/quotation-trucking',
  TRUCKING_QUOTATION_EDIT: (quotationTruckingId: string) =>
    `/quotation-trucking/edit/${quotationTruckingId}`,
  QUOTATION_ALL_IN: '/quotation-all-in',
  QUOTATION_ALL_IN_EDIT: (quotationAllInId: string) =>
    `/quotation-all-in/edit/${quotationAllInId}`,
  SEA_PRICING: '/pricing/pricing-sea',
  SEA_PRICING_EDIT: (seaPricingId: string) =>
    `/pricing/pricing-sea/edit/${seaPricingId}`,
  AIR_PRICING: '/pricing/pricing-air',
  AIR_PRICING_EDIT: (airPricingId: string) =>
    `/pricing/pricing-air/edit/${airPricingId}`,
  CUSTOMS_PRICING: '/pricing/pricing-customs',
  CUSTOMS_PRICING_EDIT: (customsPricingId: string) =>
    `/pricing/pricing-customs/edit/${customsPricingId}`,
  TRUCKING_PRICING: '/pricing/pricing-trucking',
  TRUCKING_PRICING_EDIT: (truckingPricingId: string) =>
    `/pricing/pricing-trucking/edit/${truckingPricingId}`,
  POTENTIAL_CUSTOMER: '/partner/customer/potential-customer',
  POTENTIAL_CUSTOMER_EDIT: (potentialCustomerId: string) =>
    `/partner/customer/potential-customer/edit/${potentialCustomerId}`,
  OFFICIAL_CUSTOMER: '/partner/customer/official-customer',
  OFFICIAL_CUSTOMER_EDIT: (officialCustomerId: string) =>
    `/partner/customer/official-customer/edit/${officialCustomerId}`,
  CUSTOMER_ON_SALES: '/partner/customer/customers-on-sales',
  CUSTOMER_ON_SALES_EDIT: (customerOnSalesId: string) =>
    `/partner/customer/customers-on-sales/edit/${customerOnSalesId}`,
  SUPPLIER: '/partner/liner-vendor-supplier',
  SUPPLIER_EDIT: (supplierId: string) =>
    `/partner/liner-vendor-supplier/edit/${supplierId}`,
  PORT: '/master-data/port',
  PORT_EDIT: (portId: string, checkRow = false) =>
    `/master-data/port/edit/${portId}?checkRow=${checkRow}`,
  PORT_CREATE: '/master-data/port/create',
  FEE: '/master-data/fee',
  FEE_EDIT: (typeOfExpenseId: string) =>
    `/master-data/fee/edit/${typeOfExpenseId}`,
  CURRENCY: '/master-data/accountant/currency',
  CURRENCY_EDIT: (currencyId: string) =>
    `/master-data/accountant/currency/edit/${currencyId}`,
  BANK: '/master-data/accountant/bank',
  BANK_EDIT: (bankId: string) => `/master-data/accountant/bank/edit/${bankId}`,
  TYPES_OF_CONTAINER: '/master-data/type-of-container',
  TYPES_OF_CONTAINER_EDIT: (typeOfContainerId: string) =>
    `/master-data/type-of-container/edit/${typeOfContainerId}`,
  UNIT: '/master-data/unit',
  UNIT_EDIT: (unitId: string) => `/master-data/unit/edit/${unitId}`,
  USER: '/system/user',
  USER_EDIT: (userId: string) => `/system/user/edit/${userId}`,
  STAFF: '/system/staff',
  STAFF_EDIT: (staffId: string) => `/system/staff/edit/${staffId}`,
  PERMISSION: '/system/permission',
  PERMISSION_EDIT: (permissionId: string) =>
    `/system/permission/edit/${permissionId}`,
};

// export const ROUTER_TITLE = {
//   '/': 'HOME',
//   '/quotation': 'QUOTATION',
//   '/quotation/edit/[id]': 'QUOTATION_EDIT',
//   '/booking': 'BOOKING',
//   '/booking/edit/[id]': 'BOOKING_EDIT',
//   '/partner/customer': 'CUSTOMER',
//   '/partner/customer/edit/[id]': 'CUSTOMER_EDIT',
//   '/partner/supplier': 'SUPPLIER',
//   '/partner/supplier/edit/[id]': 'SUPPLIER_EDIT',
//   '/master-data/port': 'PORT',
//   '/master-data/port/edit/[id]': 'PORT_EDIT',
//   '/master-data/location': 'LOCATION',
//   '/master-data/location/edit/[id]': 'LOCATION_EDIT',
//   '/master-data/fee': 'FEE',
//   '/master-data/fee/edit/[id]': 'FEE_EDIT',
//   '/master-data/type-of-container': 'TYPES_OF_CONTAINER',
//   '/master-data/type-of-container/edit/[id]': 'TYPE_OF_LOCATION_EDIT',
//   '/master-data/type-of-location': 'TYPE_OF_LOCATION',
//   '/master-data/type-of-location/edit/[id]': 'TYPE_OF_LOCATION_EDIT',
//   '/master-data/unit': 'UNIT',
//   '/master-data/unit/edit/[id]': 'UNIT_EDIT',
//   '/master-data/currency': 'CURRENCY',
//   '/master-data/currency/edit/[id]': 'CURRENCY_EDIT',
//   '/system/staff': 'STAFF',
//   '/system/staff/edit/[id]': 'STAFF_EDIT',
//   '/system/permission': 'PERMISSION',
//   '/system/permission/edit/[id]': 'PERMISSION_EDIT',
//   '/404': 'ERROR',
// };
