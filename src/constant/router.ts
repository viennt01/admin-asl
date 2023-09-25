export const ROUTERS = {
  LOGIN: '/',
  LOGOUT: '/logout',
  FORGOT_PASSWORD: '/forgot-password',
  HOME: '/home',
  REQUEST_FOR_APPROVAL: '/request-for-approval',
  REQUEST_FOR_APPROVAL_EDIT: (requestForApprovalId: string) =>
    `/request-for-approval/edit/${requestForApprovalId}`,
  BOOKING: '/booking',
  BOOKING_EDIT: (bookingId: string) => `/booking/edit/${bookingId}`,
  SEA_QUOTATION: '/quotation/quotation-sea',
  SEA_QUOTATION_EDIT: (quotationSeaId: string) =>
    `/quotation/quotation-sea/edit/${quotationSeaId}`,
  AIR_QUOTATION: '/quotation/quotation-air',
  AIR_QUOTATION_EDIT: (quotationAirId: string) =>
    `/quotation/quotation-air/edit/${quotationAirId}`,
  CUSTOMS_QUOTATION: '/quotation/quotation-customs',
  CUSTOMS_QUOTATION_EDIT: (quotationCustomsId: string) =>
    `/quotation/quotation-customs/edit/${quotationCustomsId}`,
  TRUCKING_QUOTATION: '/quotation/quotation-trucking',
  TRUCKING_QUOTATION_EDIT: (quotationTruckingId: string) =>
    `/quotation/quotation-trucking/edit/${quotationTruckingId}`,
  QUOTATION_ALL_IN: '/quotation/quotation-all-in',
  QUOTATION_ALL_IN_EDIT: (quotationAllInId: string) =>
    `/quotation/quotation-all-in/edit/${quotationAllInId}`,
  SEA_PRICING: '/pricing/pricing-sea',
  SEA_PRICING_CREATE: '/pricing/pricing-sea/create',
  SEA_PRICING_EDIT: (seaPricingId: string, checkRow = false) =>
    `/pricing/pricing-sea/edit/${seaPricingId}?checkRow=${checkRow}`,
  SEA_PRICING_MANAGER: (seaPricingId: string) =>
    `/pricing/pricing-sea/manager-admin/${seaPricingId}`,
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

  TYPE_OF_LOCATION: '/master-data/location-catalog/type-of-location',
  TYPE_OF_LOCATION_EDIT: (typeOfLocationId: string, checkRow = false) =>
    `/master-data/location-catalog/type-of-location/edit/${typeOfLocationId}?checkRow=${checkRow}`,
  TYPE_OF_LOCATION_CREATE:
    '/master-data/location-catalog/type-of-location/create',
  TYPE_OF_LOCATION_MANAGER: (typeOfLocationId: string) =>
    `/master-data/location-catalog/type-of-location/manager-admin/${typeOfLocationId}`,

  LOCATION: '/master-data/location-catalog/location',
  LOCATION_EDIT: (locationId: string, checkRow = false) =>
    `/master-data/location-catalog/location/edit/${locationId}?checkRow=${checkRow}`,
  LOCATION_CREATE: '/master-data/location-catalog/location/create',
  LOCATION_MANAGER: (locationId: string) =>
    `/master-data/location-catalog/location/manager-admin/${locationId}`,

  FEE: '/master-data/fee',
  FEE_CREATE: '/master-data/fee/create',
  FEE_EDIT: (feeId: string, checkRow = false) =>
    `/master-data/fee/edit/${feeId}?checkRow=${checkRow}`,
  FEE_MANAGER: (feeId: string) => `/master-data/fee/manager-admin/${feeId}`,

  CURRENCY: '/master-data/accountant/currency',
  CURRENCY_CREATE: '/master-data/accountant/currency/create',
  CURRENCY_EDIT: (currencyId: string, checkRow = false) =>
    `/master-data/accountant/currency/edit/${currencyId}?checkRow=${checkRow}`,
  CURRENCY_MANAGER: (currencyId: string) =>
    `/master-data/accountant/currency/manager-admin/${currencyId}`,

  BANK: '/master-data/accountant/bank',
  BANK_CREATE: '/master-data/accountant/bank/create',
  BANK_EDIT: (bankId: string, checkRow = false) =>
    `/master-data/accountant/bank/edit/${bankId}?checkRow=${checkRow}`,
  BANK_MANAGER: (bankId: string) =>
    `/master-data/accountant/bank/manager-admin/${bankId}`,

  COMMODITY: '/master-data/commodity',
  COMMODITY_CREATE: '/master-data/commodity/create',
  COMMODITY_EDIT: (commodityId: string, checkRow = false) =>
    `/master-data/commodity/edit/${commodityId}?checkRow=${checkRow}`,
  COMMODITY_MANAGER: (commodityId: string) =>
    `/master-data/commodity/manager-admin/${commodityId}`,

  TYPES_OF_CONTAINER: '/master-data/type-of-container',
  TYPES_OF_CONTAINER_CREATE: '/master-data/type-of-container/create',
  TYPES_OF_CONTAINER_EDIT: (typeOfContainerId: string, checkRow = false) =>
    `/master-data/type-of-container/edit/${typeOfContainerId}?checkRow=${checkRow}`,
  TYPES_OF_CONTAINER_MANAGER: (typeOfContainerId: string) =>
    `/master-data/type-of-container/manager-admin/${typeOfContainerId}`,

  UNIT: '/master-data/unit',
  UNIT_CREATE: '/master-data/unit/create',
  UNIT_EDIT: (unitId: string, checkRow = false) =>
    `/master-data/unit/edit/${unitId}?checkRow=${checkRow}`,
  UNIT_MANAGER: (unitId: string) => `/master-data/unit/manager-admin/${unitId}`,

  USER: '/system/user',
  USER_EDIT: (userId: string) => `/system/user/edit/${userId}`,
  STAFF: '/system/staff',
  STAFF_EDIT: (staffId: string) => `/system/staff/edit/${staffId}`,
  PERMISSION: '/system/permission',
  PERMISSION_EDIT: (permissionId: string) =>
    `/system/permission/edit/${permissionId}`,
};
