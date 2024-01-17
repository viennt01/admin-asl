import React from 'react';
import { ConfigProvider, Descriptions, Flex } from 'antd';
import type { DescriptionsProps } from 'antd';
import { formatCurrencyHasCurrency } from '@/utils/format';

interface Props {
  dataToTalPrice: DataTypeTotalPrice[];
}

export interface DataTypeTotalPrice {
  key: number;
  price?: string;
}

const TotalPrice = ({ dataToTalPrice }: Props) => {
  const items: DescriptionsProps['items'] = [
    {
      key: '10',
      span: 0,
      contentStyle: { width: '199px' }, // tổng px ở table
      label: (
        <Flex
          justify="center"
          style={{
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          Total charges
        </Flex>
      ),
      children: (
        <div>
          {dataToTalPrice?.map((data, index) => (
            <div
              key={data.key}
              style={{
                fontSize: '16px',
                fontWeight: '700',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom:
                  index === dataToTalPrice.length - 1 ? 'none' : '1px solid',
              }}
            >
              {formatCurrencyHasCurrency(data.price || '0')}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Descriptions: {
            padding: 0,
            paddingLG: 0,
            paddingSM: 0,
            paddingXS: 0,
          },
        },
      }}
    >
      <Descriptions
        style={{ width: '100%', padding: '0px', margin: '0px' }}
        bordered
        size="small"
        items={items}
      />
    </ConfigProvider>
  );
};

export default TotalPrice;
