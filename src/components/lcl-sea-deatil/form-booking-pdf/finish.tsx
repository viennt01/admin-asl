import React from 'react';
import style from '../index.module.scss';
import {
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Typography,
} from 'antd';
import { IDataBookingProps } from '..';
import COLORS from '@/constant/color';
const { Text } = Typography;

interface Props {
  dataPropsBooking: IDataBookingProps;
}

export default function Finish({ dataPropsBooking }: Props) {
  const { issuedBy, possition, email, tel } =
    dataPropsBooking?.detailBooking?.aslContactBooking || {};
  const items: DescriptionsProps['items'] = [
    {
      label: (
        <div style={{ fontSize: '14px', fontWeight: '720' }}>Issued by</div>
      ),
      children: (
        <div style={{ fontSize: '14px', fontWeight: '720' }}>
          {issuedBy || ''}
        </div>
      ),
    },
    {
      label: <div style={{ fontSize: '14px', fontWeight: '720' }}>Email</div>,
      children: (
        <div style={{ fontSize: '14px', fontWeight: '720' }}>{email || ''}</div>
      ),
    },
    {
      label: (
        <div style={{ fontSize: '14px', fontWeight: '720' }}>Possition</div>
      ),
      children: (
        <div style={{ fontSize: '14px', fontWeight: '720' }}>
          {' '}
          {possition?.join(' ') || ''}
        </div>
      ),
    },
    {
      label: <div style={{ fontSize: '14px', fontWeight: '720' }}>Mobile</div>,
      children: (
        <div style={{ fontSize: '14px', fontWeight: '720' }}> {tel || ''}</div>
      ),
    },
  ];

  return (
    <div className={style.finish} style={{ width: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <Text strong italic style={{ color: COLORS.GREY_COLOR_HOVER }}>
          ASL Logistics
        </Text>{' '}
        <Text>
          trust that the above quotation have met your requirement. Should you
          require any further assistance or clarification, please do not
          hesitate to contact the our pricing team or salesman as bellow
          signature issued.
        </Text>
      </div>
      <div>
        <ConfigProvider
          theme={{
            components: {
              Descriptions: {
                colorTextSecondary: COLORS.GREY_COLOR_HOVER,
                colorFillAlter: '#e7eeff',
                colorSplit: '#000',
                borderRadiusLG: 0,
              },
            },
          }}
        >
          <Descriptions
            style={{
              width: '100%',
              display: dataPropsBooking?.detailBooking?.aslContactBooking
                ? ''
                : 'none',
            }}
            bordered
            column={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
            items={items}
          />
        </ConfigProvider>
        <div
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: COLORS.GREY_COLOR_HOVER,
            color: COLORS.WHITE,
            fontSize: '18px',
            fontWeight: '700',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          THANK YOU FOR YOUR SUPPORTING TO ASL LOGISTICS
        </div>
      </div>
    </div>
  );
}
