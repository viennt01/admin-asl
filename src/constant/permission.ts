export enum ROLE {
  AGENT = 'AGENT',
  LINER = 'LINER',
  AIR_LINER = 'AIRLINE',
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER',
  SALE = 'SALE',
}

export enum PERMISSION {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  NO_VIEW = 'NO_VIEW',
}

export type IPermissionRules = {
  [key: string]: {
    [key: string]: PERMISSION;
  };
};

export const PERMISSION_RULES = () => {
  return {
    MANAGER: {
      '/quotation/fee-group': PERMISSION.EDIT,
      '/quotation/fee-group/create': PERMISSION.EDIT,
      '/quotation/fee-group/edit/[id]': PERMISSION.EDIT,
      '/quotation/fee-group/manager-admin/[id]': PERMISSION.EDIT,

      '/quotation/sea-quotation': PERMISSION.EDIT,
      '/quotation/sea-quotation/create': PERMISSION.EDIT,
      '/quotation/sea-quotation/edit/[id]': PERMISSION.EDIT,
      '/quotation/sea-quotation/manager-admin/[id]': PERMISSION.EDIT,

      '/quotation/air-quotation': PERMISSION.EDIT,
      '/quotation/air-quotation/create': PERMISSION.EDIT,
      '/quotation/air-quotation/edit/[id]': PERMISSION.EDIT,
      '/quotation/air-quotation/manager-admin/[id]': PERMISSION.EDIT,

      '/quotation/customs-quotation': PERMISSION.EDIT,
      '/quotation/customs-quotation/create': PERMISSION.EDIT,
      '/quotation/customs-quotation/edit/[id]': PERMISSION.EDIT,
      '/quotation/customs-quotation/manager-admin/[id]': PERMISSION.EDIT,

      '/quotation/trucking-quotation': PERMISSION.EDIT,
      '/quotation/trucking-quotation/create': PERMISSION.EDIT,
      '/quotation/trucking-quotation/edit/[id]': PERMISSION.EDIT,
      '/quotation/trucking-quotation/manager-admin/[id]': PERMISSION.EDIT,

      '/booking': PERMISSION.EDIT,
      '/booking/fcl-detail/[id]': PERMISSION.EDIT,
      '/booking/lcl-detail/[id]': PERMISSION.EDIT,

      '/pricing/fee-group': PERMISSION.EDIT,
      '/pricing/fee-group/create': PERMISSION.EDIT,
      '/pricing/fee-group/edit/[id]': PERMISSION.EDIT,
      '/pricing/fee-group/manager-admin/[id]': PERMISSION.EDIT,

      '/pricing/pricing-sea': PERMISSION.EDIT,
      '/pricing/pricing-sea/create': PERMISSION.NO_VIEW,
      '/pricing/pricing-sea/edit/[id]': PERMISSION.EDIT,
      '/pricing/pricing-sea/manager-admin/[id]': PERMISSION.EDIT,

      '/pricing/pricing-air': PERMISSION.EDIT,
      '/pricing/pricing-air/create': PERMISSION.NO_VIEW,
      '/pricing/pricing-air/edit/[id]': PERMISSION.EDIT,
      '/pricing/pricing-air/manager-admin/[id]': PERMISSION.EDIT,

      '/pricing/pricing-customs': PERMISSION.EDIT,
      '/pricing/pricing-customs/create': PERMISSION.NO_VIEW,
      '/pricing/pricing-customs/edit/[id]': PERMISSION.EDIT,
      '/pricing/pricing-customs/manager-admin/[id]': PERMISSION.EDIT,

      '/pricing/pricing-trucking': PERMISSION.EDIT,
      '/pricing/pricing-trucking/create': PERMISSION.NO_VIEW,
      '/pricing/pricing-trucking/edit/[id]': PERMISSION.EDIT,
      '/pricing/pricing-trucking/manager-admin/[id]': PERMISSION.EDIT,

      '/partner': PERMISSION.EDIT,
      '/partner/create': PERMISSION.EDIT,
      '/partner/edit/[id]': PERMISSION.EDIT,
      '/partner/manager-admin/[id]': PERMISSION.EDIT,

      '/master-data/location-catalog/type-of-location': PERMISSION.EDIT,
      '/master-data/location-catalog/type-of-location/create': PERMISSION.EDIT,
      '/master-data/location-catalog/type-of-location/edit/[id]':
        PERMISSION.EDIT,
      '/master-data/location-catalog/type-of-location/manager-admin/[id]':
        PERMISSION.EDIT,

      '/master-data/location-catalog/location': PERMISSION.EDIT,
      '/master-data/location-catalog/location/create': PERMISSION.EDIT,
      '/master-data/location-catalog/location/edit/[id]': PERMISSION.EDIT,
      '/master-data/location-catalog/location/manager-admin/[id]':
        PERMISSION.EDIT,

      '/master-data/declaration-catalog/type-of-declaration': PERMISSION.EDIT,
      '/master-data/declaration-catalog/type-of-declaration/create':
        PERMISSION.EDIT,
      '/master-data/declaration-catalog/type-of-declaration/edit/[id]':
        PERMISSION.EDIT,
      '/master-data/declaration-catalog/type-of-declaration/manager-admin/[id]':
        PERMISSION.EDIT,

      '/master-data/load-capacity-catalog/type-of-load-capacity':
        PERMISSION.EDIT,
      '/master-data/load-capacity-catalog/type-of-load-capacity/create':
        PERMISSION.EDIT,
      '/master-data/load-capacity-catalog/type-of-load-capacity/edit/[id]':
        PERMISSION.EDIT,
      '/master-data/load-capacity-catalog/type-of-load-capacity/manager-admin/[id]':
        PERMISSION.EDIT,

      '/master-data/load-capacity-catalog/load-capacity': PERMISSION.EDIT,
      '/master-data/load-capacity-catalog/load-capacity/create':
        PERMISSION.EDIT,
      '/master-data/load-capacity-catalog/load-capacity/edit/[id]':
        PERMISSION.EDIT,
      '/master-data/load-capacity-catalog/load-capacity/manager-admin/[id]':
        PERMISSION.EDIT,

      '/master-data/unit-catalog/unit': PERMISSION.EDIT,
      '/master-data/unit-catalog/unit/create': PERMISSION.EDIT,
      '/master-data/unit-catalog/unit/edit/[id]': PERMISSION.EDIT,
      '/master-data/unit-catalog/unit/manager-admin/[id]': PERMISSION.EDIT,

      '/master-data/unit-catalog/type-unit': PERMISSION.EDIT,
      '/master-data/unit-catalog/type-unit/create': PERMISSION.EDIT,
      '/master-data/unit-catalog/type-unit/edit/[id]': PERMISSION.EDIT,
      '/master-data/unit-catalog/type-unit/manager-admin/[id]': PERMISSION.EDIT,

      '/master-data/accountant/currency': PERMISSION.EDIT,
      '/master-data/accountant/currency/create': PERMISSION.EDIT,
      '/master-data/accountant/currency/edit/[id]': PERMISSION.EDIT,
      '/master-data/accountant/currency/manager-admin/[id]': PERMISSION.EDIT,

      '/master-data/accountant/bank': PERMISSION.EDIT,
      '/master-data/accountant/bank/create': PERMISSION.EDIT,
      '/master-data/accountant/bank/edit/[id]': PERMISSION.EDIT,
      '/master-data/accountant/bank/manager-admin/[id]': PERMISSION.EDIT,

      '/master-data/fee-catalog/fee': PERMISSION.EDIT,
      '/master-data/fee-catalog/fee/create': PERMISSION.EDIT,
      '/master-data/fee-catalog/fee/edit/[id]': PERMISSION.EDIT,
      '/master-data/fee-catalog/fee/manager-admin/[id]': PERMISSION.EDIT,

      '/master-data/fee-catalog/type-fee': PERMISSION.EDIT,
      '/master-data/fee-catalog/type-fee/create': PERMISSION.EDIT,
      '/master-data/fee-catalog/type-fee/edit/[id]': PERMISSION.EDIT,
      '/master-data/fee-catalog/type-fee/manager-admin/[id]': PERMISSION.EDIT,

      '/master-data/fee-group': PERMISSION.EDIT,
      '/master-data/fee-group/create': PERMISSION.EDIT,
      '/master-data/fee-group/edit/[id]': PERMISSION.EDIT,
      '/master-data/fee-group/manager-admin/[id]': PERMISSION.EDIT,

      '/master-data/fee-catalog/type-fee-group': PERMISSION.EDIT,
      '/master-data/fee-catalog/type-fee-group/create': PERMISSION.EDIT,
      '/master-data/fee-catalog/type-fee-group/edit/[id]': PERMISSION.EDIT,
      '/master-data/fee-catalog/type-fee-group/manager-admin/[id]':
        PERMISSION.EDIT,

      '/master-data/commodity': PERMISSION.EDIT,
      '/master-data/commodity/create': PERMISSION.EDIT,
      '/master-data/commodity/edit/[id]': PERMISSION.EDIT,
      '/master-data/commodity/manager-admin/[id]': PERMISSION.EDIT,

      '/master-data/type-of-container': PERMISSION.EDIT,
      '/master-data/type-of-container/create': PERMISSION.EDIT,
      '/master-data/type-of-container/edit/[id]': PERMISSION.EDIT,
      '/master-data/type-of-container/manager-admin/[id]': PERMISSION.EDIT,

      '/system/user': PERMISSION.EDIT,
      '/system/user/create': PERMISSION.EDIT,
      '/system/user/edit/[id]': PERMISSION.EDIT,
      '/system/user/manager-admin/[id]': PERMISSION.EDIT,

      '/system/staff': PERMISSION.EDIT,
      '/system/staff/create': PERMISSION.EDIT,
      '/system/staff/edit/[id]': PERMISSION.EDIT,
      '/system/staff/manager-admin/[id]': PERMISSION.EDIT,

      '/system/permission': PERMISSION.EDIT,
      '/system/permission/create': PERMISSION.EDIT,
      '/system/permission/edit/[id]': PERMISSION.EDIT,
      '/system/permission/manager-admin/[id]': PERMISSION.EDIT,

      '/sale-activity/': PERMISSION.EDIT,
      '/sale-activity/create': PERMISSION.EDIT,
      '/sale-activity/edit/[id]': PERMISSION.EDIT,
      '/sale-activity/manager-admin/[id]': PERMISSION.EDIT,
    },
    SALE: {
      '/quotation/fee-group': PERMISSION.VIEW,
      '/quotation/fee-group/create': PERMISSION.EDIT,
      '/quotation/fee-group/edit/[id]': PERMISSION.VIEW,
      '/quotation/fee-group/manager-admin/[id]': PERMISSION.EDIT,

      '/quotation/sea-quotation': PERMISSION.VIEW,
      '/quotation/sea-quotation/create': PERMISSION.EDIT,
      '/quotation/sea-quotation/edit/[id]': PERMISSION.VIEW,
      '/quotation/sea-quotation/manager-admin/[id]': PERMISSION.EDIT,

      '/quotation/air-quotation': PERMISSION.VIEW,
      '/quotation/air-quotation/create': PERMISSION.EDIT,
      '/quotation/air-quotation/edit/[id]': PERMISSION.VIEW,
      '/quotation/air-quotation/manager-admin/[id]': PERMISSION.EDIT,

      '/quotation/customs-quotation': PERMISSION.VIEW,
      '/quotation/customs-quotation/create': PERMISSION.EDIT,
      '/quotation/customs-quotation/edit/[id]': PERMISSION.VIEW,
      '/quotation/customs-quotation/manager-admin/[id]': PERMISSION.EDIT,

      '/quotation/trucking-quotation': PERMISSION.VIEW,
      '/quotation/trucking-quotation/create': PERMISSION.EDIT,
      '/quotation/trucking-quotation/edit/[id]': PERMISSION.VIEW,
      '/quotation/trucking-quotation/manager-admin/[id]': PERMISSION.EDIT,

      '/booking': PERMISSION.EDIT,
      '/booking/fcl-detail/[id]': PERMISSION.EDIT,
      '/booking/lcl-detail/[id]': PERMISSION.EDIT,

      '/pricing/fee-group': PERMISSION.VIEW,
      '/pricing/fee-group/create': PERMISSION.EDIT,
      '/pricing/fee-group/edit/[id]': PERMISSION.VIEW,
      '/pricing/fee-group/manager-admin/[id]': PERMISSION.EDIT,

      '/pricing/pricing-sea': PERMISSION.VIEW,
      '/pricing/pricing-sea/create': PERMISSION.NO_VIEW,
      '/pricing/pricing-sea/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-sea/manager-admin/[id]': PERMISSION.EDIT,

      '/pricing/pricing-air': PERMISSION.VIEW,
      '/pricing/pricing-air/create': PERMISSION.NO_VIEW,
      '/pricing/pricing-air/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-air/manager-admin/[id]': PERMISSION.EDIT,

      '/pricing/pricing-customs': PERMISSION.VIEW,
      '/pricing/pricing-customs/create': PERMISSION.NO_VIEW,
      '/pricing/pricing-customs/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-customs/manager-admin/[id]': PERMISSION.EDIT,

      '/pricing/pricing-trucking': PERMISSION.VIEW,
      '/pricing/pricing-trucking/create': PERMISSION.NO_VIEW,
      '/pricing/pricing-trucking/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-trucking/manager-admin/[id]': PERMISSION.EDIT,

      '/partner': PERMISSION.VIEW,
      '/partner/create': PERMISSION.EDIT,
      '/partner/edit/[id]': PERMISSION.VIEW,
      '/partner/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/location-catalog/type-of-location': PERMISSION.EDIT,
      '/master-data/location-catalog/type-of-location/create': PERMISSION.EDIT,
      '/master-data/location-catalog/type-of-location/edit/[id]':
        PERMISSION.EDIT,
      '/master-data/location-catalog/type-of-location/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/location-catalog/location': PERMISSION.EDIT,
      '/master-data/location-catalog/location/create': PERMISSION.EDIT,
      '/master-data/location-catalog/location/edit/[id]': PERMISSION.EDIT,
      '/master-data/location-catalog/location/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/declaration-catalog/type-of-declaration': PERMISSION.EDIT,
      '/master-data/declaration-catalog/type-of-declaration/create':
        PERMISSION.EDIT,
      '/master-data/declaration-catalog/type-of-declaration/edit/[id]':
        PERMISSION.EDIT,
      '/master-data/declaration-catalog/type-of-declaration/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/load-capacity-catalog/type-of-load-capacity':
        PERMISSION.EDIT,
      '/master-data/load-capacity-catalog/type-of-load-capacity/create':
        PERMISSION.EDIT,
      '/master-data/load-capacity-catalog/type-of-load-capacity/edit/[id]':
        PERMISSION.EDIT,
      '/master-data/load-capacity-catalog/type-of-load-capacity/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/load-capacity-catalog/load-capacity': PERMISSION.EDIT,
      '/master-data/load-capacity-catalog/load-capacity/create':
        PERMISSION.EDIT,
      '/master-data/load-capacity-catalog/load-capacity/edit/[id]':
        PERMISSION.EDIT,
      '/master-data/load-capacity-catalog/load-capacity/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/unit-catalog/unit': PERMISSION.EDIT,
      '/master-data/unit-catalog/unit/create': PERMISSION.EDIT,
      '/master-data/unit-catalog/unit/edit/[id]': PERMISSION.EDIT,
      '/master-data/unit-catalog/unit/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/unit-catalog/type-unit': PERMISSION.EDIT,
      '/master-data/unit-catalog/type-unit/create': PERMISSION.EDIT,
      '/master-data/unit-catalog/type-unit/edit/[id]': PERMISSION.EDIT,
      '/master-data/unit-catalog/type-unit/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/accountant/currency': PERMISSION.EDIT,
      '/master-data/accountant/currency/create': PERMISSION.EDIT,
      '/master-data/accountant/currency/edit/[id]': PERMISSION.EDIT,
      '/master-data/accountant/currency/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/accountant/bank': PERMISSION.EDIT,
      '/master-data/accountant/bank/create': PERMISSION.EDIT,
      '/master-data/accountant/bank/edit/[id]': PERMISSION.EDIT,
      '/master-data/accountant/bank/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/fee-catalog/fee': PERMISSION.EDIT,
      '/master-data/fee-catalog/fee/create': PERMISSION.EDIT,
      '/master-data/fee-catalog/fee/edit/[id]': PERMISSION.EDIT,
      '/master-data/fee-catalog/fee/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/fee-catalog/type-fee': PERMISSION.EDIT,
      '/master-data/fee-catalog/type-fee/create': PERMISSION.EDIT,
      '/master-data/fee-catalog/type-fee/edit/[id]': PERMISSION.EDIT,
      '/master-data/fee-catalog/type-fee/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/fee-group': PERMISSION.EDIT,
      '/master-data/fee-group/create': PERMISSION.EDIT,
      '/master-data/fee-group/edit/[id]': PERMISSION.EDIT,
      '/master-data/fee-group/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/fee-catalog/type-fee-group': PERMISSION.EDIT,
      '/master-data/fee-catalog/type-fee-group/create': PERMISSION.EDIT,
      '/master-data/fee-catalog/type-fee-group/edit/[id]': PERMISSION.EDIT,
      '/master-data/fee-catalog/type-fee-group/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/commodity': PERMISSION.EDIT,
      '/master-data/commodity/create': PERMISSION.EDIT,
      '/master-data/commodity/edit/[id]': PERMISSION.EDIT,
      '/master-data/commodity/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/type-of-container': PERMISSION.EDIT,
      '/master-data/type-of-container/create': PERMISSION.EDIT,
      '/master-data/type-of-container/edit/[id]': PERMISSION.EDIT,
      '/master-data/type-of-container/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/system/user': PERMISSION.NO_VIEW,
      '/system/user/create': PERMISSION.NO_VIEW,
      '/system/user/edit/[id]': PERMISSION.NO_VIEW,
      '/system/user/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/system/staff': PERMISSION.NO_VIEW,
      '/system/staff/create': PERMISSION.NO_VIEW,
      '/system/staff/edit/[id]': PERMISSION.NO_VIEW,
      '/system/staff/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/system/permission': PERMISSION.NO_VIEW,
      '/system/permission/create': PERMISSION.NO_VIEW,
      '/system/permission/edit/[id]': PERMISSION.NO_VIEW,
      '/system/permission/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/sale-activity/': PERMISSION.EDIT,
      '/sale-activity/create': PERMISSION.EDIT,
      '/sale-activity/edit/[id]': PERMISSION.EDIT,
      '/sale-activity/manager-admin/[id]': PERMISSION.EDIT,
    },
    AGENT: {
      '/quotation/fee-group': PERMISSION.NO_VIEW,
      '/quotation/fee-group/create': PERMISSION.NO_VIEW,
      '/quotation/fee-group/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/fee-group/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/quotation/sea-quotation': PERMISSION.NO_VIEW,
      '/quotation/sea-quotation/create': PERMISSION.NO_VIEW,
      '/quotation/sea-quotation/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/sea-quotation/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/quotation/air-quotation': PERMISSION.NO_VIEW,
      '/quotation/air-quotation/create': PERMISSION.NO_VIEW,
      '/quotation/air-quotation/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/air-quotation/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/quotation/customs-quotation': PERMISSION.NO_VIEW,
      '/quotation/customs-quotation/create': PERMISSION.NO_VIEW,
      '/quotation/customs-quotation/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/customs-quotation/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/quotation/trucking-quotation': PERMISSION.NO_VIEW,
      '/quotation/trucking-quotation/create': PERMISSION.NO_VIEW,
      '/quotation/trucking-quotation/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/trucking-quotation/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/booking': PERMISSION.NO_VIEW,
      '/booking/fcl-detail/[id]': PERMISSION.NO_VIEW,
      '/booking/lcl-detail/[id]': PERMISSION.NO_VIEW,

      '/pricing/fee-group': PERMISSION.VIEW,
      '/pricing/fee-group/create': PERMISSION.EDIT,
      '/pricing/fee-group/edit/[id]': PERMISSION.VIEW,
      '/pricing/fee-group/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/pricing/pricing-sea': PERMISSION.VIEW,
      '/pricing/pricing-sea/create': PERMISSION.EDIT,
      '/pricing/pricing-sea/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-sea/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/pricing/pricing-air': PERMISSION.VIEW,
      '/pricing/pricing-air/create': PERMISSION.EDIT,
      '/pricing/pricing-air/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-air/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/pricing/pricing-customs': PERMISSION.VIEW,
      '/pricing/pricing-customs/create': PERMISSION.EDIT,
      '/pricing/pricing-customs/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-customs/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/pricing/pricing-trucking': PERMISSION.EDIT,
      '/pricing/pricing-trucking/create': PERMISSION.EDIT,
      '/pricing/pricing-trucking/edit/[id]': PERMISSION.EDIT,
      '/pricing/pricing-trucking/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/partner': PERMISSION.NO_VIEW,
      '/partner/create': PERMISSION.NO_VIEW,
      '/partner/edit/[id]': PERMISSION.NO_VIEW,
      '/partner/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/location-catalog/type-of-location': PERMISSION.NO_VIEW,
      '/master-data/location-catalog/type-of-location/create':
        PERMISSION.NO_VIEW,
      '/master-data/location-catalog/type-of-location/edit/[id]':
        PERMISSION.NO_VIEW,
      '/master-data/location-catalog/type-of-location/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/location-catalog/location': PERMISSION.NO_VIEW,
      '/master-data/location-catalog/location/create': PERMISSION.NO_VIEW,
      '/master-data/location-catalog/location/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/location-catalog/location/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/declaration-catalog/type-of-declaration':
        PERMISSION.NO_VIEW,
      '/master-data/declaration-catalog/type-of-declaration/create':
        PERMISSION.NO_VIEW,
      '/master-data/declaration-catalog/type-of-declaration/edit/[id]':
        PERMISSION.NO_VIEW,
      '/master-data/declaration-catalog/type-of-declaration/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/load-capacity-catalog/type-of-load-capacity':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/type-of-load-capacity/create':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/type-of-load-capacity/edit/[id]':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/type-of-load-capacity/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/load-capacity-catalog/load-capacity': PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/load-capacity/create':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/load-capacity/edit/[id]':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/load-capacity/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/unit-catalog/unit': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/unit/create': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/unit/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/unit/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/unit-catalog/type-unit': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/type-unit/create': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/type-unit/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/type-unit/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/accountant/currency': PERMISSION.NO_VIEW,
      '/master-data/accountant/currency/create': PERMISSION.NO_VIEW,
      '/master-data/accountant/currency/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/accountant/currency/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/accountant/bank': PERMISSION.NO_VIEW,
      '/master-data/accountant/bank/create': PERMISSION.NO_VIEW,
      '/master-data/accountant/bank/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/accountant/bank/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/fee-catalog/fee': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/fee/create': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/fee/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/fee/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/fee-catalog/type-fee': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee/create': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/fee-group': PERMISSION.NO_VIEW,
      '/master-data/fee-group/create': PERMISSION.NO_VIEW,
      '/master-data/fee-group/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/fee-group/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/fee-catalog/type-fee-group': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee-group/create': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee-group/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee-group/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/commodity': PERMISSION.NO_VIEW,
      '/master-data/commodity/create': PERMISSION.NO_VIEW,
      '/master-data/commodity/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/commodity/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/type-of-container': PERMISSION.NO_VIEW,
      '/master-data/type-of-container/create': PERMISSION.NO_VIEW,
      '/master-data/type-of-container/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/type-of-container/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/system/user': PERMISSION.NO_VIEW,
      '/system/user/create': PERMISSION.NO_VIEW,
      '/system/user/edit/[id]': PERMISSION.NO_VIEW,
      '/system/user/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/system/staff': PERMISSION.NO_VIEW,
      '/system/staff/create': PERMISSION.NO_VIEW,
      '/system/staff/edit/[id]': PERMISSION.NO_VIEW,
      '/system/staff/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/system/permission': PERMISSION.NO_VIEW,
      '/system/permission/create': PERMISSION.NO_VIEW,
      '/system/permission/edit/[id]': PERMISSION.NO_VIEW,
      '/system/permission/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/sale-activity/': PERMISSION.NO_VIEW,
      '/sale-activity/create': PERMISSION.NO_VIEW,
      '/sale-activity/edit/[id]': PERMISSION.NO_VIEW,
      '/sale-activity/manager-admin/[id]': PERMISSION.NO_VIEW,
    },
    LINER: {
      '/quotation/fee-group': PERMISSION.NO_VIEW,
      '/quotation/fee-group/create': PERMISSION.NO_VIEW,
      '/quotation/fee-group/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/fee-group/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/quotation/sea-quotation': PERMISSION.NO_VIEW,
      '/quotation/sea-quotation/create': PERMISSION.NO_VIEW,
      '/quotation/sea-quotation/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/sea-quotation/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/quotation/air-quotation': PERMISSION.NO_VIEW,
      '/quotation/air-quotation/create': PERMISSION.NO_VIEW,
      '/quotation/air-quotation/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/air-quotation/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/quotation/customs-quotation': PERMISSION.NO_VIEW,
      '/quotation/customs-quotation/create': PERMISSION.NO_VIEW,
      '/quotation/customs-quotation/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/customs-quotation/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/quotation/trucking-quotation': PERMISSION.NO_VIEW,
      '/quotation/trucking-quotation/create': PERMISSION.NO_VIEW,
      '/quotation/trucking-quotation/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/trucking-quotation/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/booking': PERMISSION.NO_VIEW,
      '/booking/fcl-detail/[id]': PERMISSION.NO_VIEW,
      '/booking/lcl-detail/[id]': PERMISSION.NO_VIEW,

      '/pricing/fee-group': PERMISSION.VIEW,
      '/pricing/fee-group/create': PERMISSION.EDIT,
      '/pricing/fee-group/edit/[id]': PERMISSION.VIEW,
      '/pricing/fee-group/manager-admin/[id]': PERMISSION.VIEW,

      '/pricing/pricing-sea': PERMISSION.VIEW,
      '/pricing/pricing-sea/create': PERMISSION.EDIT,
      '/pricing/pricing-sea/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-sea/manager-admin/[id]': PERMISSION.VIEW,

      '/pricing/pricing-air': PERMISSION.VIEW,
      '/pricing/pricing-air/create': PERMISSION.EDIT,
      '/pricing/pricing-air/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-air/manager-admin/[id]': PERMISSION.VIEW,

      '/pricing/pricing-customs': PERMISSION.VIEW,
      '/pricing/pricing-customs/create': PERMISSION.EDIT,
      '/pricing/pricing-customs/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-customs/manager-admin/[id]': PERMISSION.VIEW,

      '/pricing/pricing-trucking': PERMISSION.EDIT,
      '/pricing/pricing-trucking/create': PERMISSION.EDIT,
      '/pricing/pricing-trucking/edit/[id]': PERMISSION.EDIT,
      '/pricing/pricing-trucking/manager-admin/[id]': PERMISSION.VIEW,

      '/partner': PERMISSION.NO_VIEW,
      '/partner/create': PERMISSION.NO_VIEW,
      '/partner/edit/[id]': PERMISSION.NO_VIEW,
      '/partner/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/location-catalog/type-of-location': PERMISSION.NO_VIEW,
      '/master-data/location-catalog/type-of-location/create':
        PERMISSION.NO_VIEW,
      '/master-data/location-catalog/type-of-location/edit/[id]':
        PERMISSION.NO_VIEW,
      '/master-data/location-catalog/type-of-location/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/location-catalog/location': PERMISSION.NO_VIEW,
      '/master-data/location-catalog/location/create': PERMISSION.NO_VIEW,
      '/master-data/location-catalog/location/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/location-catalog/location/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/declaration-catalog/type-of-declaration':
        PERMISSION.NO_VIEW,
      '/master-data/declaration-catalog/type-of-declaration/create':
        PERMISSION.NO_VIEW,
      '/master-data/declaration-catalog/type-of-declaration/edit/[id]':
        PERMISSION.NO_VIEW,
      '/master-data/declaration-catalog/type-of-declaration/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/load-capacity-catalog/type-of-load-capacity':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/type-of-load-capacity/create':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/type-of-load-capacity/edit/[id]':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/type-of-load-capacity/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/load-capacity-catalog/load-capacity': PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/load-capacity/create':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/load-capacity/edit/[id]':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/load-capacity/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/unit-catalog/unit': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/unit/create': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/unit/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/unit/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/unit-catalog/type-unit': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/type-unit/create': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/type-unit/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/type-unit/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/accountant/currency': PERMISSION.NO_VIEW,
      '/master-data/accountant/currency/create': PERMISSION.NO_VIEW,
      '/master-data/accountant/currency/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/accountant/currency/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/accountant/bank': PERMISSION.NO_VIEW,
      '/master-data/accountant/bank/create': PERMISSION.NO_VIEW,
      '/master-data/accountant/bank/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/accountant/bank/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/fee-catalog/fee': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/fee/create': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/fee/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/fee/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/fee-catalog/type-fee': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee/create': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/fee-group': PERMISSION.NO_VIEW,
      '/master-data/fee-group/create': PERMISSION.NO_VIEW,
      '/master-data/fee-group/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/fee-group/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/fee-catalog/type-fee-group': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee-group/create': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee-group/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee-group/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/commodity': PERMISSION.NO_VIEW,
      '/master-data/commodity/create': PERMISSION.NO_VIEW,
      '/master-data/commodity/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/commodity/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/type-of-container': PERMISSION.NO_VIEW,
      '/master-data/type-of-container/create': PERMISSION.NO_VIEW,
      '/master-data/type-of-container/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/type-of-container/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/system/user': PERMISSION.NO_VIEW,
      '/system/user/create': PERMISSION.NO_VIEW,
      '/system/user/edit/[id]': PERMISSION.NO_VIEW,
      '/system/user/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/system/staff': PERMISSION.NO_VIEW,
      '/system/staff/create': PERMISSION.NO_VIEW,
      '/system/staff/edit/[id]': PERMISSION.NO_VIEW,
      '/system/staff/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/system/permission': PERMISSION.NO_VIEW,
      '/system/permission/create': PERMISSION.NO_VIEW,
      '/system/permission/edit/[id]': PERMISSION.NO_VIEW,
      '/system/permission/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/sale-activity/': PERMISSION.NO_VIEW,
      '/sale-activity/create': PERMISSION.NO_VIEW,
      '/sale-activity/edit/[id]': PERMISSION.NO_VIEW,
      '/sale-activity/manager-admin/[id]': PERMISSION.NO_VIEW,
    },
    AIR_LINER: {
      '/quotation/fee-group': PERMISSION.NO_VIEW,
      '/quotation/fee-group/create': PERMISSION.NO_VIEW,
      '/quotation/fee-group/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/fee-group/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/quotation/sea-quotation': PERMISSION.NO_VIEW,
      '/quotation/sea-quotation/create': PERMISSION.NO_VIEW,
      '/quotation/sea-quotation/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/sea-quotation/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/quotation/air-quotation': PERMISSION.NO_VIEW,
      '/quotation/air-quotation/create': PERMISSION.NO_VIEW,
      '/quotation/air-quotation/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/air-quotation/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/quotation/customs-quotation': PERMISSION.NO_VIEW,
      '/quotation/customs-quotation/create': PERMISSION.NO_VIEW,
      '/quotation/customs-quotation/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/customs-quotation/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/quotation/trucking-quotation': PERMISSION.NO_VIEW,
      '/quotation/trucking-quotation/create': PERMISSION.NO_VIEW,
      '/quotation/trucking-quotation/edit/[id]': PERMISSION.NO_VIEW,
      '/quotation/trucking-quotation/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/booking': PERMISSION.NO_VIEW,
      '/booking/fcl-detail/[id]': PERMISSION.NO_VIEW,
      '/booking/lcl-detail/[id]': PERMISSION.NO_VIEW,

      '/pricing/fee-group': PERMISSION.VIEW,
      '/pricing/fee-group/create': PERMISSION.EDIT,
      '/pricing/fee-group/edit/[id]': PERMISSION.VIEW,
      '/pricing/fee-group/manager-admin/[id]': PERMISSION.VIEW,

      '/pricing/pricing-sea': PERMISSION.VIEW,
      '/pricing/pricing-sea/create': PERMISSION.EDIT,
      '/pricing/pricing-sea/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-sea/manager-admin/[id]': PERMISSION.VIEW,

      '/pricing/pricing-air': PERMISSION.VIEW,
      '/pricing/pricing-air/create': PERMISSION.EDIT,
      '/pricing/pricing-air/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-air/manager-admin/[id]': PERMISSION.VIEW,

      '/pricing/pricing-customs': PERMISSION.VIEW,
      '/pricing/pricing-customs/create': PERMISSION.EDIT,
      '/pricing/pricing-customs/edit/[id]': PERMISSION.VIEW,
      '/pricing/pricing-customs/manager-admin/[id]': PERMISSION.VIEW,

      '/pricing/pricing-trucking': PERMISSION.EDIT,
      '/pricing/pricing-trucking/create': PERMISSION.EDIT,
      '/pricing/pricing-trucking/edit/[id]': PERMISSION.EDIT,
      '/pricing/pricing-trucking/manager-admin/[id]': PERMISSION.VIEW,

      '/partner': PERMISSION.NO_VIEW,
      '/partner/create': PERMISSION.NO_VIEW,
      '/partner/edit/[id]': PERMISSION.NO_VIEW,
      '/partner/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/location-catalog/type-of-location': PERMISSION.NO_VIEW,
      '/master-data/location-catalog/type-of-location/create':
        PERMISSION.NO_VIEW,
      '/master-data/location-catalog/type-of-location/edit/[id]':
        PERMISSION.NO_VIEW,
      '/master-data/location-catalog/type-of-location/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/location-catalog/location': PERMISSION.NO_VIEW,
      '/master-data/location-catalog/location/create': PERMISSION.NO_VIEW,
      '/master-data/location-catalog/location/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/location-catalog/location/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/declaration-catalog/type-of-declaration':
        PERMISSION.NO_VIEW,
      '/master-data/declaration-catalog/type-of-declaration/create':
        PERMISSION.NO_VIEW,
      '/master-data/declaration-catalog/type-of-declaration/edit/[id]':
        PERMISSION.NO_VIEW,
      '/master-data/declaration-catalog/type-of-declaration/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/load-capacity-catalog/type-of-load-capacity':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/type-of-load-capacity/create':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/type-of-load-capacity/edit/[id]':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/type-of-load-capacity/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/load-capacity-catalog/load-capacity': PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/load-capacity/create':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/load-capacity/edit/[id]':
        PERMISSION.NO_VIEW,
      '/master-data/load-capacity-catalog/load-capacity/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/unit-catalog/unit': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/unit/create': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/unit/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/unit/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/unit-catalog/type-unit': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/type-unit/create': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/type-unit/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/unit-catalog/type-unit/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/accountant/currency': PERMISSION.NO_VIEW,
      '/master-data/accountant/currency/create': PERMISSION.NO_VIEW,
      '/master-data/accountant/currency/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/accountant/currency/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/accountant/bank': PERMISSION.NO_VIEW,
      '/master-data/accountant/bank/create': PERMISSION.NO_VIEW,
      '/master-data/accountant/bank/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/accountant/bank/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/fee-catalog/fee': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/fee/create': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/fee/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/fee/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/fee-catalog/type-fee': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee/create': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/fee-group': PERMISSION.NO_VIEW,
      '/master-data/fee-group/create': PERMISSION.NO_VIEW,
      '/master-data/fee-group/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/fee-group/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/fee-catalog/type-fee-group': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee-group/create': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee-group/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/fee-catalog/type-fee-group/manager-admin/[id]':
        PERMISSION.NO_VIEW,

      '/master-data/commodity': PERMISSION.NO_VIEW,
      '/master-data/commodity/create': PERMISSION.NO_VIEW,
      '/master-data/commodity/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/commodity/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/master-data/type-of-container': PERMISSION.NO_VIEW,
      '/master-data/type-of-container/create': PERMISSION.NO_VIEW,
      '/master-data/type-of-container/edit/[id]': PERMISSION.NO_VIEW,
      '/master-data/type-of-container/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/system/user': PERMISSION.NO_VIEW,
      '/system/user/create': PERMISSION.NO_VIEW,
      '/system/user/edit/[id]': PERMISSION.NO_VIEW,
      '/system/user/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/system/staff': PERMISSION.NO_VIEW,
      '/system/staff/create': PERMISSION.NO_VIEW,
      '/system/staff/edit/[id]': PERMISSION.NO_VIEW,
      '/system/staff/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/system/permission': PERMISSION.NO_VIEW,
      '/system/permission/create': PERMISSION.NO_VIEW,
      '/system/permission/edit/[id]': PERMISSION.NO_VIEW,
      '/system/permission/manager-admin/[id]': PERMISSION.NO_VIEW,

      '/sale-activity/': PERMISSION.NO_VIEW,
      '/sale-activity/create': PERMISSION.NO_VIEW,
      '/sale-activity/edit/[id]': PERMISSION.NO_VIEW,
      '/sale-activity/manager-admin/[id]': PERMISSION.NO_VIEW,
    },
  };
};
