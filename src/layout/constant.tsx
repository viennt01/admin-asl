import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import Link from 'next/link';

const SHOW_ROUTER_HEADER = () => {
  const { translate: translateCommon } = useI18n('common');

  return {
    '/home': [{ title: `${translateCommon('home')}` }],

    '/quotation/sea-quotation': [
      { title: `${translateCommon('quotation')}` },
      { title: `${translateCommon('sea_pricing')}` },
    ],
    '/quotation/sea-quotation/create': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.SEA_QUOTATION}>
            {translateCommon('sea_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/quotation/sea-quotation/edit/[id]': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.SEA_QUOTATION}>
            {translateCommon('sea_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/quotation/sea-quotation/manager-admin/[id]': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.SEA_QUOTATION}>
            {translateCommon('sea_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/quotation/air-quotation': [
      { title: `${translateCommon('quotation')}` },
      { title: `${translateCommon('air_pricing')}` },
    ],
    '/quotation/air-quotation/create': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.AIR_QUOTATION}>
            {translateCommon('air_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/quotation/air-quotation/edit/[id]': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.AIR_QUOTATION}>
            {translateCommon('air_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/quotation/air-quotation/manager-admin/[id]': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.AIR_QUOTATION}>
            {translateCommon('air_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/quotation/customs-quotation': [
      { title: `${translateCommon('quotation')}` },
      { title: `${translateCommon('customs_pricing')}` },
    ],
    '/quotation/customs-quotation/create': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.CUSTOMS_QUOTATION}>
            {translateCommon('customs_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/quotation/customs-quotation/edit/[id]': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.CUSTOMS_QUOTATION}>
            {translateCommon('customs_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/quotation/customs-quotation/manager-admin/[id]': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.CUSTOMS_QUOTATION}>
            {translateCommon('customs_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/quotation/trucking-quotation': [
      { title: `${translateCommon('quotation')}` },
      { title: `${translateCommon('trucking_pricing')}` },
    ],
    '/quotation/trucking-quotation/create': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.TRUCKING_QUOTATION}>
            {translateCommon('trucking_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/quotation/trucking-quotation/edit/[id]': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.TRUCKING_QUOTATION}>
            {translateCommon('trucking_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/quotation/trucking-quotation/manager-admin/[id]': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.TRUCKING_QUOTATION}>
            {translateCommon('trucking_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/quotation/quotation-all-in': [
      { title: `${translateCommon('quotation')}` },
      { title: `${translateCommon('quotation_all_in')}` },
    ],
    '/quotation/quotation-all-in/create': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.QUOTATION_ALL_IN}>
            {translateCommon('quotation_all_in')}
          </Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/quotation/quotation-all-in/edit/[id]': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.QUOTATION_ALL_IN}>
            {translateCommon('quotation_all_in')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/quotation/quotation-all-in/manager-admin/[id]': [
      { title: `${translateCommon('quotation')}` },
      {
        title: (
          <Link href={ROUTERS.QUOTATION_ALL_IN}>
            {translateCommon('quotation_all_in')}
          </Link>
        ),
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/booking': [{ title: `${translateCommon('booking')}` }],
    '/booking/create': [
      {
        title: <Link href={ROUTERS.BOOKING}>{translateCommon('booking')}</Link>,
      },
      { title: `${translateCommon('create')}` },
    ],
    '/booking/edit/[id]': [
      {
        title: <Link href={ROUTERS.BOOKING}>{translateCommon('booking')}</Link>,
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/booking/manager-admin/[id]': [
      {
        title: <Link href={ROUTERS.BOOKING}>{translateCommon('booking')}</Link>,
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/pricing/pricing-sea': [
      { title: `${translateCommon('pricing')}` },
      { title: `${translateCommon('sea_pricing')}` },
    ],
    '/pricing/pricing-sea/create': [
      { title: `${translateCommon('pricing')}` },
      {
        title: (
          <Link href={ROUTERS.SEA_PRICING}>
            {translateCommon('sea_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/pricing/pricing-sea/edit/[id]': [
      { title: `${translateCommon('pricing')}` },
      {
        title: (
          <Link href={ROUTERS.SEA_PRICING}>
            {translateCommon('sea_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/pricing/pricing-sea/manager-admin/[id]': [
      { title: `${translateCommon('pricing')}` },
      {
        title: (
          <Link href={ROUTERS.SEA_PRICING}>
            {translateCommon('sea_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/pricing/pricing-air': [
      { title: `${translateCommon('pricing')}` },
      { title: `${translateCommon('air_pricing')}` },
    ],
    '/pricing/pricing-air/create': [
      { title: `${translateCommon('pricing')}` },
      {
        title: (
          <Link href={ROUTERS.AIR_PRICING}>
            {translateCommon('air_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/pricing/pricing-air/edit/[id]': [
      { title: `${translateCommon('pricing')}` },
      {
        title: (
          <Link href={ROUTERS.AIR_PRICING}>
            {translateCommon('air_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/pricing/pricing-air/manager-admin/[id]': [
      { title: `${translateCommon('pricing')}` },
      {
        title: (
          <Link href={ROUTERS.AIR_PRICING}>
            {translateCommon('air_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/pricing/pricing-customs': [
      { title: `${translateCommon('pricing')}` },
      { title: `${translateCommon('customs_pricing')}` },
    ],
    '/pricing/pricing-customs/create': [
      { title: `${translateCommon('pricing')}` },
      {
        title: (
          <Link href={ROUTERS.CUSTOMS_PRICING}>
            {translateCommon('customs_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/pricing/pricing-customs/edit/[id]': [
      { title: `${translateCommon('pricing')}` },
      {
        title: (
          <Link href={ROUTERS.CUSTOMS_PRICING}>
            {translateCommon('customs_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/pricing/pricing-customs/manager-admin/[id]': [
      { title: `${translateCommon('pricing')}` },
      {
        title: (
          <Link href={ROUTERS.CUSTOMS_PRICING}>
            {translateCommon('customs_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/pricing/pricing-trucking': [
      { title: `${translateCommon('pricing')}` },
      { title: `${translateCommon('trucking_pricing')}` },
    ],
    '/pricing/pricing-trucking/create': [
      { title: `${translateCommon('pricing')}` },
      {
        title: (
          <Link href={ROUTERS.TRUCKING_PRICING}>
            {translateCommon('trucking_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/pricing/pricing-trucking/edit/[id]': [
      { title: `${translateCommon('pricing')}` },
      {
        title: (
          <Link href={ROUTERS.TRUCKING_PRICING}>
            {translateCommon('trucking_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/pricing/pricing-trucking/manager-admin/[id]': [
      { title: `${translateCommon('pricing')}` },
      {
        title: (
          <Link href={ROUTERS.TRUCKING_PRICING}>
            {translateCommon('trucking_pricing')}
          </Link>
        ),
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/partner': [{ title: `${translateCommon('partner')}` }],
    '/partner/create': [
      {
        title: <Link href={ROUTERS.PARTNER}>{translateCommon('partner')}</Link>,
      },
      { title: `${translateCommon('create')}` },
    ],
    '/partner/edit/[id]': [
      {
        title: <Link href={ROUTERS.PARTNER}>{translateCommon('partner')}</Link>,
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/partner/manager-admin/[id]': [
      {
        title: <Link href={ROUTERS.PARTNER}>{translateCommon('partner')}</Link>,
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/master-data/location-catalog/type-of-location': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('location_catalog')}` },
      { title: `${translateCommon('type_of_location')}` },
    ],
    '/master-data/location-catalog/type-of-location/create': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('location_catalog')}` },
      {
        title: (
          <Link href={ROUTERS.TYPE_OF_LOCATION}>
            {translateCommon('type_of_location')}
          </Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/master-data/location-catalog/type-of-location/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('location_catalog')}` },
      {
        title: (
          <Link href={ROUTERS.TYPE_OF_LOCATION}>
            {translateCommon('type_of_location')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/location-catalog/type-of-location/manager-admin/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('location_catalog')}` },
      {
        title: (
          <Link href={ROUTERS.TYPE_OF_LOCATION}>
            {translateCommon('type_of_location')}
          </Link>
        ),
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/master-data/location-catalog/location': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('location_catalog')}` },
      { title: `${translateCommon('location')}` },
    ],
    '/master-data/location-catalog/location/create': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('location_catalog')}` },
      {
        title: (
          <Link href={ROUTERS.LOCATION}>{translateCommon('location')}</Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/master-data/location-catalog/location/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('location_catalog')}` },
      {
        title: (
          <Link href={ROUTERS.LOCATION}>{translateCommon('location')}</Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/location-catalog/location/manager-admin/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('location_catalog')}` },
      {
        title: (
          <Link href={ROUTERS.LOCATION}>
            {translateCommon('request_for_approval')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],

    '/master-data/unit': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('unit')}` },
    ],
    '/master-data/unit/create': [
      { title: `${translateCommon('master_data')}` },
      { title: <Link href={ROUTERS.UNIT}>{translateCommon('unit')}</Link> },
      { title: `${translateCommon('create')}` },
    ],
    '/master-data/unit/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: <Link href={ROUTERS.UNIT}>{translateCommon('unit')}</Link> },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/unit/manager-admin/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: <Link href={ROUTERS.UNIT}>{translateCommon('unit')}</Link> },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/master-data/accountant/currency': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      { title: `${translateCommon('currency')}` },
    ],
    '/master-data/accountant/currency/create': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      {
        title: (
          <Link href={ROUTERS.CURRENCY}>{translateCommon('currency')}</Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/master-data/accountant/currency/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      {
        title: (
          <Link href={ROUTERS.CURRENCY}>{translateCommon('currency')}</Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/accountant/currency/manager-admin/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      {
        title: (
          <Link href={ROUTERS.CURRENCY}>{translateCommon('currency')}</Link>
        ),
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/master-data/accountant/bank': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      { title: `${translateCommon('bank')}` },
    ],
    '/master-data/accountant/bank/create': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      {
        title: <Link href={ROUTERS.BANK}>{translateCommon('bank')}</Link>,
      },
      { title: `${translateCommon('create')}` },
    ],
    '/master-data/accountant/bank/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      {
        title: <Link href={ROUTERS.BANK}>{translateCommon('bank')}</Link>,
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/accountant/bank/manager-admin/[id]': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('accountant')}` },
      {
        title: <Link href={ROUTERS.BANK}>{translateCommon('bank')}</Link>,
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/master-data/fee': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('fee')}` },
    ],
    '/master-data/fee/create': [
      { title: `${translateCommon('master_data')}` },
      {
        title: <Link href={ROUTERS.FEE}>{translateCommon('fee')}</Link>,
      },
      { title: `${translateCommon('create')}` },
    ],
    '/master-data/fee/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      {
        title: <Link href={ROUTERS.FEE}>{translateCommon('fee')}</Link>,
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/fee/manager-admin/[id]': [
      { title: `${translateCommon('master_data')}` },
      {
        title: <Link href={ROUTERS.FEE}>{translateCommon('fee')}</Link>,
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/master-data/commodity': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('commodity')}` },
    ],
    '/master-data/commodity/create': [
      { title: `${translateCommon('master_data')}` },
      {
        title: (
          <Link href={ROUTERS.COMMODITY}>{translateCommon('commodity')}</Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/master-data/commodity/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      {
        title: (
          <Link href={ROUTERS.COMMODITY}>{translateCommon('commodity')}</Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/commodity/manager-admin/[id]': [
      { title: `${translateCommon('master_data')}` },
      {
        title: (
          <Link href={ROUTERS.COMMODITY}>{translateCommon('commodity')}</Link>
        ),
      },
      { title: `${translateCommon('request_for_approval')}` },
    ],

    '/master-data/type-of-container': [
      { title: `${translateCommon('master_data')}` },
      {
        title: (
          <Link href={ROUTERS.TYPES_OF_CONTAINER}>
            {translateCommon('type_of_container')}
          </Link>
        ),
      },
      { title: `${translateCommon('type_of_container')}` },
    ],
    '/master-data/type-of-container/create': [
      { title: `${translateCommon('master_data')}` },
      { title: `${translateCommon('create')}` },
    ],
    '/master-data/type-of-container/edit/[id]': [
      { title: `${translateCommon('master_data')}` },
      {
        title: (
          <Link href={ROUTERS.TYPES_OF_CONTAINER}>
            {translateCommon('type_of_container')}
          </Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/master-data/type-of-container/manager-admin/[id]': [
      { title: `${translateCommon('master_data')}` },
      {
        title: (
          <Link href={ROUTERS.TYPES_OF_CONTAINER}>
            {translateCommon('type_of_container')}
          </Link>
        ),
      },
      { title: `${translateCommon('request_for_approval1')}` },
    ],

    '/system/user': [
      { title: `${translateCommon('system')}` },
      { title: `${translateCommon('user')}` },
    ],
    '/system/user/create': [
      { title: `${translateCommon('system')}` },
      {
        title: <Link href={ROUTERS.USER}>{translateCommon('user')}</Link>,
      },
      { title: `${translateCommon('create')}` },
    ],
    '/system/user/edit/[id]': [
      { title: `${translateCommon('system')}` },
      { title: <Link href={ROUTERS.USER}>{translateCommon('user')}</Link> },
      { title: `${translateCommon('detail')}` },
    ],
    '/system/user/manager-admin/[id]': [
      { title: `${translateCommon('system')}` },
      { title: <Link href={ROUTERS.USER}>{translateCommon('user')}</Link> },
      { title: `${translateCommon('request_for_approval1')}` },
    ],

    '/system/staff': [
      { title: `${translateCommon('system')}` },
      { title: `${translateCommon('staff')}` },
    ],
    '/system/staff/create': [
      { title: `${translateCommon('system')}` },
      { title: <Link href={ROUTERS.STAFF}>{translateCommon('staff')}</Link> },
      { title: `${translateCommon('create')}` },
    ],
    '/system/staff/edit/[id]': [
      { title: `${translateCommon('system')}` },
      { title: <Link href={ROUTERS.STAFF}>{translateCommon('staff')}</Link> },
      { title: `${translateCommon('detail')}` },
    ],
    '/system/staff/manager-admin/[id]': [
      { title: `${translateCommon('system')}` },
      { title: <Link href={ROUTERS.STAFF}>{translateCommon('staff')}</Link> },
      { title: `${translateCommon('request_for_approval1')}` },
    ],

    '/system/permission': [
      { title: `${translateCommon('system')}` },
      { title: `${translateCommon('permission')}` },
    ],
    '/system/permission/create': [
      { title: `${translateCommon('system')}` },
      {
        title: (
          <Link href={ROUTERS.PERMISSION}>{translateCommon('permission')}</Link>
        ),
      },
      { title: `${translateCommon('create')}` },
    ],
    '/system/permission/edit/[id]': [
      { title: `${translateCommon('system')}` },
      {
        title: (
          <Link href={ROUTERS.PERMISSION}>{translateCommon('permission')}</Link>
        ),
      },
      { title: `${translateCommon('detail')}` },
    ],
    '/system/permission/manager-admin/[id]': [
      { title: `${translateCommon('system')}` },
      {
        title: (
          <Link href={ROUTERS.PERMISSION}>{translateCommon('permission')}</Link>
        ),
      },
      { title: `${translateCommon('request_for_approval1')}` },
    ],

    '/404': [{ title: `${translateCommon('error')}` }],
  };
};

export default SHOW_ROUTER_HEADER;
