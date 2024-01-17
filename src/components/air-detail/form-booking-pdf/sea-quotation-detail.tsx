import React, { useEffect, useState } from 'react';
import { ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import { IDetailBooking } from '../interface';
import { formatNumber } from '@/utils/format';
import COLORS from '@/constant/color';

interface Props {
  dataPropsBooking: IDetailBooking | undefined;
}
interface DataType {
  key: number;
  package: string;
  quantityPackage: string;
  gw: string;
  cw: string;
  currency: string;
  totalAmount: string;
}
export default function QuotationDetail({ dataPropsBooking }: Props) {
  const [data, setData] = useState<DataType[]>([]);
  const { currency, cw, gw, quantityPackage, totalAmount } =
    dataPropsBooking?.airQuotationSelected?.airQuotationDetailBooking || {};

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          No.
        </div>
      ),
      dataIndex: 'index',
      width: 50,
      align: 'center',
      fixed: 'right',
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          Quantity Package
        </div>
      ),
      dataIndex: 'quantityPackage',
      align: 'right',
      key: 'quantityPackage',
      render: (value) => {
        return value ? value : '-';
      },
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          Package
        </div>
      ),
      dataIndex: 'package',
      key: 'package',
      render: (value) => {
        return value ? value : '-';
      },
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          Currency
        </div>
      ),
      dataIndex: 'currency',
      key: 'currency',
      render: (value) => {
        return value ? value : '-';
      },
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          CW
        </div>
      ),
      dataIndex: 'cw',
      align: 'right',
      key: 'cw',
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          GW
        </div>
      ),
      dataIndex: 'gw',
      align: 'right',
      key: 'gw',
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          Total Amount
        </div>
      ),
      align: 'right',
      width: 200,
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
  ];

  useEffect(() => {
    setData(
      [
        {
          key: 1,
          package:
            dataPropsBooking?.airQuotationSelected?.airQuotationDetailBooking
              ?.package || '',
          quantityPackage: quantityPackage || '',
          cw: cw || '',
          gw: gw || '',
          currency: currency || '',
          totalAmount: totalAmount || '',
        },
      ] || []
    );
  }, [dataPropsBooking]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: '#e7eeff',
            headerColor: COLORS.GREY_COLOR_HOVER,
            borderColor: 'rgba(0, 0, 0, 1)',
            borderRadius: 0,
            borderRadiusLG: 0,
            padding: 8,
            paddingLG: 8,
            paddingSM: 8,
            paddingXS: 8,
          },
          Descriptions: {
            colorTextSecondary: COLORS.GREY_COLOR_HOVER,
            colorFillAlter: '#e7eeff',
            colorSplit: '#000',
            borderRadiusLG: 0,
          },
        },
      }}
    >
      <div
        className={style.cardCustomer}
        style={{
          marginBottom: '16px',
          display: data.length === 0 ? 'none' : '',
        }}
      >
        <div
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
          Freight charges
        </div>
        <Table
          style={{ width: '100%' }}
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          // scroll={{
          //   x: 'max-content',
          // }}
        />
      </div>
    </ConfigProvider>
  );
}
