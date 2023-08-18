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
  PARTNER: '/partner',
  PARTNER_EDIT: (partnerId: string) => `/partner/edit/${partnerId}`,
  LOCATION: '/master-data/location',
  LOCATION_EDIT: (portId: string, checkRow = false) =>
    `/master-data/location/edit/${portId}?checkRow=${checkRow}`,
  LOCATION_CREATE: '/master-data/location/create',
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
