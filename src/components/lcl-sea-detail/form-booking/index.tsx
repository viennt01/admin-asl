import React from 'react';
import CustomerInformation from './customer-information';
import ShipmentDetail from './shipment-details';
import QuotationDetail from './sea-quotation-detail';
import SeaOtherCharges from './sea-other-charge';
import TermsConditions from './terms-conditions';
import Finish from './finish';
import { Image } from 'antd';
import TuckingQuotationPOL from './trucking-quotation-POL';
import TruckingOtherChargesPOL from './trucking-other-charge-POL';
import TuckingQuotationPOD from './trucking-quotation-POD';
import TruckingOtherChargesPOD from './trucking-other-charge-POD';
import CustomsQuotationPOL from './customs-quotation-POL';
import CustomsOtherChargesPOL from './customs-other-charge-POL';
import CustomsQuotationPOD from './customs-quotation-POD';
import CustomsOtherChargesPOD from './customs-other-charge-POD';
import { IDetailBooking } from '../interface';

interface Props {
  dataPropsBooking: IDetailBooking | undefined;
}

export default function FormBooking({ dataPropsBooking }: Props) {
  return (
    <div>
      <div
        // span={24}
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
      <SeaOtherCharges dataPropsBooking={dataPropsBooking} />
      <TermsConditions />
      <TuckingQuotationPOL dataPropsBooking={dataPropsBooking} />
      <TruckingOtherChargesPOL dataPropsBooking={dataPropsBooking} />
      <TuckingQuotationPOD dataPropsBooking={dataPropsBooking} />
      <TruckingOtherChargesPOD dataPropsBooking={dataPropsBooking} />
      <CustomsQuotationPOL dataPropsBooking={dataPropsBooking} />
      <CustomsOtherChargesPOL dataPropsBooking={dataPropsBooking} />
      <CustomsQuotationPOD dataPropsBooking={dataPropsBooking} />
      <CustomsOtherChargesPOD dataPropsBooking={dataPropsBooking} />
      <Finish dataPropsBooking={dataPropsBooking} />
    </div>
  );
}
