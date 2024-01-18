export enum TYPE_TABLE {
  'FREIGHT_CHARGES' = 'FREIGHT_CHARGES',
  'OTHER_CHARGES' = 'OTHER_CHARGES',
}

//Detail booking
export interface IDetailBooking {
  customerInformation: ICustomerInformation;
  shipmentDetail: {
    bookingNo: string;
    modeOfTransportation: string;
    pickupName: string;
    deliveryName: string;
    placeOfRecipt: string;
    placeOfDelivery: string;
    quotationNo: string;
    freqDate: string;
    effectDated: string;
    valitidyTo: string;
    commodity: string;
    truckBookingFCLDetailDTOs: {
      containerTypeCode: string;
      quantity: string;
    }[];
    transitTimeTruckingQuotation: string;
    cargoReadyDated: string;
    cargoCutOffDated: string;
    bookingDated: string;
    note: string;
  };
  truckingQuotationSelected: {
    quotationNo: string;
    truckingQuotationFCLDetails: IDetailPriceVAT[];
    sumTruckingQuotationFCLDetails: ITotalPrice[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  aslContactBooking: {
    issuedBy: string;
    possition: string[];
    email: string;
    tel: string;
  };
}
//
export interface ITotalPrice {
  item1: string;
  item2: string;
}
export interface IDetailPrice {
  description: string;
  unit: string;
  price: string;
  quantity: string;
  currency: string;
  totalAmount: string;
}
export interface IDetailPriceVAT extends IDetailPrice {
  vat: string;
}

export interface ICustomerInformation {
  customer: string;
  companyName: string;
  email: string;
  address: string;
  addressCompany: string;
  tel: string;
  mobil: string;
  contact: string;
}
export interface IRequireDetailBooking {
  id?: string;
}
