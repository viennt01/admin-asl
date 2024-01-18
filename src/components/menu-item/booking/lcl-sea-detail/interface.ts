//Detail booking
export interface IDetailBooking {
  customerInformation: ICustomerInformation;
  shipmentDetail: {
    bookingNo: string;
    modeOfTransportation: string;
    pol: string;
    pod: string;
    quotationNo: string;
    bookingDated: string;
    valitidyTo: string;
    commodity: string;
    seaBookingLCLDetailDTO: {
      internationalCode: string;
      quantity: string;
      gw: string;
      cbm: string;
    };
    cargoReadyDated: string;
    demSeaQuotation: string;
    detSeaQuotation: string;
    stoSeaQuotation: string;
    effectDated: string;
    freqDate: string;
    transitTimeSeaQuotation: string;
    typeOfServiceTransportation: string;
    vendorName: string;
  };
  seaQuotationBooking: {
    quotationNo: string;
    seaQuotationLCLDetails: {
      package: string;
      quantityPackage: string;
      price: string;
      gw: string;
      cbm: string;
      quantity: string;
      currency: string;
      totalAmount: string;
    }[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  truckingQuotationPOLSelected: {
    quotationNo: string;
    truckingQuotationLCLDetails: IDetailPriceVAT[];
    sumTruckingQuotationFCLDetails: ITotalPrice[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  truckingQuotationPODSelected: {
    quotationNo: string;
    truckingQuotationLCLDetails: IDetailPriceVAT[];
    sumTruckingQuotationFCLDetails: ITotalPrice[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  customQuotationPOLSelected: {
    quotationNo: string;
    customQuotationLCLDetailSelecteds: ICustomQuotationLCLDetailSelecteds;
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  customQuotationPODSelected: {
    quotationNo: string;
    customQuotationLCLDetailSelecteds: ICustomQuotationLCLDetailSelecteds;
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
export interface ICustomQuotationLCLDetailSelecteds {
  priceRedLane: string;
  priceYellowLane: string;
  priceGreenLane: string;
  vat: string;
  gw: string;
  cbm: string;
  totalRedLane: string;
  totalYellowLane: string;
  totalGreenLane: string;
}
export interface IRequireDetailBooking {
  id?: string;
}
export interface IRequireConfirmBooking {
  id?: string;
}
