import React, { useEffect, useState } from 'react';
import { ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import TotalPrice, { DataTypeTotalPrice } from './totalPrice';
import { IDetailBooking } from '../interface';
import { formatNumber } from '@/utils/format';
import COLORS from '@/constant/color';

interface Props {
  dataPropsBooking: IDetailBooking | undefined;
}
interface DataType {
  key: number;
  description: string;
  quantity: string;
  price: string;
  currency: string;
  unit: string;
  vat: string;
  total: string;
}

export default function CustomsOtherChargesPOL({ dataPropsBooking }: Props) {
  const [data, setData] = useState<DataType[]>([]);
  const [dataToTalPrice, setDataTotalPrice] = useState<DataTypeTotalPrice[]>(
    []
  );
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
          Description of charges
        </div>
      ),
      dataIndex: 'description',
      key: 'description',
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
          Quantity
        </div>
      ),
      dataIndex: 'quantity',
      align: 'right',
      width: 95,
      key: 'quantity',
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
          Unit
        </div>
      ),
      dataIndex: 'unit',
      width: 95,
      key: 'unit',
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
          Price
        </div>
      ),
      align: 'right',
      dataIndex: 'price',
      key: 'price',
      width: 170,
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
          Currency
        </div>
      ),
      dataIndex: 'currency',
      width: 95,
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
          VAT
        </div>
      ),
      dataIndex: 'vat',
      align: 'right',
      width: 80,
      key: 'vat',
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
      fixed: 'right',
      align: 'right',
      dataIndex: 'total',
      key: 'total',
      width: 200,
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
  ];

  useEffect(() => {
    setData(
      dataPropsBooking?.customQuotationPOLSelected?.ortherChargeDetailForBookings?.map(
        (item, index) => ({
          key: index,
          description: item.description,
          quantity: item.quantity,
          price: item.price,
          currency: item.currency,
          unit: item.unit,
          vat: item.vat,
          total: item.totalAmount,
        })
      ) || []
    );
  }, [dataPropsBooking]);

  useEffect(() => {
    setDataTotalPrice(
      dataPropsBooking?.customQuotationPOLSelected?.sumOrtherChargeDetailForBooking?.map(
        (item, index) => ({
          key: index,
          price: `${item.item2} ${item.item1}`,
        })
      ) || []
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
          Customs broker other charges (ORIGIN)
        </div>
        <Table
          className={style.table}
          style={{ width: '100%' }}
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
        <TotalPrice dataToTalPrice={dataToTalPrice} />
      </div>
    </ConfigProvider>
  );
}
