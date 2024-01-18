import { ICustomQuotationFCLDetailSelecteds } from '../fcl-sea-detail/interface';

//Detail booking
export interface IDetailBooking {
  customerInformation: ICustomerInformation;
  shipmentDetail: {
    aod: string;
    aol: string;
    bookingDated: string;
    bookingNo: string;
    cargoCutOffDated: string;
    cargoReadyDated: string;
    commodity: string;
    effectDated: string;
    freqDate: string;
    fscAirQuotaiton: string;
    modeOfTransportation: string;
    note: string;
    placeOfDelivery: string;
    placeOfRecipt: string;
    quotationNo: string;
    sscAirQuotaiton: string;
    transitTimeAirQuotation: string;
    typeOfServiceTransportation: string;
    valitidyTo: string;
    vendorName: string;
    airBookingDetailDTO: {
      cw: string;
      gw: string;
      package: string;
      quantityPackage: string;
    };
  };
  airQuotationSelected: {
    quotationNo: string;
    airQuotationDetailBooking: {
      package: string;
      currency: string;
      cw: string;
      gw: string;
      quantityPackage: string;
      totalAmount: string;
    };
    fscDetailBooking: {
      quantity: string;
      price: string;
      vat: string;
      currency: string;
      totalAmount: string;
    };
    sscDetailBooking: {
      quantity: string;
      price: string;
      vat: string;
      currency: string;
      totalAmount: string;
    };
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
    customQuotationFCLDetailSelecteds: ICustomQuotationFCLDetailSelecteds[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  customQuotationPODSelected: {
    quotationNo: string;
    customQuotationFCLDetailSelecteds: ICustomQuotationFCLDetailSelecteds[];
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
