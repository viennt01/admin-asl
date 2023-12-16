import React, { useState } from 'react';
import Step5 from './components/step-5';
import {
  DEFAULT_PAGINATION,
  IDetailBooking,
  IQuotationTable,
  ISeaPricingDetail,
  IStep1,
  TYPE_SERVICE,
} from './interface';
import { useQuery } from '@tanstack/react-query';
import { getDetailBooking } from './fetcher';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import { ResponseWithPayload } from '@/fetcherAxios';
import { errorToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';

export interface IDataBookingProps {
  idBooking?: string;
  idQuotation: string;
  dataQuotation?: ISeaPricingDetail;
  dataColTableStep1?: IQuotationTable;
  step1?: IStep1;
  detailBooking?: IDetailBooking;
}

export const initalValueProps = {
  idQuotation: '',
  idBooking: '',
};

export const initalValueForm = {
  polid: '',
  podid: '',
  typeSeaService: TYPE_SERVICE.LCL,
  cargoReady: 1,
  commodities: [''],
  paginateRequest: {
    currentPage: DEFAULT_PAGINATION.current,
    pageSize: DEFAULT_PAGINATION.pageSize,
  },
};

export default function LclOceanFreightDetail() {
  const { id } = router.query;
  const displayStep = 5;

  const [dataPropsBooking, setDataPropsBooking] =
    useState<IDataBookingProps>(initalValueProps);

  useQuery({
    queryKey: [API_BOOKING.GET_SEA_BOOKING_BY_ID, id],
    queryFn: () => getDetailBooking({ id: id as string }),
    enabled: id !== undefined,
    onSuccess: (data: ResponseWithPayload<IDetailBooking>) => {
      if (data.status) {
        setDataPropsBooking((pre) => ({ ...pre, detailBooking: data.data }));
      }
    },
    onError() {
      errorToast(API_MESSAGE.ERROR);
    },
  });

  return (
    <section>
      <Step5 displayStep={displayStep} dataPropsBooking={dataPropsBooking} />
    </section>
  );
}
