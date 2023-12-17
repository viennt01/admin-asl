import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  IDataChartPricing,
  IDataInformation,
  IRequestChartPricing,
} from './interface';
import { API_CHART } from '@/fetcherAxios/endpoint';

//add chart pricing
export const getChartPricing = (data: IRequestChartPricing) => {
  return post<IRequestChartPricing, ResponseWithPayload<IDataChartPricing[]>>({
    data,
  })(API_CHART.GET_CHART_PRICING);
};
export const getChartInformation = () => {
  return post<undefined, ResponseWithPayload<IDataInformation>>({})(
    API_CHART.GET_INFORMATION_DRAW_CHART
  );
};
