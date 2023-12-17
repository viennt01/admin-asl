import { useEffect, useRef, useState } from 'react';
import Chart, { ChartType } from 'chart.js/auto';
import router from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getChartPricing } from '../fetcher';
import { ROUTERS } from '@/constant/router';
import { API_CHART } from '@/fetcherAxios/endpoint';
import { formatDateMMDD } from '@/utils/format';

export default function ChartPricing() {
  const { id } = router.query;
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [labels, setListLabel] = useState<string[]>([]);
  const [data, setListData] = useState<string[]>([]);
  useQuery({
    queryKey: [API_CHART.GET_CHART_PRICING, id],
    queryFn: () => getChartPricing({ id: id as string }),
    enabled: id !== undefined,
    onSuccess: (dataPricing) => {
      if (dataPricing.status) {
        if (dataPricing.status) {
          setListLabel(
            dataPricing.data.map((d) => `${formatDateMMDD(Number(d.date))}`)
          );
          setListData(dataPricing.data.map((d) => `${d.totalPricing}`));
        }
      } else {
        router.push(ROUTERS.PARTNER);
      }
    },
  });

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Hủy biểu đồ cũ nếu tồn tại
        if (chartRef.current && 'chart' in chartRef.current) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (chartRef.current as { chart: ChartType }).chart.destroy();
        }

        // Tạo biểu đồ mới
        const chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Total Pricing',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
        });

        // Gán biểu đồ vào thuộc tính chart của chartRef.current
        if (chartRef.current) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (chartRef.current as { chart: ChartType }).chart = chart;
        }
      }
    }
  }, [data, labels]);

  return <canvas ref={chartRef} />;
}
