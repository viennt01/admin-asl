import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Statistic } = StatisticCard;

export default function DashboardPage() {
  const [responsive, setResponsive] = useState(false);
  const today = new Date();
  return (
    <div style={{ margin: '15px 0' }}>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard
          title="Dashboard"
          extra={today.toLocaleDateString('vi-VN')}
          split={responsive ? 'horizontal' : 'vertical'}
          headerBordered
          bordered
        >
          <ProCard split="horizontal">
            <ProCard split="horizontal">
              <ProCard split="vertical">
                <StatisticCard
                  statistic={{
                    title: 'Total monthly revenue',
                    value: '234,123,1223',
                    description: (
                      <Statistic title="Growth" value="8.04%" trend="down" />
                    ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total annual revenue',
                    value: '234,123,1223',
                    description: (
                      <Statistic title="Growth" value="8.04%" trend="up" />
                    ),
                  }}
                />
              </ProCard>
              <ProCard split="vertical">
                <StatisticCard
                  statistic={{
                    title: 'Total number of existing customers',
                    value: '155620',
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total number of transactions available',
                    value: '1500',
                  }}
                />
              </ProCard>
            </ProCard>
            <StatisticCard
              title="PNL"
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/_dZIob2NB/zhuzhuangtu.svg"
                  width="100%"
                  alt="chart"
                />
              }
            />
          </ProCard>
          <StatisticCard
            title="Bình quân lợi nhuận"
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/qoYmFMxWY/jieping2021-03-29%252520xiawu4.32.34.png"
                alt="profit"
                width="100%"
              />
            }
          />
        </ProCard>
      </RcResizeObserver>
    </div>
  );
}
