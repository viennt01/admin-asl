import { useEffect, useRef } from 'react';
import Chart, { ChartType } from 'chart.js/auto';

interface Props {
  data: string[];
  labels: string[];
  dataQuotation: string[];
  dataPricing: string[];
}

export default function ChartPricing({
  data,
  labels,
  dataQuotation,
  dataPricing,
}: Props) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

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
                label: 'Total Booking',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
              {
                label: 'Total Quotation',
                data: dataQuotation,
                backgroundColor: '#f2f3de',
                borderColor: '#f3ff00',
                borderWidth: 1,
              },
              {
                label: 'Total Pricing',
                data: dataPricing,
                backgroundColor: '#f5dbdb',
                borderColor: '#ff0000',
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
  }, [data, labels, dataQuotation, dataPricing]);

  return <canvas ref={chartRef} />;
}
