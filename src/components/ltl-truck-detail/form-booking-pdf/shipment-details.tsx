import React, { useEffect, useState } from 'react';
import { Flex, ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import { IDetailBooking } from '../interface';
import { formatDateYYYYMMDD } from '@/utils/format';
import COLORS from '@/constant/color';
import { DAY_WEEK } from '@/constant';

interface Props {
  dataPropsBooking: IDetailBooking | undefined;
}
interface DataType {
  key: string;
  right: string;
  left: string;
  'Mode of transportation'?: string;
  'Place of pick up'?: string;
  'Place of delivery'?: string;
  'Address of pick up'?: string;
  'Address of delivery'?: string;
  'Port of discharge'?: string;
  Commodity?: string;
  'Quotation no'?: string;
  'Date Booking'?: string;
  'Expire date'?: string;
  'Effective date'?: string;
  Frequency?: string;
  Storage?: string;
  Demurrage?: string;
  Detention?: string;
  'Transit time'?: string;
  Note?: string;
  'Cargo ready'?: string;
  Quantity?: string;
  'Gross weight'?: string;
  CBM?: string;
  Package?: string;
}
export default function ShipmentDetail({ dataPropsBooking }: Props) {
  const [data, setData] = useState<DataType[]>([]);
  const {
    modeOfTransportation,
    pickupName,
    deliveryName,
    quotationNo,
    bookingDated,
    valitidyTo,
    commodity,
    truckBookingLCLDetailDTO,
    bookingNo,
    cargoReadyDated,
    placeOfRecipt,
    placeOfDelivery,
    effectDated,
    freqDate,
    transitTimeTruckingQuotation,
  } = dataPropsBooking?.shipmentDetail || {};

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'right',
      key: 'right',
      width: '50%',
      render: (text, record) => {
        return (
          <Flex style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '700',
                width: '180px',
              }}
            >
              {text}:
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '400',
                // width: '80%',
              }}
            >
              {record[text as keyof DataType]
                ? record[text as keyof DataType]
                : '-'}
            </div>
          </Flex>
        );
      },
    },
    {
      dataIndex: 'left',
      key: 'left',
      width: '50%',
      render: (text, record) => {
        return (
          <Flex style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '700',
                width: '150px',
              }}
            >
              {text}:
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '400',
                // width: '80%',
              }}
            >
              {record[text as keyof DataType]
                ? record[text as keyof DataType]
                : '-'}
            </div>
          </Flex>
        );
      },
    },
  ];

  useEffect(() => {
    setData([
      {
        key: '1',
        right: 'Mode of transportation',
        'Mode of transportation': modeOfTransportation || '',
        left: 'Quotation no',
        'Quotation no': quotationNo || '',
      },
      {
        key: '2',
        right: 'Place of pick up',
        'Place of pick up': pickupName || '',
        left: 'Place of delivery',
        'Place of delivery': deliveryName || '',
      },
      {
        key: '2.1',
        right: 'Address of pick up',
        'Address of pick up': placeOfRecipt || '',
        left: 'Address of delivery',
        'Address of delivery': placeOfDelivery || '',
      },
      {
        key: '3',
        right: 'Effective date',
        'Effective date': formatDateYYYYMMDD(Number(effectDated)) || '',
        left: 'Expire date',
        'Expire date': formatDateYYYYMMDD(Number(valitidyTo)) || '',
      },
      {
        key: '4',
        right: 'Frequency',
        Frequency:
          DAY_WEEK.find((date) => date.value === freqDate)?.label || '',
        left: 'Cargo ready',
        'Cargo ready': formatDateYYYYMMDD(Number(cargoReadyDated)) || '',
      },
      {
        key: '7',
        right: 'Transit time',
        'Transit time': transitTimeTruckingQuotation || '',
        left: 'Commodity',
        Commodity: commodity || '',
      },
      {
        key: '9',
        right: 'CBM',
        CBM: truckBookingLCLDetailDTO?.cbm || '',
        left: 'Gross weight',
        'Gross weight': truckBookingLCLDetailDTO?.gw || '',
      },
      {
        key: '10',
        right: 'Package',
        Package:
          `${truckBookingLCLDetailDTO?.package} x ${truckBookingLCLDetailDTO?.quantityPackage}` ||
          '',
        left: 'Quantity',
        Quantity: `${truckBookingLCLDetailDTO?.internationalCode} x ${truckBookingLCLDetailDTO?.quantity}`,
      },
    ]);
  }, [dataPropsBooking]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            borderColor: 'rgba(0, 0, 0, 1)',
            borderRadius: 0,
            borderRadiusLG: 0,
            padding: 8,
            paddingLG: 8,
            paddingSM: 8,
            paddingXS: 8,
          },
        },
      }}
    >
      <div
        className={style.cardCustomer}
        style={{
          marginBottom: '16px',
        }}
      >
        <div
          className={style.cardCustomerHeader}
          style={{
            paddingLeft: '16px',
            backgroundColor: COLORS.GREY_COLOR_HOVER,
            border: '1px solid #1D4486',
            width: '100%',
            color: COLORS.WHITE,
            fontSize: '18px',
            fontWeight: 600,
            height: '50px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Booking details - {bookingNo} -{' '}
          {formatDateYYYYMMDD(Number(bookingDated))}
        </div>
        <Table
          style={{ width: '100%' }}
          columns={columns}
          dataSource={data}
          showHeader={false}
          pagination={false}
          bordered
        />
      </div>
    </ConfigProvider>
  );
}
