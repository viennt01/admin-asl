import { ProCard, Statistic, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import ChartPricing from './chart-pricing';
import RankMember from './rank-member';
import { useQuery } from '@tanstack/react-query';
import { API_CHART } from '@/fetcherAxios/endpoint';
import { getChartInformation } from './fetcher';
import {
  IAslTopSale,
  ICustomerTopBooking,
  IDataInformation,
} from './interface';
import { formatDateMMDD } from '@/utils/format';
import style from './home.module.scss';
import { Badge, Collapse, Typography } from 'antd';
import RankCustomer from './rank-customer';

const initalValue = {
  totalPricing: 0,
  totalNewPricingInMonth: 0,
  totalQuotation: 0,
  totalNewQuotationInMonth: 0,
  totalBooking: 0,
  totalBookingInMonth: 0,
  totalBookingSuccess: 0,
  totalBookingSuccessInMonth: 0,
  totalUser: 0,
  totalPartner: 0,
  totalNewPartnerInMonth: 0,
  totalCutomer: 0,
  totalNewCutomerInMonth: 0,
  totalASLMember: 0,
  totalNewASLMemberInMonth: 0,
  pricingForChartDTOs: [],
  quotationForChartDTOs: [],
  bookingForChartDTOs: [],
  aslTopSaleInMonth: [],
  totalSeaPricing: 0,
  totalNewSeaPricingInMonth: 0,
  totalSeaQuotation: 0,
  totalNewSeaQuotationInMonth: 0,
  seaPricingForChartDTOs: [],
  seaQuotationForChartDTOs: [],
  seaBookingForChartDTOs: [],
  totalAirPricing: 0,
  totalNewAirPricingInMonth: 0,
  totalAirQuotation: 0,
  totalNewAirQuotationInMonth: 0,
  airPricingForChartDTOs: [],
  airQuotationForChartDTOs: [],
  airBookingForChartDTOs: [],
  totalTruckPricing: 0,
  totalNewTruckPricingInMonth: 0,
  totalTruckQuotation: 0,
  totalNewTruckQuotationInMonth: 0,
  truckingPricingForChartDTOs: [],
  truckingQuotationForChartDTOs: [],
  truckBookingForChartDTOs: [],
  totalCustomPricing: 0,
  totalNewCustomPricingInMonth: 0,
  totalCustomQuotation: 0,
  totalNewCustomQuotationInMonth: 0,
  customPricingForChartDTOs: [],
  customQuotationForChartDTOs: [],
  customerTopBooking: [],
};

const { Panel } = Collapse;

const { Title } = Typography;
export default function DashboardPage() {
  const [responsive, setResponsive] = useState(false);
  const [dataInformation, setDataInformation] =
    useState<IDataInformation>(initalValue);
  const [labels, setListLabel] = useState<string[]>([]);
  const [data, setListData] = useState<string[]>([]);
  const [dataQuotation, setListDataQuotation] = useState<string[]>([]);
  const [dataPricing, setListDataPricing] = useState<string[]>([]);
  const [listSeaBooking, setListSeaBooking] = useState<string[]>([]);
  const [dataSeaQuotation, setListDataSeaQuotation] = useState<string[]>([]);
  const [dataSeaPricing, setListDataSeaPricing] = useState<string[]>([]);

  const [listAirBooking, setListAirBooking] = useState<string[]>([]);
  const [dataAirQuotation, setListDataAirQuotation] = useState<string[]>([]);
  const [dataAirPricing, setListDataAirPricing] = useState<string[]>([]);

  const [listTruckBooking, setListTruckBooking] = useState<string[]>([]);
  const [dataTruckQuotation, setListDataTruckQuotation] = useState<string[]>(
    []
  );
  const [dataTruckPricing, setListDataTruckPricing] = useState<string[]>([]);

  const [dataCustomQuotation, setListDataCustomQuotation] = useState<string[]>(
    []
  );
  const [dataCustomPricing, setListDataCustomPricing] = useState<string[]>([]);
  const [dataTopASL, setListTopASL] = useState<IAslTopSale[]>([]);
  const [dataTopCustomer, setListTopCustomer] = useState<ICustomerTopBooking[]>(
    []
  );
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
          setListSeaBooking(
            dataIf.data.seaBookingForChartDTOs.map((d) => `${d.totalBooking}`)
          );
          setListDataSeaQuotation(
            dataIf.data.seaQuotationForChartDTOs.map(
              (d) => `${d.totalQuotation}`
            )
          );
          setListDataSeaPricing(
            dataIf.data.seaPricingForChartDTOs.map((d) => `${d.totalPricing}`)
          );
          setListAirBooking(
            dataIf.data.airBookingForChartDTOs.map((d) => `${d.totalBooking}`)
          );
          setListDataAirQuotation(
            dataIf.data.airQuotationForChartDTOs.map(
              (d) => `${d.totalQuotation}`
            )
          );
          setListDataAirPricing(
            dataIf.data.airPricingForChartDTOs.map((d) => `${d.totalPricing}`)
          );
          setListTruckBooking(
            dataIf.data.truckBookingForChartDTOs.map((d) => `${d.totalBooking}`)
          );
          setListDataTruckQuotation(
            dataIf.data.truckingQuotationForChartDTOs.map(
              (d) => `${d.totalQuotation}`
            )
          );
          setListDataTruckPricing(
            dataIf.data.truckingPricingForChartDTOs.map(
              (d) => `${d.totalPricing}`
            )
          );
          setListDataCustomQuotation(
            dataIf.data.customQuotationForChartDTOs.map(
              (d) => `${d.totalQuotation}`
            )
          );
          setListDataCustomPricing(
            dataIf.data.customPricingForChartDTOs.map(
              (d) => `${d.totalPricing}`
            )
          );
          setListTopASL(dataIf.data.aslTopSaleInMonth);
          setListTopCustomer(dataIf.data.customerTopBooking);
        }
      }
    },
  });
  return (
    <div style={{ margin: '15px 0' }} className={style.wrapper}>
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
          <ProCard
            id="1"
            split="horizontal"
            colSpan={{
              xs: 24,
              sm: 24,
              md: 14,
              lg: 14,
              xl: 16,
              xxl: 18,
            }}
          >
            <ProCard split="horizontal">
              <ProCard split="vertical">
                <StatisticCard
                  statistic={{
                    title: 'Total Pricing',
                    value: dataInformation?.totalPricing,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalNewPricingInMonth /
                            dataInformation.totalPricing) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total Quotation',
                    value: dataInformation?.totalQuotation,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalNewQuotationInMonth /
                            dataInformation.totalQuotation) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                />
                {/* <StatisticCard
                  statistic={{
                    title: 'Total Booking',
                    value: dataInformation?.totalBooking,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalBookingInMonth /
                            dataInformation.totalBooking) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total Booking Successes',
                    value: dataInformation?.totalBookingSuccess,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalBookingSuccessInMonth /
                            dataInformation.totalBookingSuccess) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                /> */}
              </ProCard>
              <ProCard split="vertical">
                {/* <StatisticCard
                  statistic={{
                    title: 'Total Pricing',
                    value: dataInformation?.totalPricing,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalNewPricingInMonth /
                            dataInformation.totalPricing) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total Quotation',
                    value: dataInformation?.totalQuotation,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalNewQuotationInMonth /
                            dataInformation.totalQuotation) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                /> */}
                <StatisticCard
                  statistic={{
                    title: 'Total Booking',
                    value: dataInformation?.totalBooking,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalBookingInMonth /
                            dataInformation.totalBooking) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total Booking Successes',
                    value: dataInformation?.totalBookingSuccess,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalBookingSuccessInMonth /
                            dataInformation.totalBookingSuccess) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                />
              </ProCard>
              <ProCard split="vertical">
                <StatisticCard
                  statistic={{
                    title: 'Total Partner',
                    value: dataInformation?.totalPartner,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalNewPartnerInMonth /
                            dataInformation.totalPartner) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total Customer',
                    value: dataInformation?.totalCutomer,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalNewCutomerInMonth /
                            dataInformation.totalCutomer) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                />
                {/* <StatisticCard
                  statistic={{
                    title: 'Total ASL member',
                    value: dataInformation?.totalASLMember,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalNewASLMemberInMonth /
                            dataInformation.totalASLMember) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total User',
                    value: dataInformation?.totalUser,
                  }}
                /> */}
              </ProCard>
              <ProCard split="vertical">
                {/* <StatisticCard
                  statistic={{
                    title: 'Total Partner',
                    value: dataInformation?.totalPartner,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalNewPartnerInMonth /
                            dataInformation.totalPartner) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total Customer',
                    value: dataInformation?.totalCutomer,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalNewCutomerInMonth /
                            dataInformation.totalCutomer) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                /> */}
                <StatisticCard
                  statistic={{
                    title: 'Total ASL member',
                    value: dataInformation?.totalASLMember,
                    description: (
                      <Statistic
                        title="Growth"
                        value={`${(
                          (dataInformation.totalNewASLMemberInMonth /
                            dataInformation.totalASLMember) *
                          100
                        ).toFixed(2)}%`}
                        trend="up"
                      />
                    ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total User',
                    value: dataInformation?.totalUser,
                  }}
                />
              </ProCard>
              <ProCard split="vertical">
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
            </ProCard>
          </ProCard>
          <ProCard
            id="2"
            split="horizontal"
            colSpan={{
              xs: 24,
              sm: 24,
              md: 10,
              lg: 10,
              xl: 8,
              xxl: 6,
            }}
          >
            <StatisticCard
              title="Ranking sale"
              chart={<RankMember dataTopASL={dataTopASL} />}
            />
            <StatisticCard
              title="Ranking customer"
              chart={<RankCustomer dataTopASL={dataTopCustomer} />}
            />
          </ProCard>
        </ProCard>
      </RcResizeObserver>

      <Collapse
        style={{
          borderRadius: 4,
          background: 'white',
          border: 'none',
          margin: '16px 0',
        }}
        defaultActiveKey={1}
      >
        <Panel
          style={{
            borderRadius: 4,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white',
            border: 'none',
          }}
          forceRender
          header={
            <Badge count={0} style={{ marginRight: '-10px' }}>
              <Title level={5} style={{ margin: '-4px 0' }}>
                Chart sea
              </Title>
            </Badge>
          }
          key="1"
        >
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: 'Total sea pricing',
                  value: dataInformation?.totalSeaPricing,
                  description: (
                    <Statistic
                      title="Growth"
                      value={`${(
                        (dataInformation.totalNewSeaPricingInMonth /
                          dataInformation.totalSeaPricing) *
                        100
                      ).toFixed(2)}%`}
                      trend="up"
                    />
                  ),
                }}
              />
              <StatisticCard
                statistic={{
                  title: 'Total sea quotation',
                  value: dataInformation?.totalSeaQuotation,
                  description: (
                    <Statistic
                      title="Growth"
                      value={`${(
                        (dataInformation.totalNewSeaQuotationInMonth /
                          dataInformation.totalSeaQuotation) *
                        100
                      ).toFixed(2)}%`}
                      trend="up"
                    />
                  ),
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                title="Chart overview"
                chart={
                  <ChartPricing
                    data={listSeaBooking}
                    labels={labels}
                    dataQuotation={dataSeaQuotation}
                    dataPricing={dataSeaPricing}
                  />
                }
              />
            </ProCard>
          </ProCard>
        </Panel>
      </Collapse>

      <Collapse
        style={{
          borderRadius: 4,
          background: 'white',
          border: 'none',
          margin: '16px 0',
        }}
        defaultActiveKey={1}
      >
        <Panel
          style={{
            borderRadius: 4,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white',
            border: 'none',
          }}
          forceRender
          header={
            <Badge count={0} style={{ marginRight: '-10px' }}>
              <Title level={5} style={{ margin: '-4px 0' }}>
                Chart air
              </Title>
            </Badge>
          }
          key="1"
        >
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: 'Total air pricing',
                  value: dataInformation?.totalAirPricing,
                  description: (
                    <Statistic
                      title="Growth"
                      value={`${(
                        (dataInformation.totalNewAirPricingInMonth /
                          dataInformation.totalAirPricing) *
                        100
                      ).toFixed(2)}%`}
                      trend="up"
                    />
                  ),
                }}
              />
              <StatisticCard
                statistic={{
                  title: 'Total air quotation',
                  value: dataInformation?.totalAirQuotation,
                  description: (
                    <Statistic
                      title="Growth"
                      value={`${(
                        (dataInformation.totalNewAirQuotationInMonth /
                          dataInformation.totalAirQuotation) *
                        100
                      ).toFixed(2)}%`}
                      trend="up"
                    />
                  ),
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                title="Chart overview"
                chart={
                  <ChartPricing
                    data={listAirBooking}
                    labels={labels}
                    dataQuotation={dataAirQuotation}
                    dataPricing={dataAirPricing}
                  />
                }
              />
            </ProCard>
          </ProCard>
        </Panel>
      </Collapse>

      <Collapse
        style={{
          borderRadius: 4,
          background: 'white',
          border: 'none',
          margin: '16px 0',
        }}
        defaultActiveKey={1}
      >
        <Panel
          style={{
            borderRadius: 4,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white',
            border: 'none',
          }}
          forceRender
          header={
            <Badge count={0} style={{ marginRight: '-10px' }}>
              <Title level={5} style={{ margin: '-4px 0' }}>
                Chart truck
              </Title>
            </Badge>
          }
          key="1"
        >
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: 'Total truck pricing',
                  value: dataInformation?.totalTruckPricing,
                  description: (
                    <Statistic
                      title="Growth"
                      value={`${(
                        (dataInformation.totalNewTruckPricingInMonth /
                          dataInformation.totalTruckPricing) *
                        100
                      ).toFixed(2)}%`}
                      trend="up"
                    />
                  ),
                }}
              />
              <StatisticCard
                statistic={{
                  title: 'Total truck quotation',
                  value: dataInformation?.totalTruckQuotation,
                  description: (
                    <Statistic
                      title="Growth"
                      value={`${(
                        (dataInformation.totalNewTruckQuotationInMonth /
                          dataInformation.totalTruckQuotation) *
                        100
                      ).toFixed(2)}%`}
                      trend="up"
                    />
                  ),
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                title="Chart overview"
                chart={
                  <ChartPricing
                    data={listTruckBooking}
                    labels={labels}
                    dataQuotation={dataTruckQuotation}
                    dataPricing={dataTruckPricing}
                  />
                }
              />
            </ProCard>
          </ProCard>
        </Panel>
      </Collapse>

      <Collapse
        style={{
          borderRadius: 4,
          background: 'white',
          border: 'none',
          margin: '16px 0',
        }}
        defaultActiveKey={1}
      >
        <Panel
          style={{
            borderRadius: 4,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white',
            border: 'none',
          }}
          forceRender
          header={
            <Badge count={0} style={{ marginRight: '-10px' }}>
              <Title level={5} style={{ margin: '-4px 0' }}>
                Chart custom
              </Title>
            </Badge>
          }
          key="1"
        >
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: 'Total custom pricing',
                  value: dataInformation?.totalCustomPricing,
                  description: (
                    <Statistic
                      title="Growth"
                      value={`${(
                        (dataInformation.totalNewCustomPricingInMonth /
                          dataInformation.totalCustomPricing) *
                        100
                      ).toFixed(2)}%`}
                      trend="up"
                    />
                  ),
                }}
              />
              <StatisticCard
                statistic={{
                  title: 'Total custom quotation',
                  value: dataInformation?.totalCustomQuotation,
                  description: (
                    <Statistic
                      title="Growth"
                      value={`${(
                        (dataInformation.totalNewCustomQuotationInMonth /
                          dataInformation.totalCustomQuotation) *
                        100
                      ).toFixed(2)}%`}
                      trend="up"
                    />
                  ),
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                title="Chart overview"
                chart={
                  <ChartPricing
                    // data={listCustomBooking}
                    labels={labels}
                    dataQuotation={dataCustomQuotation}
                    dataPricing={dataCustomPricing}
                  />
                }
              />
            </ProCard>
          </ProCard>
        </Panel>
      </Collapse>
    </div>
  );
}
