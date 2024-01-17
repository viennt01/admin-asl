import React, { useEffect, useState } from 'react';
import { Flex, ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import { IDetailBooking } from '../interface';
import { formatDateYYYYMMDD } from '@/utils/format';
import { DAY_WEEK } from '@/constant';
import COLORS from '@/constant/color';
interface Props {
  dataPropsBooking: IDetailBooking | undefined;
}
interface DataType {
  key: string;
  right: string;
  left: string;
  'Mode of transportation'?: string;
  'Port of loading'?: string;
  'Port of discharge'?: string;
  Commodity?: string;
  'Quotation no'?: string;
  Date?: string;
  'Validity to'?: string;
  'Gross weight'?: string;
  CBM?: string;
  Quantity?: string;
  'Date Booking'?: string;
  'Expire date'?: string;
  'Effective date'?: string;
  Frequency?: string;
  Storage?: string;
  Demurrage?: string;
  Detention?: string;
  'Transit time'?: string;
  'Shipping Lines'?: string;
  'Cargo ready'?: string;
  'Type of service'?: string;
}
export default function ShipmentDetail({ dataPropsBooking }: Props) {
  const [data, setData] = useState<DataType[]>([]);
  const {
    modeOfTransportation,
    pol,
    pod,
    quotationNo,
    bookingDated,
    valitidyTo,
    commodity,
    seaBookingLCLDetailDTO,
    bookingNo,
    cargoReadyDated,
    demSeaQuotation,
    detSeaQuotation,
    stoSeaQuotation,
    effectDated,
    freqDate,
    transitTimeSeaQuotation,
    typeOfServiceTransportation,
    vendorName,
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
        right: 'Port of loading',
        'Port of loading': pol || '',
        left: 'Port of discharge',
        'Port of discharge': pod || '',
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
        left: 'Cargo ready',
        'Cargo ready': formatDateYYYYMMDD(Number(cargoReadyDated)) || '',
      },
      {
        key: '5',
        right: 'Frequency',
        Frequency:
          DAY_WEEK.find((date) => date.value === freqDate)?.label || '',
        left: 'Storage',
        Storage: stoSeaQuotation || '',
      },
      {
        key: '6',
        right: 'Demurrage',
        Demurrage: demSeaQuotation || '',
        left: 'Detention',
        Detention: detSeaQuotation || '',
      },
      {
        key: '7',
        right: 'Transit time',
        'Transit time': transitTimeSeaQuotation || '',
        left: 'Commodity',
        Commodity: commodity || '',
      },
      {
        key: '9',
        right: 'CBM',
        CBM: seaBookingLCLDetailDTO?.cbm || '',
        left: 'Gross weight',
        'Gross weight': seaBookingLCLDetailDTO?.gw || '',
      },
      {
        key: '10',
        right: 'Shipping Lines',
        'Shipping Lines': vendorName || '',
        left: 'Quantity',
        Quantity:
          `${seaBookingLCLDetailDTO?.quantity} x ${seaBookingLCLDetailDTO?.internationalCode}` ||
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
          {formatDateYYYYMMDD(Number(bookingDated)) || ''}
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
