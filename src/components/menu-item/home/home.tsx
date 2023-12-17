import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import ChartPricing from './chart-pricing';
import RankMember from './rank-member';
import { useQuery } from '@tanstack/react-query';
import { API_CHART } from '@/fetcherAxios/endpoint';
import { getChartInformation } from './fetcher';
import { IAslTopSale, IDataInformation } from './interface';
import { formatDateMMDD } from '@/utils/format';

export default function DashboardPage() {
  const [responsive, setResponsive] = useState(false);
  const [dataInformation, setDataInformation] = useState<IDataInformation>();
  const [data, setListData] = useState<string[]>([]);
  const [labels, setListLabel] = useState<string[]>([]);
  const [dataQuotation, setListDataQuotation] = useState<string[]>([]);
  const [dataPricing, setListDataPricing] = useState<string[]>([]);
  const [dataTopASL, setListTopASL] = useState<IAslTopSale[]>([]);
  const today = new Date();

  useQuery({
    queryKey: [API_CHART.GET_INFORMATION_DRAW_CHART],
    queryFn: () => getChartInformation(),
    onSuccess: (dataIf) => {
      if (dataIf.status) {
        if (dataIf.status) {
          setDataInformation(dataIf.data);
          setListLabel(
            dataIf.data.bookingForChartDTOs.map(
              (d) => `${formatDateMMDD(Number(d.date))}`
            )
          );
          setListData(
            dataIf.data.bookingForChartDTOs.map((d) => `${d.totalBooking}`)
          );
          setListDataQuotation(
            dataIf.data.quotationForChartDTOs.map((d) => `${d.totalQuotation}`)
          );
          setListDataPricing(
            dataIf.data.pricingForChartDTOs.map((d) => `${d.totalPricing}`)
          );
          setListTopASL(dataIf.data.aslTopSale);
        }
      }
    },
  });
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
                    title: 'Total Pricing',
                    value: dataInformation?.totalPricing,
                    // description: (
                    //   <Statistic title="Growth" value="8.04%" trend="down" />
                    // ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total Quotation',
                    value: dataInformation?.totalQuoation,
                    // description: (
                    //   <Statistic title="Growth" value="8.04%" trend="up" />
                    // ),
                  }}
                />
              </ProCard>
              <ProCard split="vertical">
                <StatisticCard
                  statistic={{
                    title: 'Total Booking',
                    value: dataInformation?.totalBooking,
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total User',
                    value: dataInformation?.totalUser,
                  }}
                />
              </ProCard>
            </ProCard>
            <StatisticCard
              title="Chart overview"
              chart={
                <ChartPricing
                  data={data}
                  labels={labels}
                  dataQuotation={dataQuotation}
                  dataPricing={dataPricing}
                />
              }
            />
          </ProCard>
          <StatisticCard
            title="Ranking"
            chart={<RankMember dataTopASL={dataTopASL} />}
          />
        </ProCard>
      </RcResizeObserver>
    </div>
  );
}
