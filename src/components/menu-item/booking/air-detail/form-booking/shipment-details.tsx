import React, { useEffect, useState } from 'react';
import { Flex, ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import { IDetailBooking } from '../interface';
import { formatDateYYYYMMDD, formatNumber } from '@/utils/format';
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
  AOL?: string;
  AOD?: string;
  Commodity?: string;
  'Quotation no'?: string;
  Date?: string;
  'Validity to'?: string;
  'Gross weight'?: string;
  CW?: string;
  Quantity?: string;
  'Date Booking'?: string;
  'Expire date'?: string;
  'Effective date'?: string;
  Frequency?: string;
  Storage?: string;
  SSC?: string;
  FSC?: string;
  'Transit time'?: string;
  'Air Line'?: string;
  'Cargo ready'?: string;
  'Cargo cutoff to'?: string;
  'Type of service'?: string;
  Delivery?: string;
  Receipt?: string;
  Note?: string;
}
export default function ShipmentDetail({ dataPropsBooking }: Props) {
  const [data, setData] = useState<DataType[]>([]);
  const {
    modeOfTransportation,
    aol,
    aod,
    quotationNo,
    bookingDated,
    valitidyTo,
    commodity,
    bookingNo,
    cargoReadyDated,
    sscAirQuotaiton,
    fscAirQuotaiton,
    placeOfDelivery,
    placeOfRecipt,
    effectDated,
    freqDate,
    transitTimeAirQuotation,
    typeOfServiceTransportation,
    vendorName,
    airBookingDetailDTO,
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
                width: '220px',
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
                width: '130px',
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
        left: 'Type of service',
        'Type of service': typeOfServiceTransportation || '',
      },
      {
        key: '2',
        right: 'AOL',
        AOL: aol || '',
        left: 'AOD',
        AOD: aod || '',
      },
      {
        key: '2.1',
        right: 'Receipt',
        Receipt: placeOfRecipt || '',
        left: 'Delivery',
        Delivery: placeOfDelivery || '',
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
        right: 'Quotation no',
        'Quotation no': quotationNo || '',
        left: 'Date Booking',
        'Date Booking': formatDateYYYYMMDD(Number(bookingDated)) || '',
      },
      {
        key: '6',
        right: 'SSC',
        SSC: formatNumber(sscAirQuotaiton || 0),
        left: 'FSC',
        FSC: formatNumber(fscAirQuotaiton || 0),
      },
      {
        key: '7',
        right: 'Transit time',
        'Transit time': transitTimeAirQuotation || '',
        left: 'Commodity',
        Commodity: commodity || '',
      },
      {
        key: '8',
        right: 'Cargo ready',
        'Cargo ready': formatDateYYYYMMDD(Number(cargoReadyDated)) || '',
        left: 'Frequency',
        Frequency:
          DAY_WEEK.find((date) => date.value === freqDate)?.label || '',
      },
      {
        key: '9',
        right: 'CW',
        CW: airBookingDetailDTO?.cw || '',
        left: 'Gross weight',
        'Gross weight': airBookingDetailDTO?.gw || '',
      },
      {
        key: '10',
        right: 'Air Line',
        'Air Line': vendorName || '',
        left: 'Quantity',
        Quantity:
          `${airBookingDetailDTO?.package} x ${airBookingDetailDTO?.quantityPackage}` ||
          '',
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
