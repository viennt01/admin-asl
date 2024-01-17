import React from 'react';
import CustomerInformation from './customer-information';
import ShipmentDetail from './shipment-details';
import QuotationDetail from './quotation-detail';
import OtherCharges from './other-charge';
import TermsConditions from './terms-conditions';
import Finish from './finish';
import { Image } from 'antd';
import { IDetailBooking } from '../interface';

interface Props {
  dataPropsBooking: IDetailBooking | undefined;
}

export default function FormBooking({ dataPropsBooking }: Props) {
  return (
    <div>
      <div
        style={{
          marginBottom: '24px',
          width: '100%',
        }}
      >
        <Image
          src={'/images/oceanFreight/contactAsl.png'}
          preview={false}
          style={{
            width: '100%',
          }}
        />
      </div>
      <CustomerInformation dataPropsBooking={dataPropsBooking} />
      <ShipmentDetail dataPropsBooking={dataPropsBooking} />
      <QuotationDetail dataPropsBooking={dataPropsBooking} />
      <OtherCharges dataPropsBooking={dataPropsBooking} />
      <TermsConditions />
      <Finish dataPropsBooking={dataPropsBooking} />
    </div>
  );
}
