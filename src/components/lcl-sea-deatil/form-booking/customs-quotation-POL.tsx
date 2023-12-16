import React, { useEffect, useState } from 'react';
import { ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import { IDataBookingProps } from '..';
import { formatNumber } from '@/utils/format';
import COLORS from '@/constant/color';

interface Props {
  dataPropsBooking: IDataBookingProps;
}
interface DataType {
  key: number;
  priceRedLane: string;
  priceYellowLane: string;
  priceGreenLane: string;
  vat: string;
  gw: string;
  cbm: string;
  totalRedLane: string;
  totalYellowLane: string;
  totalGreenLane: string;
}

export default function CustomsQuotationPOL({ dataPropsBooking }: Props) {
  const [data, setData] = useState<DataType[]>([]);
  const {
    priceRedLane,
    priceYellowLane,
    priceGreenLane,
    vat,
    gw,
    cbm,
    totalRedLane,
    totalYellowLane,
    totalGreenLane,
  } =
    dataPropsBooking?.detailBooking?.customQuotationPOLSelected
      .customQuotationLCLDetailSelecteds || {};
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
          CBM
        </div>
      ),
      dataIndex: 'cbm',
      key: 'cbm',
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
      key: 'gw',
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
      key: 'vat',
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
          Green Router
        </div>
      ),
      dataIndex: 'priceGreenLane',
      key: 'priceGreenLane',
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
          Yellow Router
        </div>
      ),
      dataIndex: 'priceYellowLane',
      key: 'priceYellowLane',
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
          Red Router
        </div>
      ),
      dataIndex: 'priceRedLane',
      key: 'priceRedLane',
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
          Total Green Router
        </div>
      ),
      dataIndex: 'totalGreenLane',
      key: 'totalGreenLane',
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
          Total Yellow Router
        </div>
      ),
      dataIndex: 'totalYellowLane',
      key: 'totalYellowLane',
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
          Total Red Router
        </div>
      ),
      dataIndex: 'totalGreenLane',
      key: 'totalGreenLane',
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
  ];

  useEffect(() => {
    if (
      dataPropsBooking?.detailBooking?.customQuotationPOLSelected
        ?.customQuotationLCLDetailSelecteds
    ) {
      setData([
        {
          key: 1,
          priceRedLane: priceRedLane || '',
          priceYellowLane: priceYellowLane || '',
          priceGreenLane: priceGreenLane || '',
          vat: vat || '',
          gw: gw || '',
          cbm: cbm || '',
          totalRedLane: totalRedLane || '',
          totalYellowLane: totalYellowLane || '',
          totalGreenLane: totalGreenLane || '',
        },
      ]);
    }
  }, [dataPropsBooking]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            // headerBg: '#e7eeff',
            // headerColor: COLORS.GREY_COLOR_HOVER,
            // borderColor: 'rgba(0, 0, 0, 1)',
            borderRadius: 0,
            borderRadiusLG: 0,
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
          Customs service (ORIGIN)
        </div>
        <Table
          style={{ width: '100%' }}
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          scroll={{
            x: 'max-content',
          }}
        />
      </div>
    </ConfigProvider>
  );
}
