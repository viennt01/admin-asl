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
import { Button, Card, Col, Modal, Row } from 'antd';
import useI18n from '@/i18n/useI18N';
import { ExclamationCircleFilled } from '@ant-design/icons';
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
const { confirm } = Modal;

export default function LclOceanFreightDetail() {
  const { id } = router.query;
  const displayStep = 5;
  const { translate: translateCommon } = useI18n('common');

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

  const handleCancel = () => {
    const showPropsConfirmDelete = () => {
      confirm({
        icon: <ExclamationCircleFilled />,
        title: translateCommon('modal_close.title'),
        okText: translateCommon('modal_close.button_ok'),
        cancelText: translateCommon('modal_close.button_cancel'),
        okType: 'danger',
        onOk() {
          router.back();
        },
      });
    };

    return (
      <Button onClick={() => showPropsConfirmDelete()}>
        {translateCommon('button_bottom_form.close')}
      </Button>
    );
  };

  return (
    <section>
      <Step5 displayStep={displayStep} dataPropsBooking={dataPropsBooking} />
      <Card
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 11,
          marginTop: 16,
        }}
      >
        <Row gutter={12}>
          <Col span={12}>
            <>{handleCancel()}</>
          </Col>
        </Row>
      </Card>
    </section>
  );
}
