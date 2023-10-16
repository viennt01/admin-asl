export const ROUTERS = {
  LOGIN: '/',
  LOGOUT: '/logout',
  FORGOT_PASSWORD: '/forgot-password',
  CONFIRM_OTP: '/confirm-otp',
  HOME: '/home',
  REQUEST_FOR_APPROVAL: '/request-for-approval',
  REQUEST_FOR_APPROVAL_EDIT: (requestForApprovalId: string) =>
    `/request-for-approval/edit/${requestForApprovalId}`,
  BOOKING: '/booking',
  BOOKING_EDIT: (bookingId: string) => `/booking/edit/${bookingId}`,

  SEA_QUOTATION: '/quotation/sea-quotation',
  SEA_QUOTATION_CREATE: '/quotation/sea-quotation/create',
  SEA_QUOTATION_EDIT: (seaQuotationId: string) =>
    `/quotation/sea-quotation/edit/${seaQuotationId}`,
  SEA_QUOTATION_MANAGER: (seaQuotationId: string) =>
    `/quotation/sea-quotation/manager-admin/${seaQuotationId}`,

  AIR_QUOTATION: '/quotation/air-quotation',
  //AIR_QUOTATION_CREATE: '/quotation/air-quotation/create',
  AIR_QUOTATION_EDIT: (airQuotationId: string) =>
    `/quotation/air-quotation/edit/${airQuotationId}`,
  // AIR_QUOTATION_MANAGER: (airQuotationId: string) =>
  //   `/quotation/air-quotation/manager-admin/${airQuotationId}`,

  CUSTOMS_QUOTATION: '/quotation/customs-quotation',
  CUSTOMS_QUOTATION_CREATE: '/quotation/customs-quotation/create',
  CUSTOMS_QUOTATION_EDIT: (customsQuotationId: string) =>
    `/quotation/customs-quotation/edit/${customsQuotationId}`,
  CUSTOMS_QUOTATION_MANAGER: (customsQuotationId: string) =>
    `/quotation/customs-quotation/manager-admin/${customsQuotationId}`,

  TRUCKING_QUOTATION: '/quotation/trucking-quotation',
  TRUCKING_QUOTATION_CREATE: '/quotation/trucking-quotation/create',
  TRUCKING_QUOTATION_EDIT: (truckingQuotationId: string) =>
    `/quotation/trucking-quotation/edit/${truckingQuotationId}`,
  TRUCKING_QUOTATION_MANAGER: (truckingQuotationId: string) =>
    `/quotation/trucking-quotation/manager-admin/${truckingQuotationId}`,

  QUOTATION_ALL_IN: '/quotation/quotation-all-in',
  //QUOTATION_ALL_IN_CREATE: '/quotation/quotation-all-in/create',
  QUOTATION_ALL_IN_EDIT: (quotationAllInId: string) =>
    `/quotation/quotation-all-in/edit/${quotationAllInId}`,
  // QUOTATION_ALL_IN_MANAGER: (quotationAllInId: string) =>
  //   `/quotation/quotation-all-in/manager-admin/${quotationAllInId}`,

  SEA_PRICING: '/pricing/pricing-sea',
  SEA_PRICING_CREATE: '/pricing/pricing-sea/create',
  SEA_PRICING_EDIT: (seaPricingId: string, checkRow = false) =>
    `/pricing/pricing-sea/edit/${seaPricingId}?checkRow=${checkRow}`,
  SEA_PRICING_MANAGER: (seaPricingId: string) =>
    `/pricing/pricing-sea/manager-admin/${seaPricingId}`,

  AIR_PRICING: '/pricing/pricing-air',
  AIR_PRICING_CREATE: '/pricing/pricing-air/create',
  AIR_PRICING_EDIT: (airPricingId: string, checkRow = false) =>
    `/pricing/pricing-air/edit/${airPricingId}?checkRow=${checkRow}`,
  AIR_PRICING_MANAGER: (airPricingId: string) =>
    `/pricing/pricing-air/manager-admin/${airPricingId}`,

  CUSTOMS_PRICING: '/pricing/pricing-customs',
  CUSTOMS_PRICING_CREATE: '/pricing/pricing-customs/create',
  CUSTOMS_PRICING_EDIT: (customsPricingId: string) =>
    `/pricing/pricing-customs/edit/${customsPricingId}`,
  CUSTOMS_PRICING_MANAGER: (customsPricingId: string) =>
    `/pricing/pricing-customs/manager-admin/${customsPricingId}`,

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

  FEE: '/master-data/fee-catalog/fee',
  FEE_CREATE: '/master-data/fee-catalog/fee/create',
  FEE_EDIT: (feeId: string, checkRow = false) =>
    `/master-data/fee-catalog/fee/edit/${feeId}?checkRow=${checkRow}`,
  FEE_MANAGER: (feeId: string) =>
    `/master-data/fee-catalog/fee/manager-admin/${feeId}`,

  TYPE_FEE: '/master-data/fee-catalog/type-fee',
  TYPE_FEE_CREATE: '/master-data/fee-catalog/type-fee/create',
  TYPE_FEE_EDIT: (typeFeeId: string, checkRow = false) =>
    `/master-data/fee-catalog/type-fee/edit/${typeFeeId}?checkRow=${checkRow}`,
  TYPE_FEE_MANAGER: (typeFeeId: string) =>
    `/master-data/fee-catalog/type-fee/manager-admin/${typeFeeId}`,

  FEE_GROUP: '/master-data/fee-catalog/fee-group',
  FEE_GROUP_CREATE: '/master-data/fee-catalog/fee-group/create',
  FEE_GROUP_EDIT: (feeGroupId: string, checkRow = false) =>
    `/master-data/fee-catalog/fee-group/edit/${feeGroupId}?checkRow=${checkRow}`,
  FEE_GROUP_MANAGER: (feeGroupId: string) =>
    `/master-data/fee-catalog/fee-group/manager-admin/${feeGroupId}`,

  TYPE_FEE_GROUP: '/master-data/fee-catalog/type-fee-group',
  TYPE_FEE_GROUP_CREATE: '/master-data/fee-catalog/type-fee-group/create',
  TYPE_FEE_GROUP_EDIT: (typeFeeGroupId: string, checkRow = false) =>
    `/master-data/fee-catalog/type-fee-group/edit/${typeFeeGroupId}?checkRow=${checkRow}`,
  TYPE_FEE_GROUP_MANAGER: (typeFeeGroupId: string) =>
    `/master-data/fee-catalog/type-fee-group/manager-admin/${typeFeeGroupId}`,

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
  USER_DETAIL: (id: string) => `/system/user/detail/${id}`,
  STAFF: '/system/staff',
  STAFF_EDIT: (staffId: string) => `/system/staff/edit/${staffId}`,
  PERMISSION: '/system/permission',
  PERMISSION_EDIT: (permissionId: string) =>
    `/system/permission/edit/${permissionId}`,
};
