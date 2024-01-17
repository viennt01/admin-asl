import React, { useState } from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Modal, Row } from 'antd';
import Step5 from './components';
import { useQuery } from '@tanstack/react-query';
import { errorToast } from '@/hook/toast';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import { ResponseWithPayload } from '@/fetcherAxios';
import router from 'next/router';
import { IDetailBooking } from './interface';
import { getDetailBooking } from './fetcher';
import { API_MESSAGE } from '@/constant/message';
import { ExclamationCircleFilled } from '@ant-design/icons';
import useI18n from '@/i18n/useI18N';

export interface IDataBookingProps {
  detailBooking?: IDetailBooking;
}

const { confirm } = Modal;

export default function LtlTruckDetail() {
  const { id } = router.query;
  const [dataPropsBooking, setDataPropsBooking] = useState<IDataBookingProps>();
  const { translate: translateCommon } = useI18n('common');

  useQuery({
    queryKey: [API_BOOKING.GET_TRUCK_BOOKING_BY_ID, id],
    queryFn: () => getDetailBooking({ id: id as string }),
    enabled: id !== undefined,
    onSuccess: (data: ResponseWithPayload<IDetailBooking>) => {
      if (data.status) {
        setDataPropsBooking(() => ({ detailBooking: data.data }));
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
    <>
      <section className={style.wrapper}>
        <Flex className={style.checkPrice} vertical>
          <div className={style.content}>
            <Step5 dataPropsBooking={dataPropsBooking} />
          </div>
        </Flex>
      </section>
      <Card
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 11,
          marginTop: 8,
        }}
      >
        <Row gutter={12}>
          <Col span={12}>
            <>{handleCancel()}</>
          </Col>
        </Row>
      </Card>
    </>
  );
}
