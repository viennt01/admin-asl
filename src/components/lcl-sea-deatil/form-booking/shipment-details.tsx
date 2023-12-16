import React, { useEffect, useState } from 'react';
import { ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import { IDataBookingProps } from '..';
import { formatDate } from '@/utils/format';
import COLORS from '@/constant/color';
interface Props {
  dataPropsBooking: IDataBookingProps;
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
}
export default function ShipmentDetail({ dataPropsBooking }: Props) {
  const [data, setData] = useState<DataType[]>([]);
  const {
    modeOfTransportation,
    pol,
    pod,
    quotationNo,
    date,
    valitidyTo,
    commodity,
    seaBookingLCLDetailDTO,
  } = dataPropsBooking?.detailBooking?.shipmentDetail || {};

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'right',
      key: 'right',
      width: '50%',
      render: (text, record) => {
        return (
          <div style={{ flex: 1 }}>
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
              {record[text as keyof DataType]}
            </div>
          </div>
        );
      },
    },
    {
      dataIndex: 'left',
      key: 'left',
      width: '50%',
      render: (text, record) => {
        return (
          <div style={{ flex: 1 }}>
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
              {record[text as keyof DataType]}
            </div>
          </div>
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
        right: 'Port of loading',
        'Port of loading': pol || '',
        left: 'Date',
        Date: formatDate(Number(date)) || '',
      },
      {
        key: '3',
        right: 'Port of discharge',
        'Port of discharge': pod || '',
        left: 'Validity to',
        'Validity to': formatDate(Number(valitidyTo)) || '',
      },
      {
        key: '4',
        right: 'Commodity',
        Commodity: commodity || '',
        left: 'Gross weight',
        'Gross weight': seaBookingLCLDetailDTO?.gw || '',
      },
      {
        key: '5',
        right: 'CBM',
        CBM: seaBookingLCLDetailDTO?.gw || '',
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
            // borderColor: 'rgba(0, 0, 0, 1)',
            borderRadius: 0,
            borderRadiusLG: 0,
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
          Shipment details
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
